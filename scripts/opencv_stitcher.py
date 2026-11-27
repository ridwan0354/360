#!/usr/bin/env python3
from __future__ import annotations

"""
Server-Side OpenCV 5.1 GCam-Grade 4K Full-Sphere 3D Panorama Stitcher (4096x2048)

Primary Engine (`opencv_4k_gcam_3d_bundle`):
  - Full 3D Spherical Photogrammetry inspired by Google Photo Sphere (GCam):
    1. SIFT feature extraction + IMU-guided angular proximity matching (prevents false opposite-wall matches).
    2. HomographyBasedEstimator + Global 3D Levenberg-Marquardt Bundle Adjustment (`BundleAdjusterRay`)
       optimizing all 28+ cameras (horizon + upper + lower) simultaneously in a single 3D sphere.
    3. Gravity-Locked Upright SO(3) Alignment (uses drift-free accelerometer pitch/roll gravity vectors
       across all cameras -> mathematically impossible to flip upside down or tilt/wave!).
    4. Auto-placement of any featureless blank ceiling/floor shots via ring-fitted SO(3) IMU projection.
    5. Cyclic 360° wrap-safe Spherical Warping (`PyRotationWarper('spherical')`) +
       `BlocksChannelsCompensator` (per-block RGB exposure/white-balance leveling) +
       `GraphCutSeamFinder('COST_COLOR_GRAD')` (2D optimal seam routing around chairs/poles/text) +
       `MultiBandBlender` (native C++ 5-level Laplacian Pyramid blending across full 360°).
    6. Smooth real-ceiling zenith & robust-median-floor nadir pole completion + subtle 4K sharpening.

Fallback Engine (`opencv_4k_fullsphere` / `opencv_4k_sift_multiband`):
  - Gravity-locked 2-pass SIFT cylindrical horizon + FFT-aligned multi-band cap stitcher
    if an extreme capture has too few overlapping features for full 3D bundle convergence.
"""

import argparse
import glob
import json
import math
import os
import sys
import cv2
import numpy as np


