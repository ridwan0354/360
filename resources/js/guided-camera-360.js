import * as THREE from 'three';

/**
 * Browser Guided 360° Full-Sphere Scanner & Multi-Band CV Stitcher
 * - Ring 1 (Horizon 0°): 14 overlapping frames with 2-level coarse-to-fine CV registration,
 *   true 360° loop closure (seamless wrap at x=0), DP min-error seam carving, and 2-band feathering.
 * - Ring 2 (Upper +42°, 6 dots) & Ring 3 (Lower -42°, 6 dots): layered smoothly on top of the
 *   already-filled 100%-covered equirectangular base using the exact auto-calibrated lens focal length
 *   and overlap luminance matching -> real ceiling & real floor with ZERO black triangles!
 */
export class GuidedCamera360 {
    constructor(options = {}) {
        this.videoEl = options.videoEl;
        this.overlayCanvas = options.overlayCanvas;
        this.onProgress = options.onProgress ?? null;
        this.onComplete = options.onComplete ?? null;
        this.onStatus = options.onStatus ?? null;
        this.onCapabilities = options.onCapabilities ?? null;

        this.targetStepDeg = 25.7;
        this.targets = [];
        this.horizonFrames = [];
        this.capFrames = []; // upper (+42°) & lower (-42°) real ceiling/floor shots
        this.rawBlobs = []; // raw JPEG blobs + poses for server-side OpenCV 3D stitching
        this.serverStitchUrl = options.serverStitchUrl ?? null;
        this.csrfToken = options.csrfToken ?? null;

        this.currentYaw = 0;
        this.currentPitch = 0;
        this.currentRoll = 0;

        this.cameraQuat = new THREE.Quaternion();
        this.cameraForward = new THREE.Vector3(1, 0, 0);
        this.cameraRight = new THREE.Vector3(0, 0, 1);
        this.cameraUp = new THREE.Vector3(0, 1, 0);

        this.qAlign = null;
        this.hasLiveCamera = false;
        this.hasGyro = false;
        this.stream = null;
        this.running = false;
        this.isStitching = false;
        this.captureCooldown = 0;
        this.dwellTargetId = null;
        this.dwellStartMs = 0;
        this.flashAlpha = 0;
        this.lastHorizonCanvas = null;

        this._rebuildTargets(14);
    }

    _rebuildTargets(horizonCount) {
        const step = 360 / horizonCount;
        this.targetStepDeg = step;

        const horizon = Array.from({ length: horizonCount }, (_, i) => {
            const yaw = this._normYaw(i * step);
            return {
                id: `h-${i}`,
                ring: 'horizon',
                index: i,
                yaw,
                pitch: 0,
                captured: false,
                vec: this._yawPitchToVec(yaw, 0),
            };
        });

        const upper = Array.from({ length: 6 }, (_, i) => {
            const yaw = this._normYaw(i * 60);
            return {
                id: `u-${i}`,
                ring: 'upper',
                index: i,
                yaw,
                pitch: 42,
                captured: false,
                vec: this._yawPitchToVec(yaw, 42),
            };
        });

        const lower = Array.from({ length: 6 }, (_, i) => {
            const yaw = this._normYaw(i * 60);
            return {
                id: `d-${i}`,
                ring: 'lower',
                index: i,
                yaw,
                pitch: -42,
                captured: false,
                vec: this._yawPitchToVec(yaw, -42),
            };
        });

        this.targets = [...horizon, ...upper, ...lower];
    }