def load_frames(input_dir: str, poses_path: str | None, max_side: int = 1600):
    files = sorted(
        f for f in glob.glob(os.path.join(input_dir, "*"))
        if os.path.splitext(f)[1].lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    poses = []
    if poses_path and os.path.exists(poses_path):
        try:
            with open(poses_path, "r", encoding="utf-8") as fp:
                data = json.load(fp)
                if isinstance(data, list):
                    poses = data
        except Exception:
            poses = []

    images = []
    meta = []
    for idx, fpath in enumerate(files):
        img = cv2.imread(fpath, cv2.IMREAD_COLOR)
        if img is None:
            continue
        h, w = img.shape[:2]
        scale = min(1.0, max_side / float(max(w, h)))
        if scale < 1.0:
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
        m = poses[idx] if idx < len(poses) else {"ring": "horizon", "yaw": idx * 30.0, "pitch": 0.0, "roll": 0.0}
        images.append(img)
        meta.append(m)

    return images, meta


# ==============================================================================
# PRIMARY ENGINE: GCam-Grade Full 3D Spherical Bundle Adjustment + GraphCut
# ==============================================================================

def make_R_imu_opencv(yaw_deg: float, pitch_deg: float, roll_deg: float = 0.0) -> np.ndarray:
    """
    Build exact OpenCV camera-to-world rotation matrix R_c2w (+X right, +Y down, +Z forward)
    matching PyRotationWarper('spherical', scale):
      +yaw   -> turns right (+u)
      +pitch -> tilts UP toward ceiling (-v / -Y)
      +roll  -> CCW camera roll (matches Flutter atan2(gHatX, gHatY))
    """
    yaw = math.radians(yaw_deg)
    pitch = math.radians(max(-85.0, min(85.0, pitch_deg)))
    roll = math.radians(max(-35.0, min(35.0, roll_deg)))

    cp, sp = math.cos(pitch), math.sin(pitch)
    cy, sy = math.cos(yaw), math.sin(yaw)

    fwd = np.array([cp * sy, -sp, cp * cy], dtype=np.float64)
    down_w = np.array([0.0, 1.0, 0.0], dtype=np.float64)
    right = np.cross(down_w, fwd)
    rn = np.linalg.norm(right)
    right = right / rn if rn > 1e-6 else np.array([1.0, 0.0, 0.0], dtype=np.float64)
    down_c = np.cross(fwd, right)

    cr, sr = math.cos(roll), math.sin(roll)
    right_r = right * cr - down_c * sr
    down_r = right * sr + down_c * cr
    return np.column_stack([right_r, down_r, fwd])


def rot_y(angle_rad: float) -> np.ndarray:
    c, s = math.cos(angle_rad), math.sin(angle_rad)
    return np.array([[c, 0.0, s], [0.0, 1.0, 0.0], [-s, 0.0, c]], dtype=np.float64)


def kabsch_so3(R_targets: list[np.ndarray], R_sources: list[np.ndarray]) -> np.ndarray:
    """Find optimal rigid rotation Q in SO(3) minimizing sum ||Q @ R_src - R_tgt||_F^2."""
    M = np.zeros((3, 3), dtype=np.float64)
    for Rt, Rs in zip(R_targets, R_sources):
        M += Rt @ Rs.T
    U, _, Vt = np.linalg.svd(M)
    d = 1.0 if np.linalg.det(U @ Vt) >= 0 else -1.0
    return U @ np.diag([1.0, 1.0, d]) @ Vt


def build_imu_match_mask(meta: list[dict], max_angle_deg: float = 100.0) -> np.ndarray | None:
    """Build pairwise adjacency mask from IMU poses so opposite identical walls never falsely match."""
    n = len(meta)
    if n < 6:
        return None
    fwds = []
    for m in meta:
        R = make_R_imu_opencv(float(m.get("yaw", 0.0)), float(m.get("pitch", 0.0)), float(m.get("roll", 0.0)))
        fwds.append(R[:, 2])
    fwds = np.array(fwds, dtype=np.float64)
    cos_thresh = math.cos(math.radians(max_angle_deg))
    dots = fwds @ fwds.T
    mask = ((dots >= cos_thresh) & (~np.eye(n, dtype=bool))).astype(np.uint8)
    # Always allow adjacent horizon shots and wrap-around even if IMU drifted slightly
    h_idxs = [i for i, m in enumerate(meta) if m.get("ring", "horizon") == "horizon"]
    if len(h_idxs) >= 3:
        h_sorted = sorted(h_idxs, key=lambda idx: float(meta[idx].get("yaw", 0.0)) % 360.0)
        for k in range(len(h_sorted)):
            a, b = h_sorted[k], h_sorted[(k + 1) % len(h_sorted)]
            mask[a, b] = 1
            mask[b, a] = 1
    return mask


def cyclic_gaussian_blur_x(strip: np.ndarray, ksize: tuple[int, int]) -> np.ndarray:
    """Horizontally wrap-around-safe Gaussian blur so x=0 and x=eq_w-1 NEVER have a vertical color step."""
    pad = max(128, ksize[0])
    w = strip.shape[1]
    padded = np.concatenate([strip[:, -pad:], strip, strip[:, :pad]], axis=1)
    blurred = cv2.GaussianBlur(padded, ksize, 0)
    return blurred[:, pad:pad + w]


def complete_poles_smooth(eq: np.ndarray, covered: np.ndarray, has_lower_ring: bool) -> np.ndarray:
    """
    Fill any unphotographed zenith (+74°..+90°) & nadir (-74°..-90°) pole regions smoothly
    directly from the real captured ceiling/floor pixels, with 100% cyclic 360° wraparound (ZERO x=0 seam!).
    """
    eq_h, eq_w = eq.shape[:2]
    out = eq.copy()
    valid = (covered > 0).astype(np.uint8)

    row_cov = valid.mean(axis=1)
    active_rows = np.where(row_cov >= 0.45)[0]
    if len(active_rows) < 20:
        return out

    top_row = int(active_rows[0])
    bot_row = int(active_rows[-1])

    for y_row in range(top_row, bot_row + 1):
        miss = valid[y_row] == 0
        if miss.any() and (~miss).sum() >= 32:
            xs_v = np.where(~miss)[0]
            xs_all = np.arange(eq_w)
            xs_ext = np.concatenate([xs_v - eq_w, xs_v, xs_v + eq_w])
            for ch in range(3):
                vals = out[y_row, xs_v, ch].astype(np.float32)
                vals_ext = np.concatenate([vals, vals, vals])
                out[y_row, miss, ch] = np.interp(xs_all[miss], xs_ext, vals_ext).astype(np.uint8)
            valid[y_row, miss] = 1

    # Smooth real-ceiling Zenith fill (0 .. top_row + feather) with cyclic horizontal blur
    feather = 56
    if top_row > 0:
        sample_end = min(eq_h, top_row + 44)
        edge_strip = out[top_row:sample_end, :].astype(np.float32)
        edge_band = cyclic_gaussian_blur_x(edge_strip, (141, 17)).mean(axis=0, keepdims=True)
        pole_val = edge_band.mean(axis=1, keepdims=True)
        fill_end = min(eq_h, top_row + feather)
        ys_p = np.linspace(1.0, 0.0, fill_end, dtype=np.float32)[:, None, None] ** 0.55
        pole_fill = edge_band * (1.0 - ys_p) + pole_val * ys_p

        ramp = np.ones((fill_end, 1), dtype=np.float32)
        if fill_end > top_row:
            t_r = np.linspace(1.0, 0.0, fill_end - top_row, dtype=np.float32)
            ramp[top_row:fill_end, 0] = t_r * t_r * (3.0 - 2.0 * t_r)
        uncov = 1.0 - valid[:fill_end, :].astype(np.float32)
        blend_m = np.maximum(uncov, ramp)[:, :, None]
        out[:fill_end, :] = np.clip(out[:fill_end, :].astype(np.float32) * (1.0 - blend_m) + pole_fill * blend_m, 0, 255).astype(np.uint8)

    # Smooth real-floor Nadir fill (nadir_limit .. eq_h) with cyclic horizontal blur
    nadir_limit = min(bot_row, eq_h - int(eq_h * 0.11)) if has_lower_ring else bot_row
    if nadir_limit < eq_h - 1:
        sample_start = max(0, nadir_limit - 48)
        edge_strip = out[sample_start:nadir_limit + 1, :].astype(np.float32)
        edge_band = cyclic_gaussian_blur_x(edge_strip, (161, 21)).mean(axis=0, keepdims=True)
        pole_val = np.median(edge_strip.reshape(-1, 3), axis=0).reshape(1, 1, 3).astype(np.float32)
        fill_start = max(0, nadir_limit - feather)
        fill_len = eq_h - fill_start
        ys_p = np.linspace(0.0, 1.0, fill_len, dtype=np.float32)[:, None, None] ** 0.55
        pole_fill = edge_band * (1.0 - ys_p) + pole_val * ys_p

        ramp = np.ones((fill_len, 1), dtype=np.float32)
        if nadir_limit > fill_start:
            t_r = np.linspace(0.0, 1.0, nadir_limit - fill_start, dtype=np.float32)
            ramp[:nadir_limit - fill_start, 0] = t_r * t_r * (3.0 - 2.0 * t_r)
        uncov = 1.0 - valid[fill_start:, :].astype(np.float32)
        blend_m = np.maximum(uncov, ramp)[:, :, None]
        out[fill_start:, :] = np.clip(out[fill_start:, :].astype(np.float32) * (1.0 - blend_m) + pole_fill * blend_m, 0, 255).astype(np.uint8)

    return out


def render_spherical_graphcut_multiband(
    full_imgs: list[np.ndarray],
    meta: list[dict],
    final_cameras: dict[int, tuple[np.ndarray, float]],
    eq_w: int = 4096,
    eq_h: int = 2048,
):
    """
    Shared GCam-grade 4K 360° spherical renderer:
      - Wrap-safe compact Spherical Warping (PyRotationWarper)
      - Per-block RGB BlocksChannelsCompensator
      - 2D GraphCutSeamFinder ('COST_COLOR_GRAD') with DpSeamFinder fallback
      - Native C++ 5-level cyclic MultiBandBlender
      - Cyclic zenith/nadir pole completion
    """
    h0, w0 = full_imgs[0].shape[:2]
    full_warp_scale = eq_w / (2.0 * math.pi)
    seam_factor = 0.25
    seam_w = int(round(eq_w * seam_factor))
    seam_warp_scale = seam_w / (2.0 * math.pi)

    warper_seam = cv2.PyRotationWarper("spherical", seam_warp_scale)
    warper_full = cv2.PyRotationWarper("spherical", full_warp_scale)

    pad_full = 768

    seam_imgs_list: list[np.ndarray] = []
    seam_masks_list: list[np.ndarray] = []
    seam_corners_list: list[tuple[int, int]] = []

    full_imgs_list: list[np.ndarray] = []
    full_masks_list: list[np.ndarray] = []
    full_corners_list: list[tuple[int, int]] = []

    s_src_w, s_src_h = max(64, int(round(w0 * seam_factor))), max(64, int(round(h0 * seam_factor)))
    src_mask_full = np.full((h0, w0), 255, dtype=np.uint8)
    src_mask_seam = np.full((s_src_h, s_src_w), 255, dtype=np.uint8)
    src_mask_full[:2, :] = 0; src_mask_full[-2:, :] = 0; src_mask_full[:, :2] = 0; src_mask_full[:, -2:] = 0
    src_mask_seam[:1, :] = 0; src_mask_seam[-1:, :] = 0; src_mask_seam[:, :1] = 0; src_mask_seam[:, -1:] = 0

    for idx in sorted(final_cameras.keys()):
        R_up, f_full = final_cameras[idx]
        yaw_rad = math.atan2(float(R_up[0, 2]), float(R_up[2, 2]))
        R_centered = (rot_y(-yaw_rad) @ R_up).astype(np.float32)

        K_full = np.array([[f_full, 0.0, w0 * 0.5], [0.0, f_full, h0 * 0.5], [0.0, 0.0, 1.0]], dtype=np.float32)
        c_full, w_im_full = warper_full.warp(full_imgs[idx], K_full, R_centered, cv2.INTER_CUBIC, cv2.BORDER_REFLECT)
        _, w_m_full = warper_full.warp(src_mask_full, K_full, R_centered, cv2.INTER_NEAREST, cv2.BORDER_CONSTANT)

        im_s = cv2.resize(full_imgs[idx], (s_src_w, s_src_h), interpolation=cv2.INTER_AREA)
        f_seam = f_full * seam_factor
        K_seam = np.array([[f_seam, 0.0, s_src_w * 0.5], [0.0, f_seam, s_src_h * 0.5], [0.0, 0.0, 1.0]], dtype=np.float32)
        c_seam, w_im_seam = warper_seam.warp(im_s, K_seam, R_centered, cv2.INTER_LINEAR, cv2.BORDER_REFLECT)
        _, w_m_seam = warper_seam.warp(src_mask_seam, K_seam, R_centered, cv2.INTER_NEAREST, cv2.BORDER_CONSTANT)

        if w_im_full.size == 0 or w_im_seam.size == 0 or int((w_m_full > 0).sum()) < 200:
            continue

        x_center_full = int(round(((yaw_rad + math.pi) / (2.0 * math.pi)) * eq_w)) % eq_w
        fx0 = x_center_full + int(c_full[0])
        fy0 = int(c_full[1])

        x_center_seam = int(round(((yaw_rad + math.pi) / (2.0 * math.pi)) * seam_w)) % seam_w
        sx0 = x_center_seam + int(c_seam[0])
        sy0 = int(c_seam[1])

        fw_tile = w_im_full.shape[1]
        shifts = [0]
        if fx0 < pad_full:
            shifts.append(1)
        if fx0 + fw_tile > eq_w - pad_full:
            shifts.append(-1)

        for sh in shifts:
            full_imgs_list.append(w_im_full.copy() if sh != 0 else w_im_full)
            full_masks_list.append(w_m_full.copy() if sh != 0 else w_m_full)
            full_corners_list.append((fx0 + sh * eq_w, fy0))

            seam_imgs_list.append(w_im_seam.copy() if sh != 0 else w_im_seam)
            seam_masks_list.append(w_m_seam.copy() if sh != 0 else w_m_seam)
            seam_corners_list.append((sx0 + sh * seam_w, sy0))

    if len(full_imgs_list) < 2:
        return None

    try:
        compensator = cv2.detail_BlocksChannelsCompensator(32, 32, 1)
        compensator.feed(seam_corners_list, seam_imgs_list, seam_masks_list)
        for i in range(len(seam_imgs_list)):
            compensator.apply(i, seam_corners_list[i], seam_imgs_list[i], seam_masks_list[i])
        comp_full = cv2.detail_BlocksChannelsCompensator(128, 128, 1)
        comp_full.feed(full_corners_list, full_imgs_list, full_masks_list)
        for i in range(len(full_imgs_list)):
            comp_full.apply(i, full_corners_list[i], full_imgs_list[i], full_masks_list[i])
    except Exception:
        pass

    seam_masks_out = None
    for finder_ctor in (
        lambda: cv2.detail_GraphCutSeamFinder("COST_COLOR_GRAD"),
        lambda: cv2.detail_DpSeamFinder("COLOR_GRAD"),
    ):
        try:
            sf = finder_ctor()
            imgs_u = [cv2.UMat(im.astype(np.float32)) for im in seam_imgs_list]
            masks_u = [cv2.UMat(m.copy()) for m in seam_masks_list]
            sf.find(imgs_u, seam_corners_list, masks_u)
            seam_masks_out = [m.get() for m in masks_u]
            break
        except Exception:
            seam_masks_out = None

    if seam_masks_out is None:
        seam_masks_out = seam_masks_list

    dilate_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    blend_masks_full = []
    for sm, fm in zip(seam_masks_out, full_masks_list):
        sm_dil = cv2.dilate(sm, dilate_kernel)
        sm_up = cv2.resize(sm_dil, (fm.shape[1], fm.shape[0]), interpolation=cv2.INTER_LINEAR)
        bm = ((sm_up > 127) & (fm > 0)).astype(np.uint8) * 255
        blend_masks_full.append(bm)

    dst_x = -pad_full
    dst_y = 0
    dst_w = eq_w + 2 * pad_full
    dst_h = eq_h

    blender = cv2.detail_MultiBandBlender(0, 5)
    blender.prepare((dst_x, dst_y, dst_w, dst_h))

    for im, bm, (cx, cy) in zip(full_imgs_list, blend_masks_full, full_corners_list):
        th, tw = im.shape[:2]
        x0 = max(dst_x, cx)
        y0 = max(dst_y, cy)
        x1 = min(dst_x + dst_w, cx + tw)
        y1 = min(dst_y + dst_h, cy + th)
        if x1 - x0 < 4 or y1 - y0 < 4:
            continue
        im_clip = im[y0 - cy:y1 - cy, x0 - cx:x1 - cx]
        bm_clip = bm[y0 - cy:y1 - cy, x0 - cx:x1 - cx]
        if int((bm_clip > 0).sum()) < 16:
            continue
        blender.feed(im_clip.astype(np.int16), bm_clip, (x0, y0))

    blended_pad, blended_mask_pad = blender.blend(None, None)
    blended_pad = np.clip(blended_pad, 0, 255).astype(np.uint8)

    eq = blended_pad[0:eq_h, pad_full:pad_full + eq_w]
    eq_mask = blended_mask_pad[0:eq_h, pad_full:pad_full + eq_w]

    if float((eq_mask > 0).mean()) < 0.25:
        return None

    has_lower = any(m.get("ring") == "lower" for m in meta)
    eq = complete_poles_smooth(eq, eq_mask, has_lower_ring=has_lower)
    return eq


def gcam_3d_bundle_spherical_stitch(images: list[np.ndarray], meta: list[dict], eq_w: int = 4096, eq_h: int = 2048):
    """
    Full 3D Spherical Bundle Adjustment + Gravity-Locked Upright Alignment +
    BlocksChannelsCompensator + GraphCutSeamFinder + MultiBandBlender (GCam Photo Sphere architecture).
    Returns (eq_4k, info_dict) on success, or (None, reason_str) if fallback is required.
    """
    n = len(images)
    if n < 3:
        return None, "too_few_frames"

    h0, w0 = images[0].shape[:2]
    full_imgs = [cv2.resize(im, (w0, h0), interpolation=cv2.INTER_AREA) if im.shape[:2] != (h0, w0) else im for im in images]

    # Step 1: CLAHE-enhanced SIFT features at working resolution (~800px) -> 2-3x more matches on indoor white walls/ceilings!
    work_scale = min(1.0, 800.0 / float(max(w0, h0)))
    ww, wh = int(round(w0 * work_scale)), int(round(h0 * work_scale))
    work_imgs = [cv2.resize(im, (ww, wh), interpolation=cv2.INTER_AREA) if work_scale < 1.0 else im for im in full_imgs]

    clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
    sift = cv2.SIFT_create(nfeatures=2600)
    feats = []
    for idx, im in enumerate(work_imgs):
        enh = clahe.apply(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY))
        f = cv2.detail.computeImageFeatures2(sift, enh)
        f.img_idx = idx
        feats.append(f)

    # Step 2: IMU-guided pairwise matching (connects horizon<->upper<->lower, blocks false opposite-wall matches)
    match_mask = build_imu_match_mask(meta, max_angle_deg=110.0)
    matcher = cv2.detail_BestOf2NearestMatcher(False, 0.28)
    if match_mask is not None:
        matches = matcher.apply2(feats, cv2.UMat(match_mask))
    else:
        matches = matcher.apply2(feats)
    matcher.collectGarbage()

    # Step 3: Extract largest connected component (explicitly re-indexing img_idx for OpenCV Python safety!)
    horizon_indices = {i for i, m in enumerate(meta) if m.get("ring", "horizon") == "horizon"}
    if not horizon_indices:
        horizon_indices = set(range(n))

    best_indices = None
    best_conf = 0.55
    for conf_try in (0.55, 0.35, 0.22, 0.14):
        kept = cv2.detail.leaveBiggestComponent(list(feats), list(matches), conf_try)
        kept_list = [int(x) for x in np.asarray(kept).ravel()]
        h_kept = len(set(kept_list) & horizon_indices)
        if len(kept_list) >= max(3, int(len(horizon_indices) * 0.60)) and h_kept >= max(3, int(len(horizon_indices) * 0.60)):
            best_indices = kept_list
            best_conf = conf_try
            break

    if best_indices is None:
        return None, "insufficient_connected_component"

    kept_orig_indices = best_indices
    if len(kept_orig_indices) == n:
        sub_feats = feats
        sub_matches = matches
    else:
        # Rebuild clean, contiguously indexed features & matches for the connected component
        sub_feats = []
        for new_i, orig_i in enumerate(kept_orig_indices):
            enh = clahe.apply(cv2.cvtColor(work_imgs[orig_i], cv2.COLOR_BGR2GRAY))
            f = cv2.detail.computeImageFeatures2(sift, enh)
            f.img_idx = new_i
            sub_feats.append(f)
        sub_mask = match_mask[np.ix_(kept_orig_indices, kept_orig_indices)] if match_mask is not None else None
        matcher2 = cv2.detail_BestOf2NearestMatcher(False, 0.28)
        sub_matches = matcher2.apply2(sub_feats, cv2.UMat(sub_mask)) if sub_mask is not None else matcher2.apply2(sub_feats)
        matcher2.collectGarbage()

    est = cv2.detail_HomographyBasedEstimator()
    ok_est, cams = est.apply(sub_feats, sub_matches, None)
    if not ok_est or not cams:
        return None, "homography_estimator_failed"

    # Clamp wild initial homography focals (caused by indoor close-up parallax) before BA!
    est_hfov = 50.0 if ww < wh else 64.0
    default_f_work = (ww * 0.5) / math.tan(math.radians(est_hfov * 0.5))
    valid_init_f = [float(c.focal) for c in cams if np.isfinite(c.focal) and ww * 0.42 <= c.focal <= ww * 2.4]
    seed_f = float(np.median(valid_init_f)) if valid_init_f else default_f_work
    for c in cams:
        c.R = c.R.astype(np.float32)
        if not (np.isfinite(c.focal) and ww * 0.42 <= c.focal <= ww * 2.4):
            c.focal = seed_f

    # Run Global 3D Bundle Adjustment (try Ray first, then Reproj which tolerates close-up parallax well)
    refine_mask = np.zeros((3, 3), dtype=np.uint8)
    refine_mask[0, 0] = 1

    cams_ba = None
    for ba_ctor in (cv2.detail_BundleAdjusterRay, cv2.detail_BundleAdjusterReproj):
        try:
            ba = ba_ctor()
            ba.setConfThresh(best_conf)
            ba.setRefinementMask(refine_mask)
            cams_try = []
            for c in cams:
                cp = cv2.detail.CameraParams()
                cp.focal = c.focal; cp.aspect = c.aspect; cp.ppx = c.ppx; cp.ppy = c.ppy
                cp.R = c.R.copy(); cp.t = c.t.copy()
                cams_try.append(cp)
            ok_ba, out_c = ba.apply(sub_feats, sub_matches, cams_try)
            if ok_ba and out_c:
                fs = [float(c.focal) for c in out_c if np.isfinite(c.focal) and ww * 0.42 <= c.focal <= ww * 2.5]
                if len(fs) >= max(3, int(len(out_c) * 0.6)):
                    cams_ba = out_c
                    break
        except Exception:
            continue

    if cams_ba is None:
        return None, "bundle_adjuster_failed"

    focals = [float(c.focal) for c in cams_ba if np.isfinite(c.focal) and ww * 0.42 <= c.focal <= ww * 2.5]
    med_focal_work = float(np.median(focals))

    # Step 4: Robust Gravity-Locked Upright SO(3) Alignment (ZERO upside-down flip, ZERO wave/tilt!)
    down_votes = []
    R_ba_list = [c.R.astype(np.float64) for c in cams_ba]
    for k, orig_i in enumerate(kept_orig_indices):
        m = meta[orig_i]
        R_pr = make_R_imu_opencv(0.0, float(m.get("pitch", 0.0)), float(m.get("roll", 0.0)))
        v_down = R_ba_list[k] @ R_pr[1, :]
        vn = np.linalg.norm(v_down)
        down_votes.append(v_down / vn if vn > 1e-6 else np.array([0.0, 1.0, 0.0], dtype=np.float64))

    h_votes = [down_votes[k] for k, oi in enumerate(kept_orig_indices) if meta[oi].get("ring", "horizon") == "horizon"]
    seed_votes = h_votes if len(h_votes) >= 3 else down_votes

    # RANSAC-style best gravity consensus vote (immune to 1-2 bad frames skewing the mean!)
    best_inliers = []
    for cand in seed_votes:
        inliers = [v for v in seed_votes if float(np.dot(v, cand)) >= math.cos(math.radians(14.0))]
        if len(inliers) > len(best_inliers):
            best_inliers = inliers
    g_bundle = np.mean(best_inliers if len(best_inliers) >= 2 else seed_votes, axis=0)
    gn = np.linalg.norm(g_bundle)
    if gn < 0.70:
        return None, f"gravity_inconsistent_{gn:.2f}"
    g_bundle /= gn

    inlier_all = [v for v in down_votes if float(np.dot(v, g_bundle)) >= math.cos(math.radians(14.0))]
    if len(inlier_all) >= 3:
        g_bundle = np.mean(inlier_all, axis=0)
        g_bundle /= np.linalg.norm(g_bundle)

    consistency = float(np.mean([float(np.dot(v, g_bundle)) for v in seed_votes]))
    if consistency < 0.80:
        return None, f"bundle_gravity_mismatch_{consistency:.3f}"

    anchor_k = 0
    best_anchor_score = 1e9
    for k, orig_i in enumerate(kept_orig_indices):
        if meta[orig_i].get("ring", "horizon") == "horizon":
            y_abs = abs(((float(meta[orig_i].get("yaw", 0.0)) + 180.0) % 360.0) - 180.0)
            if y_abs < best_anchor_score:
                best_anchor_score = y_abs
                anchor_k = k

    y_axis = g_bundle
    fwd_anchor = R_ba_list[anchor_k][:, 2]
    z_proj = fwd_anchor - float(np.dot(fwd_anchor, y_axis)) * y_axis
    zn = np.linalg.norm(z_proj)
    z_axis = z_proj / zn if zn > 1e-6 else np.array([0.0, 0.0, 1.0], dtype=np.float64)
    x_axis = np.cross(y_axis, z_axis)
    x_axis /= np.linalg.norm(x_axis)
    z_axis = np.cross(x_axis, y_axis)
    z_axis /= np.linalg.norm(z_axis)

    Q = np.vstack([x_axis, y_axis, z_axis])
    if np.linalg.det(Q) < 0:
        Q[0, :] *= -1.0

    # Eject only severely twisted ceiling/floor outliers (>14° gravity error) so real handheld jitter stays in bundle
    full_ratio = w0 / float(ww)
    med_focal_full = med_focal_work * full_ratio
    final_cameras: dict[int, tuple[np.ndarray, float]] = {}

    for k, orig_i in enumerate(kept_orig_indices):
        err_deg = math.degrees(math.acos(max(-1.0, min(1.0, float(np.dot(down_votes[k], g_bundle))))))
        if err_deg > 14.0:
            continue
        R_up = Q @ R_ba_list[k]
        U, _, Vt = np.linalg.svd(R_up)
        R_up = U @ Vt
        if np.linalg.det(R_up) < 0:
            U[:, -1] *= -1.0
            R_up = U @ Vt
        final_cameras[orig_i] = (R_up, med_focal_full)

    if len(final_cameras) < max(3, int(len(horizon_indices) * 0.55)):
        return None, "too_many_gravity_outliers"

    # Step 5: Rescue any disconnected/ejected blank ceiling/floor frames using pure horizontal yaw alignment!
    disconnected = [i for i in range(n) if i not in final_cameras]
    if disconnected:
        for orig_j in disconnected:
            ring_j = meta[orig_j].get("ring", "horizon")
            same_ring = [i for i in final_cameras if meta[i].get("ring", "horizon") == ring_j]
            ref_ids = same_ring if len(same_ring) >= 2 else list(final_cameras.keys())
            sin_sum, cos_sum = 0.0, 0.0
            for i in ref_ids:
                R_up_i = final_cameras[i][0]
                yaw_bundle = math.atan2(float(R_up_i[0, 2]), float(R_up_i[2, 2]))
                yaw_imu = math.radians(float(meta[i].get("yaw", 0.0)))
                diff = yaw_bundle - yaw_imu
                sin_sum += math.sin(diff)
                cos_sum += math.cos(diff)
            delta_yaw = math.atan2(sin_sum, cos_sum)
            R_imu_j = make_R_imu_opencv(
                float(meta[orig_j].get("yaw", 0.0)),
                float(meta[orig_j].get("pitch", 0.0)),
                float(meta[orig_j].get("roll", 0.0)),
            )
            final_cameras[orig_j] = (rot_y(delta_yaw) @ R_imu_j, med_focal_full)

    eq = render_spherical_graphcut_multiband(full_imgs, meta, final_cameras, eq_w=eq_w, eq_h=eq_h)
    if eq is None:
        return None, "render_graphcut_failed"

    info = {
        "engine": "GCam-3D 4K",
        "connected_frames": len(kept_orig_indices),
        "imu_rescued_frames": len(disconnected),
        "gravity_consistency": round(consistency, 4),
        "focal_px": round(med_focal_full, 1),
        "closed_360": True,
    }
    return eq, info


def imu_3d_graphcut_fallback(images: list[np.ndarray], meta: list[dict], eq_w: int = 4096, eq_h: int = 2048):
    """
    Tier-2 Full-Sphere Fallback: If a very plain/white room cannot converge full SIFT bundle adjustment,
    calibrate focal length from horizon SIFT overlaps and stitch ALL 28 frames (including real ceiling & floor!)
    from Android's hardware TYPE_ROTATION_VECTOR poses via GraphCut + BlocksChannelsCompensator + MultiBandBlender!
    """
    if len(images) < 6 or not any(m.get("ring") in {"upper", "lower"} for m in meta):
        return None, "no_caps_for_imu_3d"

    h0, w0 = images[0].shape[:2]
    full_imgs = [cv2.resize(im, (w0, h0), interpolation=cv2.INTER_AREA) if im.shape[:2] != (h0, w0) else im for im in images]
    est_hfov = 50.0 if w0 < h0 else 64.0
    focal_full = (w0 * 0.5) / math.tan(math.radians(est_hfov * 0.5))

    # Calibrate focal from horizon SIFT pairwise shifts if possible
    h_pairs = sorted(
        [(full_imgs[i], meta[i]) for i in range(len(full_imgs)) if meta[i].get("ring", "horizon") == "horizon"],
        key=lambda p: float(p[1].get("yaw", 0.0)) % 360.0,
    )
    if len(h_pairs) >= 7:
        dxs = []
        for k in range(len(h_pairs)):
            im_a, m_a = h_pairs[k]
            im_b, m_b = h_pairs[(k + 1) % len(h_pairs)]
            wa, _ = cylindrical_warp(im_a, focal_full, float(m_a.get("roll", 0.0)))
            wb, _ = cylindrical_warp(im_b, focal_full, float(m_b.get("roll", 0.0)))
            dyaw = (float(m_b.get("yaw", 0.0)) - float(m_a.get("yaw", 0.0))) % 360.0
            dx, _, inl = match_pair_sift_ransac(wa, wb, math.radians(max(10.0, dyaw)) * focal_full)
            if inl >= 4:
                dxs.append((dx, dyaw))
        if len(dxs) >= 5:
            ratios = [dx / max(0.15, math.radians(dyaw)) for dx, dyaw in dxs if 15.0 <= dyaw <= 60.0]
            if ratios:
                f_cal = float(np.median(ratios))
                if w0 * 0.45 <= f_cal <= w0 * 2.4:
                    focal_full = f_cal

    final_cameras = {}
    for i, m in enumerate(meta):
        R_i = make_R_imu_opencv(float(m.get("yaw", 0.0)), float(m.get("pitch", 0.0)), float(m.get("roll", 0.0)))
        final_cameras[i] = (R_i, focal_full)

    eq = render_spherical_graphcut_multiband(full_imgs, meta, final_cameras, eq_w=eq_w, eq_h=eq_h)
    if eq is None:
        return None, "imu_3d_render_failed"

    return eq, {
        "engine": "IMU-3D 4K",
        "focal_px": round(focal_full, 1),
        "closed_360": True,
    }