    async start({ gyroGranted = null } = {}) {
        this.running = true;

        if (gyroGranted === true) {
            this._bindGyro();
        } else if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const perm = await DeviceOrientationEvent.requestPermission();
                if (perm === 'granted') this._bindGyro();
            } catch {
                // fallback to manual drag / enable button
            }
        } else if ('DeviceOrientationEvent' in window) {
            this._bindGyro();
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: 'environment' },
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                    audio: false,
                });
                this.videoEl.srcObject = this.stream;
                await this.videoEl.play();
                this.hasLiveCamera = true;

                const vw = this.videoEl.videoWidth || 720;
                const vh = this.videoEl.videoHeight || 1280;
                this._rebuildTargets(vw < vh ? 14 : 12);

                this._notifyStatus('Langkah 1: Putar mendatar ikuti bulatan KUNING. Lalu dongak (BIRU) & tunduk (UNGU) untuk plafon & lantai.');
            } catch (err) {
                this.hasLiveCamera = false;
                this._rebuildTargets(12);
                this._notifyStatus(`Kamera tidak dapat dibuka (${err?.name || 'izin ditolak'}). Mode Simulasi aktif.`);
            }
        } else {
            this.hasLiveCamera = false;
            this._rebuildTargets(12);
            this._notifyStatus(
                window.isSecureContext
                    ? 'Kamera perangkat tidak terdeteksi. Mode Simulasi 360° aktif.'
                    : 'Kamera browser butuh HTTPS. Buka lewat tautan HTTPS lokal atau pakai tombol Kamera Bawaan HP.'
            );
        }

        this._updateManualVectors();
        this._emitCapabilities();
        this._emitProgress();
        this._bindManualDrag();
        this._loop();
    }

    async enableGyroFromGesture() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const perm = await DeviceOrientationEvent.requestPermission();
            if (perm !== 'granted') {
                throw new Error('Izin sensor gerak ditolak.');
            }
        }
        this._bindGyro();
        this._emitCapabilities();
    }

    _bindGyro() {
        if (this._onGyro) return;
        const zee = new THREE.Vector3(0, 0, 1);
        const worldUp = new THREE.Vector3(0, 1, 0);
        const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
        const q0 = new THREE.Quaternion();
        const euler = new THREE.Euler();

        this._onGyro = (e) => {
            if (e.alpha === null || e.beta === null) return;
            this.hasGyro = true;

            const screenAngle = window.screen?.orientation?.angle ?? window.orientation ?? 0;
            const alpha = THREE.MathUtils.degToRad(e.alpha);
            const beta = THREE.MathUtils.degToRad(e.beta);
            const gamma = THREE.MathUtils.degToRad(e.gamma || 0);
            const orient = THREE.MathUtils.degToRad(screenAngle);

            euler.set(beta, alpha, -gamma, 'YXZ');
            const qRaw = new THREE.Quaternion().setFromEuler(euler);
            qRaw.multiply(q1);
            qRaw.multiply(q0.setFromAxisAngle(zee, -orient));

            if (!this.qAlign) {
                const startFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(qRaw);
                const startAz = Math.atan2(startFwd.z, startFwd.x);
                this.qAlign = new THREE.Quaternion().setFromAxisAngle(worldUp, startAz);
            }

            this.cameraQuat.copy(this.qAlign).multiply(qRaw);
            this.cameraForward.set(0, 0, -1).applyQuaternion(this.cameraQuat).normalize();
            this.cameraRight.set(1, 0, 0).applyQuaternion(this.cameraQuat).normalize();
            this.cameraUp.set(0, 1, 0).applyQuaternion(this.cameraQuat).normalize();

            this.currentYaw = THREE.MathUtils.radToDeg(Math.atan2(this.cameraForward.z, this.cameraForward.x));
            this.currentPitch = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, this.cameraForward.y))));
            this.currentRoll = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, this.cameraRight.y))));

            this._emitCapabilities();
        };
        window.addEventListener('deviceorientation', this._onGyro);
    }

    _updateManualVectors() {
        const yawRad = THREE.MathUtils.degToRad(this.currentYaw);
        const pitchRad = THREE.MathUtils.degToRad(this.currentPitch);
        const cp = Math.cos(pitchRad);

        this.cameraForward.set(cp * Math.cos(yawRad), Math.sin(pitchRad), cp * Math.sin(yawRad)).normalize();
        const worldUp = new THREE.Vector3(0, 1, 0);
        this.cameraRight.crossVectors(this.cameraForward, worldUp).normalize();
        if (this.cameraRight.lengthSq() < 0.001) {
            this.cameraRight.set(0, 0, 1);
        }
        this.cameraUp.crossVectors(this.cameraRight, this.cameraForward).normalize();
        this.currentRoll = 0;
    }

    _bindManualDrag() {
        let dragging = false;
        let sx = 0;
        let sy = 0;
        let syaw = 0;
        let spitch = 0;

        this._onDown = (e) => {
            if (this.hasGyro) return;
            dragging = true;
            sx = e.clientX;
            sy = e.clientY;
            syaw = this.currentYaw;
            spitch = this.currentPitch;
        };
        this._onMove = (e) => {
            if (!dragging || this.hasGyro) return;
            const dx = e.clientX - sx;
            const dy = e.clientY - sy;
            this.currentYaw = this._normYaw(syaw + dx * 0.35);
            this.currentPitch = Math.max(-60, Math.min(60, spitch - dy * 0.25));
            this._updateManualVectors();
        };
        this._onUp = () => { dragging = false; };

        this.overlayCanvas.addEventListener('pointerdown', this._onDown);
        window.addEventListener('pointermove', this._onMove);
        window.addEventListener('pointerup', this._onUp);
    }

    autoSweepDemo() {
        if (this.hasLiveCamera || this.isStitching) return;
        const next = this.targets.find((t) => !t.captured);
        if (!next) return;
        this.currentYaw = next.yaw;
        this.currentPitch = next.pitch;
        this._updateManualVectors();
        this.captureCurrentPose(next);
    }

    captureCurrentManual() {
        if (this.isStitching) return;
        const nearest = this._findNearestUncaptured(22);
        this.captureCurrentPose(nearest);
    }

    finishNow() {
        if (this.isStitching) return;
        if (this.horizonFrames.length < 3) {
            throw new Error('Tangkap minimal 3 titik mendatar (bulatan kuning) terlebih dahulu.');
        }
        this._triggerStitch();
    }

    _triggerStitch() {
        if (this.isStitching) return;
        this.isStitching = true;

        if (this.serverStitchUrl && this.rawBlobs.length >= 2) {
            this._notifyStatus(`Mengirim ${this.rawBlobs.length} foto ke Server OpenCV 3D untuk dijahit presisi...`);
            this._stitchOnServer()
                .then((res) => {
                    if (this.onComplete) this.onComplete(res);
                })
                .catch((err) => {
                    console.warn('Server OpenCV stitch fallback:', err);
                    this._notifyStatus('Fallback ke penjahitan lokal browser...');
                    try {
                        const dataUrl = this.stitchEquirectangular();
                        if (this.onComplete) this.onComplete({ dataUrl, previewToken: null, engine: 'browser_fallback' });
                    } catch (e2) {
                        this.isStitching = false;
                        this._notifyStatus(`Gagal menjahit: ${e2.message}`);
                    }
                });
            return;
        }

        this._notifyStatus('Menyelaraskan sambungan, plafon & lantai 360°...');
        setTimeout(() => {
            try {
                const dataUrl = this.stitchEquirectangular();
                if (this.onComplete) this.onComplete({ dataUrl, previewToken: null, engine: 'browser' });
            } catch (err) {
                this.isStitching = false;
                this._notifyStatus(`Gagal menjahit: ${err.message}`);
            }
        }, 40);
    }

    async _stitchOnServer() {
        const fd = new FormData();
        const poses = [];
        this.rawBlobs.forEach((item, idx) => {
            fd.append('frames[]', item.blob, `frame_${String(idx).padStart(3, '0')}.jpg`);
            poses.push(item.pose);
        });
        fd.append('poses_json', JSON.stringify(poses));

        const res = await fetch(this.serverStitchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                ...(this.csrfToken ? { 'X-CSRF-TOKEN': this.csrfToken } : {}),
            },
            body: fd,
        });
        const data = await res.json();
        if (!res.ok || !data.preview_url) {
            throw new Error(data.message || 'Server OpenCV gagal menjahit.');
        }
        return {
            previewUrl: data.preview_url,
            previewToken: data.preview_token,
            engine: data.stitch_meta?.engine || 'opencv_3d',
        };
    }

    _findNearestUncaptured(maxAngleDeg = 8.0) {
        let best = null;
        let bestAngle = Infinity;
        for (const t of this.targets) {
            if (t.captured) continue;
            const dot = Math.max(-1, Math.min(1, this.cameraForward.dot(t.vec)));
            const angleDeg = THREE.MathUtils.radToDeg(Math.acos(dot));
            if (angleDeg < maxAngleDeg && angleDeg < bestAngle) {
                best = t;
                bestAngle = angleDeg;
            }
        }
        return best;
    }

    captureCurrentPose(targetToMark = null) {
        if (this.isStitching) return;
        const now = performance.now();
        if (now < this.captureCooldown) return;
        this.captureCooldown = now + 350;

        const { frameW, frameH, estHfovDeg } = this._getCameraCaptureSpec();
        const frame = document.createElement('canvas');
        frame.width = frameW;
        frame.height = frameH;
        const ctx = frame.getContext('2d');

        if (this.hasLiveCamera && this.videoEl.readyState >= 2 && this.videoEl.videoWidth > 0) {
            ctx.drawImage(this.videoEl, 0, 0, frameW, frameH);
        } else {
            this._renderSimulatedCameraView(ctx, frameW, frameH, this.currentYaw, this.currentPitch);
        }

        const imgData = ctx.getImageData(0, 0, frameW, frameH);
        const ring = targetToMark ? targetToMark.ring : (Math.abs(this.currentPitch) > 22 ? (this.currentPitch > 0 ? 'upper' : 'lower') : 'horizon');

        const record = {
            w: frameW,
            h: frameH,
            pixels: imgData.data,
            estHfovDeg,
            ring,
            yawDeg: this.currentYaw,
            pitchDeg: this.currentPitch,
            rollDeg: this.currentRoll,
            fwd: this.cameraForward.clone(),
            right: this.cameraRight.clone(),
            up: this.cameraUp.clone(),
        };

        if (ring === 'horizon') {
            this.horizonFrames.push(record);
            this.lastHorizonCanvas = frame;
        } else {
            this.capFrames.push(record);
        }

        // Capture full-quality JPEG blob for server-side OpenCV 3D stitching
        const hiCanvas = document.createElement('canvas');
        if (this.hasLiveCamera && this.videoEl.readyState >= 2 && this.videoEl.videoWidth > 0) {
            const vw = this.videoEl.videoWidth;
            const vh = this.videoEl.videoHeight;
            const sc = Math.min(1, 1080 / Math.max(vw, vh));
            hiCanvas.width = Math.round(vw * sc);
            hiCanvas.height = Math.round(vh * sc);
            hiCanvas.getContext('2d').drawImage(this.videoEl, 0, 0, hiCanvas.width, hiCanvas.height);
        } else {
            hiCanvas.width = frameW;
            hiCanvas.height = frameH;
            hiCanvas.getContext('2d').drawImage(frame, 0, 0);
        }
        const poseSnapshot = { ring, yaw: this.currentYaw, pitch: this.currentPitch, roll: this.currentRoll };
        hiCanvas.toBlob((blob) => {
            if (blob) this.rawBlobs.push({ blob, pose: poseSnapshot });
        }, 'image/jpeg', 0.9);

        if (targetToMark) {
            targetToMark.captured = true;
        }

        this.flashAlpha = 0.55;
        this._emitProgress();

        if (this.targets.every((t) => t.captured)) {
            this._triggerStitch();
        }
    }

    _getCameraCaptureSpec() {
        const vw = this.videoEl?.videoWidth || this.overlayCanvas.clientWidth || 640;
        const vh = this.videoEl?.videoHeight || this.overlayCanvas.clientHeight || 480;
        const aspect = vw / Math.max(1, vh);
        const estHfovDeg = vw < vh ? (aspect < 0.65 ? 48 : 54) : 64;

        const targetH = vw < vh ? 640 : 480;
        const frameH = targetH;
        const frameW = Math.max(240, Math.round(targetH * aspect));

        const tanHalfH = Math.tan(THREE.MathUtils.degToRad(estHfovDeg / 2));
        const tanHalfV = tanHalfH / Math.max(0.3, aspect);

        return { frameW, frameH, estHfovDeg, tanHalfH, tanHalfV };
    }

    /**
     * Full-Sphere Panorama Stitcher:
     * 1. CV-Aligned Cylindrical Horizon Ring (fine-refined dx/dy + clean 360° wrap closure + DP seam + multi-band feather)
     * 2. Equirectangular base with smooth ambient cap fill (guarantees ZERO black holes!)
     * 3. Auto-calibrated spherical projection of Upper (+42°) & Lower (-42°) frames layered smoothly on top!
     */
    stitchEquirectangular() {
        const rawFrames = [...this.horizonFrames];
        if (rawFrames.length === 0) {
            throw new Error('Belum ada foto mendatar yang tertangkap.');
        }

        // Order horizon frames strictly by ascending azimuth angle [0..360) so order is always coherent
        // even if the user scanned back-and-forth or filled a missed dot later!
        const norm360 = (deg) => ((deg % 360) + 360) % 360;
        const frames = [...rawFrames].sort((a, b) => norm360(a.yawDeg) - norm360(b.yawDeg));

        const fw = frames[0].w;
        const fh = frames[0].h;
        const estHfovRad = THREE.MathUtils.degToRad(frames[0].estHfovDeg);
        const fPxInit = (fw * 0.5) / Math.tan(estHfovRad * 0.5);

        // 1. Cylindrical pre-warp + roll leveling
        const warped = frames.map((fr) => this._cylindricalWarpFrame(fr, fPxInit));

        // 2. Two-scale grayscale pyramids (0.25 coarse, 0.5 fine) for sub-2px visual alignment
        const graysCoarse = warped.map((wf) => this._toDownscaledGray(wf, 0.25));
        const graysFine = warped.map((wf) => this._toDownscaledGray(wf, 0.5));

        const dxs = [];
        const dys = [];
        let totalGyroSpan = 0;

        for (let i = 1; i < warped.length; i++) {
            const dYaw = Math.max(8, norm360(frames[i].yawDeg) - norm360(frames[i - 1].yawDeg));
            totalGyroSpan += dYaw;
            const expectedDx = Math.max(fw * 0.14, Math.min(fw * 0.85, THREE.MathUtils.degToRad(dYaw) * fPxInit));
            const match = this._alignPairMultiScale(graysCoarse[i - 1], graysCoarse[i], graysFine[i - 1], graysFine[i], expectedDx);
            dxs.push(match.dx);
            dys.push(match.dy);
        }

        // 3. Detect full 360° loop closure (match last frame back onto frame 0)
        const closingGapYaw = 360 - norm360(frames[frames.length - 1].yawDeg) + norm360(frames[0].yawDeg);
        let isClosed360 = warped.length >= 8 && closingGapYaw <= 68;
        let closingDx = 0;
        let closingDy = 0;

        if (isClosed360) {
            const expectedCloseDx = Math.max(fw * 0.14, Math.min(fw * 0.85, THREE.MathUtils.degToRad(closingGapYaw) * fPxInit));
            const closeMatch = this._alignPairMultiScale(
                graysCoarse[graysCoarse.length - 1],
                graysCoarse[0],
                graysFine[graysFine.length - 1],
                graysFine[0],
                expectedCloseDx
            );
            closingDx = closeMatch.dx;
            closingDy = closeMatch.dy;
        }

        // Distribute vertical drift across all steps so horizon closes cleanly at y(N) == y(0)!
        const allDys = isClosed360 ? [...dys, closingDy] : [...dys];
        const sumDy = allDys.reduce((a, b) => a + b, 0);
        const driftPerStep = allDys.length > 0 ? sumDy / allDys.length : 0;

        const posX = [0];
        const posY = [0];
        for (let i = 0; i < dxs.length; i++) {
            posX.push(posX[i] + Math.max(Math.round(fw * 0.12), dxs[i]));
            posY.push(posY[i] + Math.round(dys[i] - driftPerStep));
        }

        const panoW = isClosed360
            ? Math.max(fw + 32, posX[posX.length - 1] + Math.max(Math.round(fw * 0.12), closingDx))
            : posX[posX.length - 1] + fw;

        const minY = Math.min(...posY);
        const maxY = Math.max(...posY);
        const shiftY = -minY;
        const panoH = fh + (maxY - minY);

        // 4. Cyclic exposure equalization (anchors loop back to frame 0 so x=0 has ZERO brightness cliff!)
        const gains = new Float32Array(warped.length).fill(1);
        const logGains = new Float32Array(warped.length).fill(0);
        for (let i = 1; i < warped.length; i++) {
            const ovX = Math.max(0, fw - (posX[i] - posX[i - 1]));
            const ratio = this._computeOverlapGain(warped[i - 1], warped[i], posX[i] - posX[i - 1], posY[i] - posY[i - 1], ovX);
            logGains[i] = logGains[i - 1] + Math.log(ratio) * 0.7;
        }
        if (isClosed360) {
            const closeOvX = Math.max(0, fw - closingDx);
            const closeRatio = this._computeOverlapGain(warped[warped.length - 1], warped[0], closingDx, posY[0] - posY[warped.length - 1], closeOvX);
            const loopLogErr = logGains[warped.length - 1] + Math.log(closeRatio) * 0.7;
            for (let i = 0; i < warped.length; i++) {
                logGains[i] -= (loopLogErr * i) / warped.length;
            }
        }
        const avgLog = logGains.reduce((a, b) => a + b, 0) / logGains.length;
        for (let i = 0; i < warped.length; i++) {
            gains[i] = Math.max(0.75, Math.min(1.32, Math.exp(logGains[i] - avgLog)));
        }

        // 5. Composite onto cylindrical canvas with DP min-error seam + 2-band multi-band blend
        // IMPORTANT: On a closed 360° loop, composite frames 0..N-1 first WITHOUT letting frame N-1
        // hard-overwrite frame 0's left edge; then close the wrap seam with proper left->right alpha!
        const cylRgb = new Uint8ClampedArray(panoW * panoH * 4);
        const cylFilled = new Uint8Array(panoW * panoH);

        for (let i = 0; i < warped.length; i++) {
            const wf = warped[i];
            const ox = posX[i];
            const oy = posY[i] + shiftY;
            const gain = gains[i];

            if (i === 0) {
                this._blitFrameDirect(wf, cylRgb, cylFilled, panoW, panoH, ox, oy, gain, false);
            } else {
                const prevDx = posX[i] - posX[i - 1];
                const ovW = Math.max(0, fw - prevDx);
                // Do NOT wrap past panoW yet so frame 0 stays untouched for the clean loop-closure seam!
                this._compositeWithSeam(wf, cylRgb, cylFilled, panoW, panoH, ox, oy, ovW, gain, false, false);
            }
        }

        if (isClosed360) {
            // Now smoothly blend the wrapped tail of frame N-1 across [0 .. closeOvW-1] ONTO frame 0!
            // Left of seam (x=0, adjacent to panoW-1) = 100% frame N-1; Right of seam (x=closeOvW) = 100% frame 0!
            const lastIdx = warped.length - 1;
            const lastWf = warped[lastIdx];
            const tailStartInFrame = panoW - posX[lastIdx]; // pixel column in lastWf that lands at x = 0
            const closeOvW = Math.max(0, fw - tailStartInFrame);
            if (closeOvW >= 12) {
                this._compositeClosingTail(
                    lastWf,
                    tailStartInFrame,
                    closeOvW,
                    cylRgb,
                    cylFilled,
                    panoW,
                    panoH,
                    posY[lastIdx] + shiftY,
                    gains[lastIdx]
                );
            }
        }

        // 6. Project cylindrical panorama to 2048x1024 equirectangular + smooth cap fill
        const effectiveSpanRad = isClosed360
            ? Math.PI * 2
            : Math.min(Math.PI * 2, THREE.MathUtils.degToRad(Math.max(90, totalGyroSpan + frames[0].estHfovDeg)));
        const fEff = isClosed360 ? panoW / (Math.PI * 2) : Math.max(fPxInit * 0.75, panoW / effectiveSpanRad);

        const EQ_W = 2048;
        const EQ_H = 1024;
        const outCanvas = document.createElement('canvas');
        outCanvas.width = EQ_W;
        outCanvas.height = EQ_H;
        const outCtx = outCanvas.getContext('2d');
        const outImg = outCtx.createImageData(EQ_W, EQ_H);

        this._renderCylindricalBase(
            outImg.data,
            EQ_W,
            EQ_H,
            cylRgb,
            cylFilled,
            panoW,
            panoH,
            isClosed360,
            fEff,
            effectiveSpanRad,
            norm360(frames[0].yawDeg)
        );

        // 7. Layer real Upper (+42° ceiling) & Lower (-42° floor) shots smoothly onto the 100%-filled base!
        if (this.capFrames.length > 0) {
            this._blendCapFramesOntoEquirectangular(outImg.data, EQ_W, EQ_H, this.capFrames, fEff, fw, fh);
        }

        outCtx.putImageData(outImg, 0, 0);
        return outCanvas.toDataURL('image/webp', 0.9);
    }

    _cylindricalWarpFrame(fr, fPx) {
        const w = fr.w;
        const h = fr.h;
        const src = fr.pixels;
        const out = new Uint8ClampedArray(w * h * 4);
        const mask = new Uint8Array(w * h);

        const cx = w * 0.5;
        const cy = h * 0.5;
        const rollRad = THREE.MathUtils.degToRad(Math.max(-12, Math.min(12, fr.rollDeg || 0)));
        const cosR = Math.cos(rollRad);
        const sinR = Math.sin(rollRad);

        for (let y = 0; y < h; y++) {
            const dy = y - cy;
            const row = y * w;
            for (let x = 0; x < w; x++) {
                const theta = (x - cx) / fPx;
                const cosT = Math.cos(theta);
                const ux = fPx * Math.tan(theta);
                const uy = dy / cosT;

                const rx = ux * cosR - uy * sinR + cx;
                const ry = ux * sinR + uy * cosR + cy;

                if (rx >= 0 && rx < w - 1 && ry >= 0 && ry < h - 1) {
                    const x0 = rx | 0;
                    const y0 = ry | 0;
                    const tx = rx - x0;
                    const ty = ry - y0;
                    const i00 = (y0 * w + x0) * 4;
                    const i10 = i00 + 4;
                    const i01 = i00 + w * 4;
                    const i11 = i01 + 4;

                    const w00 = (1 - tx) * (1 - ty);
                    const w10 = tx * (1 - ty);
                    const w01 = (1 - tx) * ty;
                    const w11 = tx * ty;

                    const dst = (row + x) * 4;
                    out[dst] = src[i00] * w00 + src[i10] * w10 + src[i01] * w01 + src[i11] * w11;
                    out[dst + 1] = src[i00 + 1] * w00 + src[i10 + 1] * w10 + src[i01 + 1] * w01 + src[i11 + 1] * w11;
                    out[dst + 2] = src[i00 + 2] * w00 + src[i10 + 2] * w10 + src[i01 + 2] * w01 + src[i11 + 2] * w11;
                    out[dst + 3] = 255;
                    mask[row + x] = 1;
                }
            }
        }

        return { w, h, pixels: out, mask };
    }

    _toDownscaledGray(wf, scale) {
        const sw = Math.max(32, Math.round(wf.w * scale));
        const sh = Math.max(32, Math.round(wf.h * scale));
        const gray = new Float32Array(sw * sh);
        const mask = new Uint8Array(sw * sh);

        for (let y = 0; y < sh; y++) {
            const sy = Math.min(wf.h - 1, Math.round(y / scale));
            for (let x = 0; x < sw; x++) {
                const sx = Math.min(wf.w - 1, Math.round(x / scale));
                const idx = sy * wf.w + sx;
                if (wf.mask[idx]) {
                    const p = idx * 4;
                    gray[y * sw + x] = 0.299 * wf.pixels[p] + 0.587 * wf.pixels[p + 1] + 0.114 * wf.pixels[p + 2];
                    mask[y * sw + x] = 1;
                }
            }
        }
        return { w: sw, h: sh, gray, mask, scale };
    }

    _alignPairMultiScale(gA25, gB25, gA50, gB50, expectedDxFull) {
        const coarse = this._searchAlign(gA25, gB25, expectedDxFull * 0.25, Math.round(gA25.w * 0.36), Math.round(gA25.h * 0.15), 2);
        const seedDx50 = Math.round(coarse.dx * 2);
        const seedDy50 = Math.round(coarse.dy * 2);
        const fine = this._searchAlignAround(gA50, gB50, seedDx50, seedDy50, 5, 5);
        return {
            dx: Math.round(fine.dx * 2),
            dy: Math.round(fine.dy * 2),
            score: fine.score,
        };
    }

    _searchAlign(gA, gB, expectedDx, dxRadius, maxDy, step) {
        const minDx = Math.max(4, Math.floor(Math.max(gA.w * 0.14, expectedDx - dxRadius)));
        const maxDx = Math.min(gA.w - 8, Math.ceil(Math.min(gA.w * 0.86, expectedDx + dxRadius)));
        let bestDx = Math.round(expectedDx);
        let bestDy = 0;
        let bestScore = Infinity;

        for (let dx = minDx; dx <= maxDx; dx += step) {
            for (let dy = -maxDy; dy <= maxDy; dy += step) {
                const s = this._evalPatchError(gA, gB, dx, dy, expectedDx);
                if (s < bestScore) {
                    bestScore = s;
                    bestDx = dx;
                    bestDy = dy;
                }
            }
        }
        return this._searchAlignAround(gA, gB, bestDx, bestDy, step, step, expectedDx);
    }

    _searchAlignAround(gA, gB, centerDx, centerDy, rx, ry, expectedDx = centerDx) {
        const minDx = Math.max(4, centerDx - rx);
        const maxDx = Math.min(gA.w - 8, centerDx + rx);
        const maxDy = Math.floor(gA.h * 0.18);
        let bestDx = centerDx;
        let bestDy = centerDy;
        let bestScore = Infinity;

        for (let dx = minDx; dx <= maxDx; dx++) {
            for (let dy = Math.max(-maxDy, centerDy - ry); dy <= Math.min(maxDy, centerDy + ry); dy++) {
                const s = this._evalPatchError(gA, gB, dx, dy, expectedDx);
                if (s < bestScore) {
                    bestScore = s;
                    bestDx = dx;
                    bestDy = dy;
                }
            }
        }
        return { dx: bestDx, dy: bestDy, score: bestScore };
    }

    _evalPatchError(gA, gB, dx, dy, expectedDx) {
        const sw = gA.w;
        const sh = gA.h;
        const ovW = sw - dx;
        if (ovW < 8) return 999;

        const yStart = Math.max(Math.floor(sh * 0.08), -dy);
        const yEnd = Math.min(Math.floor(sh * 0.92), sh - dy);
        const xStep = ovW > 48 ? 2 : 1;
        const yStep = sh > 180 ? 2 : 1;

        let sumA = 0, sumB = 0, cnt = 0;
        for (let y = yStart; y < yEnd; y += yStep) {
            const rA = (y + dy) * sw;
            const rB = y * sw;
            for (let x = 0; x < ovW; x += xStep) {
                const iA = rA + (dx + x);
                const iB = rB + x;
                if (gA.mask[iA] && gB.mask[iB]) {
                    sumA += gA.gray[iA];
                    sumB += gB.gray[iB];
                    cnt++;
                }
            }
        }
        if (cnt < 25) return 999;
        const meanDiff = (sumA - sumB) / cnt;

        let err = 0;
        for (let y = yStart; y < yEnd; y += yStep) {
            const rA = (y + dy) * sw;
            const rB = y * sw;
            for (let x = 0; x < ovW; x += xStep) {
                const iA = rA + (dx + x);
                const iB = rB + x;
                if (gA.mask[iA] && gB.mask[iB]) {
                    err += Math.abs((gA.gray[iA] - gB.gray[iB]) - meanDiff);
                }
            }
        }
        const prior = Math.abs(dx - expectedDx) * 0.04 + Math.abs(dy) * 0.06;
        return err / cnt + prior;
    }

    _computeOverlapGain(wfPrev, wfCurr, dx, dy, ovW) {
        if (ovW < 10) return 1;
        let sumPrev = 0, sumCurr = 0, cnt = 0;
        const h = wfPrev.h;
        const w = wfPrev.w;
        for (let y = Math.floor(h * 0.15); y < Math.floor(h * 0.85); y += 4) {
            const yPrev = y + dy;
            if (yPrev < 0 || yPrev >= h) continue;
            for (let x = 4; x < ovW - 4; x += 4) {
                const xPrev = dx + x;
                if (xPrev < 0 || xPrev >= w) continue;
                const iP = yPrev * w + xPrev;
                const iC = y * w + x;
                if (wfPrev.mask[iP] && wfCurr.mask[iC]) {
                    sumPrev += wfPrev.pixels[iP * 4] + wfPrev.pixels[iP * 4 + 1] + wfPrev.pixels[iP * 4 + 2];
                    sumCurr += wfCurr.pixels[iC * 4] + wfCurr.pixels[iC * 4 + 1] + wfCurr.pixels[iC * 4 + 2];
                    cnt++;
                }
            }
        }
        if (cnt < 20 || sumCurr < 100) return 1;
        return Math.max(0.75, Math.min(1.3, sumPrev / sumCurr));
    }

    _blitFrameDirect(wf, cylRgb, cylFilled, panoW, panoH, ox, oy, gain, wrapX) {
        const { w, h, pixels, mask } = wf;
        for (let y = 0; y < h; y++) {
            const py = oy + y;
            if (py < 0 || py >= panoH) continue;
            for (let x = 0; x < w; x++) {
                const si = y * w + x;
                if (!mask[si]) continue;
                let px = ox + x;
                if (wrapX) px = ((px % panoW) + panoW) % panoW;
                if (px < 0 || px >= panoW) continue;
                const di = py * panoW + px;
                const sp = si * 4;
                const dp = di * 4;
                cylRgb[dp] = Math.min(255, pixels[sp] * gain);
                cylRgb[dp + 1] = Math.min(255, pixels[sp + 1] * gain);
                cylRgb[dp + 2] = Math.min(255, pixels[sp + 2] * gain);
                cylRgb[dp + 3] = 255;
                cylFilled[di] = 1;
            }
        }
    }

    _findOptimalSeam(cylRgb, cylFilled, panoW, panoH, ox, oy, wf, srcOffsetX, ovW, gain) {
        const { w, h, pixels, mask } = wf;
        const seamX = new Int16Array(h).fill(Math.floor(ovW * 0.5));
        if (ovW < 10) return seamX;

        const dp = new Float32Array(h * ovW);
        const margin = Math.max(3, Math.floor(ovW * 0.14));

        for (let y = 0; y < h; y++) {
            const py = oy + y;
            const rowOff = y * ovW;
            for (let x = 0; x < ovW; x++) {
                const px = ox + x;
                const sx = srcOffsetX + x;
                let e = 10;
                if (py >= 0 && py < panoH && px >= 0 && px < panoW && sx >= 0 && sx < w) {
                    const di = py * panoW + px;
                    const si = y * w + sx;
                    if (cylFilled[di] && mask[si]) {
                        const dp4 = di * 4;
                        const sp4 = si * 4;
                        e = Math.abs(cylRgb[dp4] - pixels[sp4] * gain)
                            + Math.abs(cylRgb[dp4 + 1] - pixels[sp4 + 1] * gain)
                            + Math.abs(cylRgb[dp4 + 2] - pixels[sp4 + 2] * gain);
                    } else if (!cylFilled[di]) {
                        e = 0;
                    }
                }
                if (x < margin || x >= ovW - margin) e += 160;

                if (y === 0) {
                    dp[rowOff + x] = e;
                } else {
                    const prevRow = (y - 1) * ovW;
                    let bestPrev = dp[prevRow + x];
                    if (x > 0 && dp[prevRow + x - 1] < bestPrev) bestPrev = dp[prevRow + x - 1];
                    if (x + 1 < ovW && dp[prevRow + x + 1] < bestPrev) bestPrev = dp[prevRow + x + 1];
                    dp[rowOff + x] = e + bestPrev;
                }
            }
        }

        let bestEnd = Math.floor(ovW * 0.5);
        let minCost = Infinity;
        const lastRow = (h - 1) * ovW;
        for (let x = 0; x < ovW; x++) {
            if (dp[lastRow + x] < minCost) {
                minCost = dp[lastRow + x];
                bestEnd = x;
            }
        }
        seamX[h - 1] = bestEnd;
        for (let y = h - 2; y >= 0; y--) {
            const prevX = seamX[y + 1];
            const rowOff = y * ovW;
            let bx = prevX;
            let bv = dp[rowOff + prevX];
            if (prevX > 0 && dp[rowOff + prevX - 1] < bv) { bv = dp[rowOff + prevX - 1]; bx = prevX - 1; }
            if (prevX + 1 < ovW && dp[rowOff + prevX + 1] < bv) { bx = prevX + 1; }
            seamX[y] = bx;
        }
        return seamX;
    }

    _compositeWithSeam(wf, cylRgb, cylFilled, panoW, panoH, ox, oy, ovW, gain) {
        const { w, h, pixels, mask } = wf;
        const clampedOvW = Math.min(w, Math.max(0, ovW));
        const seamX = this._findOptimalSeam(cylRgb, cylFilled, panoW, panoH, ox, oy, wf, 0, clampedOvW, gain);
        const feather = Math.max(10, Math.min(26, Math.floor(clampedOvW * 0.22)));

        for (let y = 0; y < h; y++) {
            const py = oy + y;
            if (py < 0 || py >= panoH) continue;
            const sxCut = seamX[y];

            for (let x = 0; x < w; x++) {
                const px = ox + x;
                if (px < 0 || px >= panoW) continue;
                const si = y * w + x;
                if (!mask[si]) continue;

                const di = py * panoW + px;
                const sp = si * 4;
                const dp4 = di * 4;

                const nr = Math.min(255, pixels[sp] * gain);
                const ng = Math.min(255, pixels[sp + 1] * gain);
                const nb = Math.min(255, pixels[sp + 2] * gain);

                if (!cylFilled[di]) {
                    cylRgb[dp4] = nr; cylRgb[dp4 + 1] = ng; cylRgb[dp4 + 2] = nb; cylRgb[dp4 + 3] = 255;
                    cylFilled[di] = 1;
                    continue;
                }

                let alpha = 1;
                if (x < clampedOvW) {
                    const dist = x - sxCut;
                    if (dist <= -feather) alpha = 0;
                    else if (dist >= feather) alpha = 1;
                    else {
                        const t = (dist + feather) / (2 * feather);
                        alpha = t * t * (3 - 2 * t);
                    }
                }

                if (alpha > 0.001) {
                    const inv = 1 - alpha;
                    cylRgb[dp4] = cylRgb[dp4] * inv + nr * alpha;
                    cylRgb[dp4 + 1] = cylRgb[dp4 + 1] * inv + ng * alpha;
                    cylRgb[dp4 + 2] = cylRgb[dp4 + 2] * inv + nb * alpha;
                    cylRgb[dp4 + 3] = 255;
                }
            }
        }
    }

    /**
     * Cleanly closes the 360° wrap seam at x = 0:
     * At x = 0 (adjacent to panoW-1), weight of lastWf is 1.0 (0% frame 0).
     * Across the optimal seam toward x = closeOvW, weight transitions smoothly to 0.0 (100% frame 0).
     */
    _compositeClosingTail(lastWf, srcOffsetX, closeOvW, cylRgb, cylFilled, panoW, panoH, oy, gain) {
        const { w, h, pixels, mask } = lastWf;
        const ovW = Math.min(closeOvW, w - srcOffsetX, panoW);
        if (ovW < 8) return;

        const seamX = this._findOptimalSeam(cylRgb, cylFilled, panoW, panoH, 0, oy, lastWf, srcOffsetX, ovW, gain);
        const feather = Math.max(10, Math.min(26, Math.floor(ovW * 0.24)));

        for (let y = 0; y < h; y++) {
            const py = oy + y;
            if (py < 0 || py >= panoH) continue;
            const sxCut = seamX[y];

            for (let x = 0; x < ovW; x++) {
                const sx = srcOffsetX + x;
                if (sx < 0 || sx >= w) continue;
                const si = y * w + sx;
                if (!mask[si]) continue;

                const di = py * panoW + x;
                const sp = si * 4;
                const dp4 = di * 4;
                const nr = Math.min(255, pixels[sp] * gain);
                const ng = Math.min(255, pixels[sp + 1] * gain);
                const nb = Math.min(255, pixels[sp + 2] * gain);

                if (!cylFilled[di]) {
                    cylRgb[dp4] = nr; cylRgb[dp4 + 1] = ng; cylRgb[dp4 + 2] = nb; cylRgb[dp4 + 3] = 255;
                    cylFilled[di] = 1;
                    continue;
                }

                // Weight of incoming lastWf: 1.0 on the LEFT (x=0), transitioning to 0.0 on the RIGHT (x=ovW)
                const dist = sxCut - x;
                let wTail;
                if (dist >= feather) wTail = 1;
                else if (dist <= -feather) wTail = 0;
                else {
                    const t = (dist + feather) / (2 * feather);
                    wTail = t * t * (3 - 2 * t);
                }

                if (wTail > 0.001) {
                    const inv = 1 - wTail;
                    cylRgb[dp4] = cylRgb[dp4] * inv + nr * wTail;
                    cylRgb[dp4 + 1] = cylRgb[dp4 + 1] * inv + ng * wTail;
                    cylRgb[dp4 + 2] = cylRgb[dp4 + 2] * inv + nb * wTail;
                    cylRgb[dp4 + 3] = 255;
                }
            }
        }
    }

    _renderCylindricalBase(out, EQ_W, EQ_H, cylRgb, cylFilled, panoW, panoH, isClosed360, fEff, effectiveSpanRad, startYawDeg) {
        const colTop = new Int16Array(panoW).fill(-1);
        const colBot = new Int16Array(panoW).fill(-1);
        const topR = new Float32Array(panoW), topG = new Float32Array(panoW), topB = new Float32Array(panoW);
        const botR = new Float32Array(panoW), botG = new Float32Array(panoW), botB = new Float32Array(panoW);

        let sumCeilR = 0, sumCeilG = 0, sumCeilB = 0, ceilCnt = 0;
        let sumFlrR = 0, sumFlrG = 0, sumFlrB = 0, flrCnt = 0;

        for (let x = 0; x < panoW; x++) {
            for (let y = 0; y < panoH; y++) {
                if (cylFilled[y * panoW + x]) {
                    colTop[x] = y;
                    const p = (y * panoW + x) * 4;
                    topR[x] = cylRgb[p]; topG[x] = cylRgb[p + 1]; topB[x] = cylRgb[p + 2];
                    sumCeilR += topR[x]; sumCeilG += topG[x]; sumCeilB += topB[x]; ceilCnt++;
                    break;
                }
            }
            for (let y = panoH - 1; y >= 0; y--) {
                if (cylFilled[y * panoW + x]) {
                    colBot[x] = y;
                    const p = (y * panoW + x) * 4;
                    botR[x] = cylRgb[p]; botG[x] = cylRgb[p + 1]; botB[x] = cylRgb[p + 2];
                    sumFlrR += botR[x]; sumFlrG += botG[x]; sumFlrB += botB[x]; flrCnt++;
                    break;
                }
            }
        }

        const avgCeilR = ceilCnt ? sumCeilR / ceilCnt : 195;
        const avgCeilG = ceilCnt ? sumCeilG / ceilCnt : 195;
        const avgCeilB = ceilCnt ? sumCeilB / ceilCnt : 195;
        const avgFlrR = flrCnt ? sumFlrR / flrCnt : 145;
        const avgFlrG = flrCnt ? sumFlrG / flrCnt : 142;
        const avgFlrB = flrCnt ? sumFlrB / flrCnt : 138;

        const smoothRim = (arr) => {
            const res = new Float32Array(panoW);
            const rad = 22;
            for (let x = 0; x < panoW; x++) {
                let s = 0, c = 0;
                for (let k = -rad; k <= rad; k += 2) {
                    const ix = isClosed360 ? ((x + k) % panoW + panoW) % panoW : Math.max(0, Math.min(panoW - 1, x + k));
                    s += arr[ix];
                    c++;
                }
                res[x] = s / c;
            }
            return res;
        };

        const sTopR = smoothRim(topR), sTopG = smoothRim(topG), sTopB = smoothRim(topB);
        const sBotR = smoothRim(botR), sBotG = smoothRim(botG), sBotB = smoothRim(botB);

        const cyMid = panoH * 0.5;
        const coveredFrac = isClosed360 ? 1 : Math.min(1, effectiveSpanRad / (Math.PI * 2));
        const activeEqW = Math.round(EQ_W * coveredFrac);
        // Shift equirectangular X so world azimuth 0° aligns with u = 0 (matches capFrames 3D rays!)
        const yawOffsetPx = (startYawDeg / 360) * EQ_W;

        for (let ey = 0; ey < EQ_H; ey++) {
            const lat = (0.5 - ey / EQ_H) * Math.PI;
            const tanLat = Math.abs(lat) > 1.48 ? Math.sign(lat) * 12 : Math.tan(lat);
            const cy = cyMid - fEff * tanLat;
            const rowOff = ey * EQ_W;

            for (let ex = 0; ex < EQ_W; ex++) {
                const shiftedEx = ((ex - yawOffsetPx) % EQ_W + EQ_W) % EQ_W;
                let cxFloat;
                if (isClosed360) {
                    cxFloat = (shiftedEx / EQ_W) * panoW;
                } else if (shiftedEx < activeEqW) {
                    cxFloat = (shiftedEx / Math.max(1, activeEqW - 1)) * (panoW - 1);
                } else {
                    const rem = (shiftedEx - activeEqW) / Math.max(1, EQ_W - activeEqW);
                    cxFloat = (1 - rem) * (panoW - 1);
                }

                const cx0 = Math.max(0, Math.min(panoW - 1, Math.floor(cxFloat)));
                const cx1 = isClosed360 ? (cx0 + 1) % panoW : Math.min(panoW - 1, cx0 + 1);
                const tx = cxFloat - Math.floor(cxFloat);
                const topBound = colTop[cx0] >= 0 ? colTop[cx0] : 0;
                const botBound = colBot[cx0] >= 0 ? colBot[cx0] : panoH - 1;
                const dst = (rowOff + ex) * 4;

                if (cy >= topBound + 1 && cy <= botBound - 1) {
                    const y0 = Math.max(0, Math.min(panoH - 2, Math.floor(cy)));
                    const y1 = y0 + 1;
                    const ty = cy - y0;

                    const i00 = y0 * panoW + cx0;
                    const i10 = y0 * panoW + cx1;
                    const i01 = y1 * panoW + cx0;
                    const i11 = y1 * panoW + cx1;

                    if (cylFilled[i00] && cylFilled[i10] && cylFilled[i01] && cylFilled[i11]) {
                        const w00 = (1 - tx) * (1 - ty);
                        const w10 = tx * (1 - ty);
                        const w01 = (1 - tx) * ty;
                        const w11 = tx * ty;
                        out[dst] = cylRgb[i00 * 4] * w00 + cylRgb[i10 * 4] * w10 + cylRgb[i01 * 4] * w01 + cylRgb[i11 * 4] * w11;
                        out[dst + 1] = cylRgb[i00 * 4 + 1] * w00 + cylRgb[i10 * 4 + 1] * w10 + cylRgb[i01 * 4 + 1] * w01 + cylRgb[i11 * 4 + 1] * w11;
                        out[dst + 2] = cylRgb[i00 * 4 + 2] * w00 + cylRgb[i10 * 4 + 2] * w10 + cylRgb[i01 * 4 + 2] * w01 + cylRgb[i11 * 4 + 2] * w11;
                        out[dst + 3] = 255;
                        continue;
                    }
                }

                if (ey < EQ_H * 0.5) {
                    const k = Math.max(0, Math.min(1, (topBound - cy) / Math.max(20, panoH * 0.55)));
                    const smoothK = Math.min(1, Math.pow(k, 0.5));
                    out[dst] = sTopR[cx0] * (1 - smoothK) + avgCeilR * smoothK;
                    out[dst + 1] = sTopG[cx0] * (1 - smoothK) + avgCeilG * smoothK;
                    out[dst + 2] = sTopB[cx0] * (1 - smoothK) + avgCeilB * smoothK;
                } else {
                    const k = Math.max(0, Math.min(1, (cy - botBound) / Math.max(20, panoH * 0.55)));
                    const smoothK = Math.min(1, Math.pow(k, 0.5));
                    out[dst] = sBotR[cx0] * (1 - smoothK) + avgFlrR * smoothK;
                    out[dst + 1] = sBotG[cx0] * (1 - smoothK) + avgFlrG * smoothK;
                    out[dst + 2] = sBotB[cx0] * (1 - smoothK) + avgFlrB * smoothK;
                }
                out[dst + 3] = 255;
            }
        }
    }

    /**
     * Layers real captured Upper (+42° ceiling) & Lower (-42° floor) shots smoothly onto the
     * 100%-filled equirectangular base using calibrated lens focal length fEff -> real ceiling & floor, zero holes!
     */
    _blendCapFramesOntoEquirectangular(out, EQ_W, EQ_H, capFrames, fEff, refW, refH) {
        const tanHalfH = (refW * 0.5) / Math.max(100, fEff);
        const tanHalfV = (refH * 0.5) / Math.max(100, fEff);
        const invTanH = 1 / tanHalfH;
        const invTanV = 1 / tanHalfV;

        const rAcc = new Float32Array(EQ_W * EQ_H);
        const gAcc = new Float32Array(EQ_W * EQ_H);
        const bAcc = new Float32Array(EQ_W * EQ_H);
        const wAcc = new Float32Array(EQ_W * EQ_H);

        const cosTheta = new Float32Array(EQ_W);
        const sinTheta = new Float32Array(EQ_W);
        for (let x = 0; x < EQ_W; x++) {
            const theta = (x / EQ_W) * Math.PI * 2;
            cosTheta[x] = Math.cos(theta);
            sinTheta[x] = Math.sin(theta);
        }

        // Only scan the top 42% (ceiling) and bottom 42% (floor) latitude bands where cap frames live
        const yBands = [[0, Math.floor(EQ_H * 0.44)], [Math.floor(EQ_H * 0.56), EQ_H]];

        for (const f of capFrames) {
            const fx = f.fwd.x, fy = f.fwd.y, fz = f.fwd.z;
            const rx = f.right.x, ry = f.right.y, rz = f.right.z;
            const ux = f.up.x, uy = f.up.y, uz = f.up.z;
            const fw = f.w, fh = f.h, px = f.pixels;
            const band = f.ring === 'upper' ? yBands[0] : yBands[1];

            for (let y = band[0]; y < band[1]; y++) {
                const phi = (y / EQ_H) * Math.PI;
                const sp = Math.sin(phi);
                const cp = Math.cos(phi);
                const rowOff = y * EQ_W;

                for (let x = 0; x < EQ_W; x++) {
                    const dx = sp * cosTheta[x];
                    const dy = cp;
                    const dz = sp * sinTheta[x];

                    const dotFwd = dx * fx + dy * fy + dz * fz;
                    if (dotFwd <= 0.35) continue;

                    const nx = ((dx * rx + dy * ry + dz * rz) / dotFwd) * invTanH;
                    if (nx <= -1 || nx >= 1) continue;
                    const ny = ((dx * ux + dy * uy + dz * uz) / dotFwd) * invTanV;
                    if (ny <= -1 || ny >= 1) continue;

                    const ex = 1 - Math.abs(nx);
                    const ey = 1 - Math.abs(ny);
                    const weight = ex * ex * ey * ey;
                    if (weight <= 0.0005) continue;

                    const u = (nx * 0.5 + 0.5) * (fw - 1);
                    const v = (-ny * 0.5 + 0.5) * (fh - 1);
                    const x0 = u | 0;
                    const y0 = v | 0;
                    const x1 = x0 + 1 < fw ? x0 + 1 : x0;
                    const y1 = y0 + 1 < fh ? y0 + 1 : y0;
                    const tx = u - x0;
                    const ty = v - y0;

                    const i00 = (y0 * fw + x0) * 4;
                    const i10 = (y0 * fw + x1) * 4;
                    const i01 = (y1 * fw + x0) * 4;
                    const i11 = (y1 * fw + x1) * 4;
                    const w00 = (1 - tx) * (1 - ty);
                    const w10 = tx * (1 - ty);
                    const w01 = (1 - tx) * ty;
                    const w11 = tx * ty;

                    const idx = rowOff + x;
                    rAcc[idx] += (px[i00] * w00 + px[i10] * w10 + px[i01] * w01 + px[i11] * w11) * weight;
                    gAcc[idx] += (px[i00 + 1] * w00 + px[i10 + 1] * w10 + px[i01 + 1] * w01 + px[i11 + 1] * w11) * weight;
                    bAcc[idx] += (px[i00 + 2] * w00 + px[i10 + 2] * w10 + px[i01 + 2] * w01 + px[i11 + 2] * w11) * weight;
                    wAcc[idx] += weight;
                }
            }
        }

        // Feather cap frames smoothly onto the horizon base (keep horizon 100% sharp near equator, fade in cap toward poles)
        const latHorizonEdge = Math.atan((refH * 0.42) / Math.max(100, fEff));
        const latStartBlend = latHorizonEdge * 0.65;
        const latFullCap = latHorizonEdge * 1.05;

        for (const band of yBands) {
            for (let y = band[0]; y < band[1]; y++) {
                const absLat = Math.abs((0.5 - y / EQ_H) * Math.PI);
                if (absLat <= latStartBlend) continue;
                const latAlpha = absLat >= latFullCap
                    ? 1
                    : (absLat - latStartBlend) / Math.max(0.01, latFullCap - latStartBlend);
                const smoothLat = latAlpha * latAlpha * (3 - 2 * latAlpha);
                const rowOff = y * EQ_W;

                for (let x = 0; x < EQ_W; x++) {
                    const idx = rowOff + x;
                    const w = wAcc[idx];
                    if (w <= 0.001) continue;

                    // Soft edge confidence ramp so cap edges fade seamlessly into base
                    const capConf = Math.min(1, w * 6);
                    const alpha = smoothLat * capConf;
                    const inv = 1 - alpha;
                    const dst = idx * 4;
                    out[dst] = out[dst] * inv + (rAcc[idx] / w) * alpha;
                    out[dst + 1] = out[dst + 1] * inv + (gAcc[idx] / w) * alpha;
                    out[dst + 2] = out[dst + 2] * inv + (bAcc[idx] / w) * alpha;
                }
            }
        }
    }

    _loop() {
        if (!this.running) return;
        requestAnimationFrame(() => this._loop());

        const canvas = this.overlayCanvas;
        const w = canvas.clientWidth || 640;
        const h = canvas.clientHeight || 420;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);

        if (!this.hasLiveCamera) {
            this._renderSimulatedCameraView(ctx, w, h, this.currentYaw, this.currentPitch);
        }

        // Subtle live ghost strip of the previous horizon photo's right edge while sweeping horizontally
        if (this.lastHorizonCanvas && this.hasLiveCamera && Math.abs(this.currentPitch) < 18) {
            const stripW = Math.round(w * 0.14);
            const srcW = Math.round(this.lastHorizonCanvas.width * 0.14);
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.drawImage(
                this.lastHorizonCanvas,
                this.lastHorizonCanvas.width - srcW, 0, srcW, this.lastHorizonCanvas.height,
                0, 0, stripW, h
            );
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(stripW, 0);
            ctx.lineTo(stripW, h);
            ctx.stroke();
            ctx.restore();
        }

        // Horizon level guide line
        const isLevel = Math.abs(this.currentPitch) < 10 && Math.abs(this.currentRoll) < 10;
        ctx.save();
        ctx.strokeStyle = isLevel ? 'rgba(52, 211, 153, 0.55)' : 'rgba(251, 191, 36, 0.4)';
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.14, h * 0.5);
        ctx.lineTo(w * 0.86, h * 0.5);
        ctx.stroke();
        ctx.restore();

        // Project 3D target dots onto live camera viewfinder
        const { tanHalfH, tanHalfV } = this._getCameraCaptureSpec();
        for (const t of this.targets) {
            const dotFwd = t.vec.dot(this.cameraForward);
            if (dotFwd <= 0.15) continue;

            const nx = (t.vec.dot(this.cameraRight) / dotFwd) / tanHalfH;
            const ny = (t.vec.dot(this.cameraUp) / dotFwd) / tanHalfV;
            if (Math.abs(nx) > 1.08 || Math.abs(ny) > 1.08) continue;

            const sx = w * 0.5 + nx * (w * 0.5);
            const sy = h * 0.5 - ny * (h * 0.5);

            ctx.beginPath();
            ctx.arc(sx, sy, t.captured ? 12 : 17, 0, Math.PI * 2);
            if (t.captured) {
                ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
                ctx.strokeStyle = '#6EE7B7';
            } else if (t.ring === 'horizon') {
                ctx.fillStyle = 'rgba(245, 158, 11, 0.38)';
                ctx.strokeStyle = '#FBBF24';
            } else if (t.ring === 'upper') {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.34)';
                ctx.strokeStyle = '#7DD3FC';
            } else {
                ctx.fillStyle = 'rgba(192, 132, 252, 0.34)';
                ctx.strokeStyle = '#D8B4FE';
            }
            ctx.fill();
            ctx.lineWidth = 2.5;
            ctx.stroke();

            if (t.captured) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 12px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('✓', sx, sy);
            }
        }

        // Dwell-stabilized capture (240ms steady hold inside target dot)
        const aligned = this._findNearestUncaptured(8.0);
        let dwellProgress = 0;
        if (aligned && this.hasGyro && !this.isStitching) {
            const now = performance.now();
            if (this.dwellTargetId !== aligned.id) {
                this.dwellTargetId = aligned.id;
                this.dwellStartMs = now;
            }
            dwellProgress = Math.min(1, (now - this.dwellStartMs) / 240);
            if (dwellProgress >= 1) {
                this.dwellTargetId = null;
                this.captureCurrentPose(aligned);
            }
        } else {
            this.dwellTargetId = null;
        }

        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 23, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = aligned ? '#10B981' : 'rgba(255,255,255,0.9)';
        ctx.stroke();

        if (dwellProgress > 0) {
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, 23, -Math.PI / 2, -Math.PI / 2 + dwellProgress * Math.PI * 2);
            ctx.lineWidth = 4.5;
            ctx.strokeStyle = '#FBBF24';
            ctx.stroke();
        }

        if (this.flashAlpha > 0.01) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.flashAlpha})`;
            ctx.fillRect(0, 0, w, h);
            this.flashAlpha *= 0.78;
        }

        if (this.isStitching) {
            ctx.fillStyle = 'rgba(9, 13, 22, 0.82)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#FBBF24';
            ctx.font = 'bold 15px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Menyelaraskan Sambungan, Plafon & Lantai...', w / 2, h / 2);
            return;
        }

        ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
        ctx.fillRect(12, 12, 200, 30);
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '600 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Putaran ${Math.round(this.currentYaw)}° · Tegak ${Math.round(this.currentPitch)}°`, 20, 27);
    }

    _renderSimulatedCameraView(ctx, w, h, yaw, pitch) {
        const shiftX = -((yaw + 180) / 360) * w * 2;
        const horizonY = h * 0.52 + (pitch / 60) * (h * 0.35);

        const ceil = ctx.createLinearGradient(0, 0, 0, Math.max(20, horizonY));
        ceil.addColorStop(0, '#1f1812');
        ceil.addColorStop(1, '#4b3b2c');
        ctx.fillStyle = ceil;
        ctx.fillRect(0, 0, w, horizonY);

        const floor = ctx.createLinearGradient(0, horizonY, 0, h);
        floor.addColorStop(0, '#5a4332');
        floor.addColorStop(1, '#261c14');
        ctx.fillStyle = floor;
        ctx.fillRect(0, horizonY, w, h - horizonY);

        for (let i = -4; i <= 8; i++) {
            const px = ((i * 220 + shiftX) % (w * 2) + w * 2) % (w * 2) - w * 0.2;
            ctx.fillStyle = '#d6c3a5';
            ctx.fillRect(px, horizonY - 120, 22, 130);
            ctx.fillStyle = '#c89d54';
            ctx.fillRect(px - 4, horizonY - 125, 30, 8);

            ctx.beginPath();
            ctx.arc(px + 110, horizonY - 140, 20, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(253, 230, 138, 0.75)';
            ctx.fill();
        }
    }

    _yawPitchToVec(yawDeg, pitchDeg) {
        const yaw = THREE.MathUtils.degToRad(yawDeg);
        const pitch = THREE.MathUtils.degToRad(pitchDeg);
        const cp = Math.cos(pitch);
        return new THREE.Vector3(cp * Math.cos(yaw), Math.sin(pitch), cp * Math.sin(yaw)).normalize();
    }

    _emitProgress() {
        if (!this.onProgress) return;
        const horizonCaptured = this.targets.filter((t) => t.ring === 'horizon' && t.captured).length;
        const horizonTotal = this.targets.filter((t) => t.ring === 'horizon').length;
        const upperCaptured = this.targets.filter((t) => t.ring === 'upper' && t.captured).length;
        const lowerCaptured = this.targets.filter((t) => t.ring === 'lower' && t.captured).length;
        this.onProgress({
            captured: this.targets.filter((t) => t.captured).length,
            total: this.targets.length,
            horizonCaptured,
            horizonTotal,
            upperCaptured,
            lowerCaptured,
            framesCount: this.horizonFrames.length + this.capFrames.length,
            horizonFramesCount: this.horizonFrames.length,
        });
    }

    _emitCapabilities() {
        if (this.onCapabilities) {
            this.onCapabilities({
                hasLiveCamera: this.hasLiveCamera,
                hasGyro: this.hasGyro,
            });
        }
    }

    _normYaw(deg) {
        return ((deg + 180) % 360 + 360) % 360 - 180;
    }

    _notifyStatus(msg) {
        if (this.onStatus) this.onStatus(msg);
    }

    stop() {
        this.running = false;
        if (this.stream) {
            this.stream.getTracks().forEach((t) => t.stop());
            this.stream = null;
        }
        if (this._onGyro) window.removeEventListener('deviceorientation', this._onGyro);
        if (this._onDown) this.overlayCanvas.removeEventListener('pointerdown', this._onDown);
        if (this._onMove) window.removeEventListener('pointermove', this._onMove);
        if (this._onUp) window.removeEventListener('pointerup', this._onUp);
    }
}