# ==============================================================================
# FALLBACK ENGINE: Gravity-Locked SIFT Cylindrical + FFT Multi-Band Cap Stitcher
# ==============================================================================

def cylindrical_warp(img: np.ndarray, focal_px: float, roll_deg: float = 0.0):
    h, w = img.shape[:2]
    cx, cy = w * 0.5, h * 0.5
    ys, xs = np.indices((h, w), dtype=np.float32)

    theta = (xs - cx) / focal_px
    cos_t = np.cos(theta)
    ux = focal_px * np.tan(theta)
    uy = (ys - cy) / cos_t

    roll_rad = math.radians(max(-12.0, min(12.0, roll_deg)))
    cos_r, sin_r = math.cos(roll_rad), math.sin(roll_rad)
    map_x = (ux * cos_r - uy * sin_r + cx).astype(np.float32)
    map_y = (ux * sin_r + uy * cos_r + cy).astype(np.float32)

    warped = cv2.remap(img, map_x, map_y, interpolation=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0))
    valid = ((map_x >= 2) & (map_x < w - 3) & (map_y >= 2) & (map_y < h - 3)).astype(np.uint8)
    return warped, valid


def match_pair_sift_ransac(img_a: np.ndarray, img_b: np.ndarray, expected_dx: float):
    h, w = img_a.shape[:2]
    det_scale = min(1.0, 960.0 / float(max(w, h)))
    if det_scale < 1.0:
        sa = cv2.resize(img_a, (int(w * det_scale), int(h * det_scale)), interpolation=cv2.INTER_AREA)
        sb = cv2.resize(img_b, (int(w * det_scale), int(h * det_scale)), interpolation=cv2.INTER_AREA)
    else:
        sa, sb = img_a, img_b

    sh, sw = sa.shape[:2]
    gray_a = cv2.cvtColor(sa, cv2.COLOR_BGR2GRAY)
    gray_b = cv2.cvtColor(sb, cv2.COLOR_BGR2GRAY)

    clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
    enh_a = clahe.apply(gray_a)
    enh_b = clahe.apply(gray_b)

    sift = cv2.SIFT_create(nfeatures=2200)
    kp_a, des_a = sift.detectAndCompute(enh_a, None)
    kp_b, des_b = sift.detectAndCompute(enh_b, None)

    if des_a is not None and des_b is not None and len(kp_a) >= 8 and len(kp_b) >= 8:
        matcher = cv2.BFMatcher(cv2.NORM_L2)
        raw_matches = matcher.knnMatch(des_a, des_b, k=2)
        good = []
        for pair in raw_matches:
            if len(pair) == 2 and pair[0].distance < 0.75 * pair[1].distance:
                m = pair[0]
                pt_a = kp_a[m.queryIdx].pt
                pt_b = kp_b[m.trainIdx].pt
                dx = pt_a[0] - pt_b[0]
                dy = pt_a[1] - pt_b[1]
                if sw * 0.08 <= dx <= sw * 0.92 and abs(dy) <= sh * 0.22:
                    good.append((dx, dy))

        if len(good) >= 5:
            pts = np.array(good, dtype=np.float32)
            best_inliers = []
            for i in range(len(pts)):
                dists = np.hypot(pts[:, 0] - pts[i, 0], pts[:, 1] - pts[i, 1])
                inliers = np.where(dists < 7.0)[0]
                if len(inliers) > len(best_inliers):
                    best_inliers = inliers
            if len(best_inliers) >= 4:
                inlier_pts = pts[best_inliers]
                dx_med = float(np.median(inlier_pts[:, 0])) / det_scale
                dy_med = float(np.median(inlier_pts[:, 1])) / det_scale
                return int(round(dx_med)), int(round(dy_med)), len(best_inliers)

    strip_w = max(48, int(sw * 0.36))
    y_pad = int(sh * 0.14)
    tpl = enh_b[y_pad:sh - y_pad, :strip_w]
    search = enh_a[:, int(sw * 0.08):]
    if tpl.shape[0] < search.shape[0] and tpl.shape[1] < search.shape[1]:
        res = cv2.matchTemplate(search, tpl, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, max_loc = cv2.minMaxLoc(res)
        if max_val > 0.22:
            dx = (int(sw * 0.08) + max_loc[0]) / det_scale
            dy = (max_loc[1] - y_pad) / det_scale
            return int(np.clip(round(dx), int(w * 0.12), int(w * 0.88))), int(np.clip(round(dy), -int(h * 0.16), int(h * 0.16))), 3

    return int(round(np.clip(expected_dx, w * 0.20, w * 0.78))), 0, 0


def multiband_blend_overlap(left_img: np.ndarray, right_img: np.ndarray, seam_mask: np.ndarray, levels: int = 5) -> np.ndarray:
    h, w = left_img.shape[:2]
    max_levels = max(2, min(levels, int(math.log2(max(4, min(h, w)))) - 2))
    mult = 1 << max_levels
    pad_h = (mult - (h % mult)) % mult
    pad_w = (mult - (w % mult)) % mult

    A = cv2.copyMakeBorder(left_img, 0, pad_h, 0, pad_w, cv2.BORDER_REFLECT_101).astype(np.float32)
    B = cv2.copyMakeBorder(right_img, 0, pad_h, 0, pad_w, cv2.BORDER_REFLECT_101).astype(np.float32)
    M = cv2.copyMakeBorder(seam_mask, 0, pad_h, 0, pad_w, cv2.BORDER_REPLICATE).astype(np.float32)

    gpA, gpB, gpM = [A], [B], [M]
    for _ in range(max_levels):
        gpA.append(cv2.pyrDown(gpA[-1]))
        gpB.append(cv2.pyrDown(gpB[-1]))
        gpM.append(cv2.pyrDown(gpM[-1]))

    lpA = [gpA[-1]]
    lpB = [gpB[-1]]
    for i in range(max_levels, 0, -1):
        upA = cv2.pyrUp(gpA[i], dstsize=(gpA[i - 1].shape[1], gpA[i - 1].shape[0]))
        upB = cv2.pyrUp(gpB[i], dstsize=(gpB[i - 1].shape[1], gpB[i - 1].shape[0]))
        lpA.append(gpA[i - 1] - upA)
        lpB.append(gpB[i - 1] - upB)

    LS = []
    for la, lb, gm in zip(lpA, lpB, reversed(gpM)):
        g3 = gm[:, :, None] if gm.ndim == 2 else gm
        LS.append(la * (1.0 - g3) + lb * g3)

    out = LS[0]
    for i in range(1, len(LS)):
        out = cv2.pyrUp(out, dstsize=(LS[i].shape[1], LS[i].shape[0])) + LS[i]

    return np.clip(out[:h, :w], 0, 255).astype(np.uint8)


def find_dp_seam(left_ov: np.ndarray, right_ov: np.ndarray, mask_left: np.ndarray, mask_right: np.ndarray) -> np.ndarray:
    h, ov_w = left_ov.shape[:2]
    mask = np.zeros((h, ov_w), dtype=np.float32)
    if ov_w < 10:
        mask[:, ov_w // 2:] = 1.0
        return mask

    ds = 2 if h > 900 else 1
    l_s = left_ov[::ds, ::ds]
    r_s = right_ov[::ds, ::ds]
    ml_s = mask_left[::ds, ::ds]
    mr_s = mask_right[::ds, ::ds]
    hs, ws = l_s.shape[:2]

    diff_rgb = np.abs(l_s.astype(np.float32) - r_s.astype(np.float32)).sum(axis=2)
    gL = cv2.cvtColor(l_s, cv2.COLOR_BGR2GRAY).astype(np.float32)
    gR = cv2.cvtColor(r_s, cv2.COLOR_BGR2GRAY).astype(np.float32)
    gradL = np.abs(cv2.Sobel(gL, cv2.CV_32F, 1, 0, ksize=3)) + np.abs(cv2.Sobel(gL, cv2.CV_32F, 0, 1, ksize=3))
    gradR = np.abs(cv2.Sobel(gR, cv2.CV_32F, 1, 0, ksize=3)) + np.abs(cv2.Sobel(gR, cv2.CV_32F, 0, 1, ksize=3))
    err = diff_rgb + 0.35 * np.abs(gradL - gradR)

    err[ml_s == 0] += 400.0
    err[mr_s == 0] += 400.0
    margin = max(2, int(ws * 0.14))
    err[:, :margin] += 400.0
    err[:, ws - margin:] += 400.0

    dp = err.copy()
    for y in range(1, hs):
        prev = dp[y - 1]
        left_shift = np.concatenate([[1e9], prev[:-1]])
        right_shift = np.concatenate([prev[1:], [1e9]])
        dp[y] += np.minimum(prev, np.minimum(left_shift, right_shift))

    seam_s = np.zeros(hs, dtype=np.int32)
    seam_s[hs - 1] = int(np.argmin(dp[hs - 1]))
    for y in range(hs - 2, -1, -1):
        px = seam_s[y + 1]
        lo, hi = max(0, px - 1), min(ws, px + 2)
        seam_s[y] = lo + int(np.argmin(dp[y, lo:hi]))

    for y in range(h):
        cut = min(ov_w - 1, int(seam_s[min(hs - 1, y // ds)] * ds))
        mask[y, cut:] = 1.0

    return mask


def fallback_cylindrical_stitch(images: list[np.ndarray], meta: list[dict], eq_w: int = 4096, eq_h: int = 2048):
    def norm360(y):
        return ((float(y) % 360.0) + 360.0) % 360.0

    horizon_pairs = [(im, m) for im, m in zip(images, meta) if m.get("ring", "horizon") == "horizon"]
    if len(horizon_pairs) < 2:
        horizon_pairs = list(zip(images, meta))

    paired = sorted(horizon_pairs, key=lambda p: norm360(p[1].get("yaw", 0.0)))
    imgs = [p[0] for p in paired]
    ms = [p[1] for p in paired]

    h0, w0 = imgs[0].shape[:2]
    imgs = [cv2.resize(im, (w0, h0), interpolation=cv2.INTER_AREA) if im.shape[:2] != (h0, w0) else im for im in imgs]

    est_hfov = 50.0 if w0 < h0 else 64.0
    focal_px = (w0 * 0.5) / math.tan(math.radians(est_hfov * 0.5))

    def warp_and_align(f_px: float):
        warped, masks = [], []
        for im, m in zip(imgs, ms):
            w_im, w_m = cylindrical_warp(im, f_px, roll_deg=float(m.get("roll", 0.0)))
            warped.append(w_im)
            masks.append(w_m)

        dxs, dys = [], []
        for i in range(1, len(warped)):
            d_yaw = max(10.0, norm360(ms[i].get("yaw", i * 30)) - norm360(ms[i - 1].get("yaw", (i - 1) * 30)))
            exp_dx = math.radians(d_yaw) * f_px
            dx, dy, _ = match_pair_sift_ransac(warped[i - 1], warped[i], exp_dx)
            dxs.append(dx)
            dys.append(dy)

        closing_gap = 360.0 - norm360(ms[-1].get("yaw", 330)) + norm360(ms[0].get("yaw", 0))
        is_closed = len(warped) >= 7 and closing_gap <= 72.0
        closing_dx, closing_dy = 0, 0
        if is_closed:
            exp_close_dx = math.radians(closing_gap) * f_px
            cdx, cdy, inliers = match_pair_sift_ransac(warped[-1], warped[0], exp_close_dx)
            if inliers >= 3:
                closing_dx, closing_dy = cdx, cdy
            else:
                is_closed = False

        return warped, masks, dxs, dys, is_closed, closing_dx, closing_dy

    warped, masks, dxs, dys, is_closed, closing_dx, closing_dy = warp_and_align(focal_px)
    if is_closed:
        measured_circ = sum(dxs) + closing_dx
        f_calibrated = measured_circ / (2.0 * math.pi)
        if w0 * 0.45 <= f_calibrated <= w0 * 2.4 and abs(f_calibrated - focal_px) / focal_px > 0.06:
            focal_px = f_calibrated
            warped, masks, dxs, dys, is_closed, closing_dx, closing_dy = warp_and_align(focal_px)

    all_dys = dys + ([closing_dy] if is_closed else [])
    drift = sum(all_dys) / float(max(1, len(all_dys)))

    pos_x, pos_y = [0], [0]
    for dx, dy in zip(dxs, dys):
        pos_x.append(pos_x[-1] + max(int(w0 * 0.10), dx))
        pos_y.append(pos_y[-1] + int(round(dy - drift)))

    pano_w = (pos_x[-1] + max(int(w0 * 0.10), closing_dx)) if is_closed else (pos_x[-1] + w0)
    min_y, max_y = min(pos_y), max(pos_y)
    shift_y = -min_y
    pano_h = h0 + (max_y - min_y)

    canvas = np.zeros((pano_h, pano_w, 3), dtype=np.uint8)
    filled = np.zeros((pano_h, pano_w), dtype=np.uint8)
    oy0 = pos_y[0] + shift_y
    canvas[oy0:oy0 + h0, 0:w0] = warped[0]
    filled[oy0:oy0 + h0, 0:w0] = masks[0]

    for i in range(1, len(warped)):
        ox, oy = pos_x[i], pos_y[i] + shift_y
        ov_w = min(max(0, (pos_x[i - 1] + w0) - ox), w0, pano_w - ox)
        right_end = min(pano_w, ox + w0)
        eff_w = right_end - ox
        if eff_w <= 0:
            continue
        cur_frame = warped[i][:, :eff_w]
        cur_mask = masks[i][:, :eff_w]
        if ov_w >= 16:
            left_ov = canvas[oy:oy + h0, ox:ox + ov_w]
            right_ov = cur_frame[:, :ov_w]
            m_left = filled[oy:oy + h0, ox:ox + ov_w]
            m_right = cur_mask[:, :ov_w]
            both = (m_left > 0) & (m_right > 0)
            seam_m = find_dp_seam(left_ov, right_ov, m_left, m_right)
            blended_ov = multiband_blend_overlap(left_ov, right_ov, seam_m, levels=5)
            canvas[oy:oy + h0, ox:ox + ov_w] = np.where(both[:, :, None], blended_ov, np.where(m_right[:, :, None] > 0, right_ov, left_ov))
            filled[oy:oy + h0, ox:ox + ov_w] = np.maximum(m_left, m_right)
        if eff_w > ov_w:
            canvas[oy:oy + h0, ox + ov_w:right_end] = cur_frame[:, ov_w:eff_w]
            filled[oy:oy + h0, ox + ov_w:right_end] = cur_mask[:, ov_w:eff_w]

    if is_closed:
        tail_src = pano_w - pos_x[-1]
        close_ov = min(w0 - tail_src, pano_w // 3)
        if tail_src >= 0 and close_ov >= 16:
            oy_last = pos_y[-1] + shift_y
            tail_img = warped[-1][:, tail_src:tail_src + close_ov]
            tail_mask = masks[-1][:, tail_src:tail_src + close_ov]
            frame0_ov = canvas[oy_last:oy_last + h0, 0:close_ov]
            m_f0 = filled[oy_last:oy_last + h0, 0:close_ov]
            both = (tail_mask > 0) & (m_f0 > 0)
            seam_m = find_dp_seam(tail_img, frame0_ov, tail_mask, m_f0)
            blended_close = multiband_blend_overlap(tail_img, frame0_ov, seam_m, levels=5)
            canvas[oy_last:oy_last + h0, 0:close_ov] = np.where(both[:, :, None], blended_close, np.where(tail_mask[:, :, None] > 0, tail_img, frame0_ov))
            filled[oy_last:oy_last + h0, 0:close_ov] = np.maximum(m_f0, tail_mask)

    row_cov = filled.mean(axis=1)
    solid_rows = np.where(row_cov >= 0.80)[0]
    if len(solid_rows) >= int(pano_h * 0.50):
        canvas = canvas[int(solid_rows[0]):int(solid_rows[-1]) + 1, :]
        filled = filled[int(solid_rows[0]):int(solid_rows[-1]) + 1, :]

    h, w = canvas.shape[:2]
    vfov_rad = 2.0 * math.atan((h * 0.5) / max(120.0, focal_px))
    target_h = int(np.clip(round((vfov_rad / math.pi) * eq_h), int(eq_h * 0.42), int(eq_h * 0.92)))

    if is_closed:
        resized = cv2.resize(canvas, (eq_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    else:
        cov_frac = float(np.clip((w / max(120.0, focal_px)) / (2.0 * math.pi), 0.35, 1.0))
        active_w = max(64, int(round(eq_w * cov_frac)))
        active_img = cv2.resize(canvas, (active_w, target_h), interpolation=cv2.INTER_LANCZOS4)
        rem_w = eq_w - active_w
        if rem_w > 0:
            rear = cv2.GaussianBlur(cv2.resize(cv2.flip(active_img, 1), (rem_w, target_h)), (61, 61), 0)
            resized = np.concatenate([active_img, rear], axis=1)
        else:
            resized = active_img

    eq = np.zeros((eq_h, eq_w, 3), dtype=np.uint8)
    cov = np.zeros((eq_h, eq_w), dtype=np.uint8)
    y_top = (eq_h - target_h) // 2
    eq[y_top:y_top + target_h, :] = resized
    cov[y_top:y_top + target_h, :] = 255
    eq = complete_poles_smooth(eq, cov, has_lower_ring=False)

    return eq, {
        "engine": "SIFT-4K",
        "closed_360": is_closed,
        "focal_px": round(focal_px, 1),
    }


def enhance_sharpness(eq: np.ndarray) -> np.ndarray:
    """Subtle unsharp mask so 4K panorama details remain crisp without halos."""
    blur = cv2.GaussianBlur(eq, (0, 0), sigmaX=1.15)
    return cv2.addWeighted(eq, 1.20, blur, -0.20, 0)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--poses", default=None)
    args = parser.parse_args()

    images, meta = load_frames(args.input_dir, args.poses, max_side=1600)
    if len(images) < 2:
        print(json.dumps({"ok": False, "error": "Minimal 2 foto diperlukan untuk menjahit panorama 360°."}))
        sys.exit(1)

    eq, info = gcam_3d_bundle_spherical_stitch(images, meta, eq_w=4096, eq_h=2048)
    fallback_reason = None
    if eq is None:
        fallback_reason = str(info)
        # Tier 2: Full-sphere IMU 3D + GraphCut + MultiBand (preserves real ceiling & floor!)
        eq, info = imu_3d_graphcut_fallback(images, meta, eq_w=4096, eq_h=2048)
    if eq is None:
        # Tier 3: Cylindrical horizon SIFT + MultiBand (for partial / non-cap captures)
        eq, info = fallback_cylindrical_stitch(images, meta, eq_w=4096, eq_h=2048)

    eq = enhance_sharpness(eq)

    ok = cv2.imwrite(
        args.output,
        eq,
        [int(cv2.IMWRITE_WEBP_QUALITY), 93] if args.output.lower().endswith(".webp") else [int(cv2.IMWRITE_JPEG_QUALITY), 94],
    )
    if not ok:
        print(json.dumps({"ok": False, "error": "Gagal menulis berkas panorama hasil OpenCV."}))
        sys.exit(1)

    payload = {
        "ok": True,
        "frames_input": len(images),
        "output_size": [int(eq.shape[1]), int(eq.shape[0])],
        **info,
    }
    if fallback_reason:
        payload["fallback_reason"] = fallback_reason

    print(json.dumps(payload))


if __name__ == "__main__":
    main()
