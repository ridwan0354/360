<?php

namespace App\Http\Controllers\Kru;

use App\Http\Controllers\Controller;
use App\Models\LocationPin;
use App\Models\PanoramaPhoto;
use App\Services\OpenCvStitcherService;
use App\Services\PanoramaImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class CaptureController extends Controller
{
    public function show(Request $request, LocationPin $pin): View
    {
        $pin->load(['floorplan.event', 'photos']);
        $event = $pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            abort(403, 'Anda tidak ditugaskan pada event ini.');
        }

        $phase = in_array($request->query('phase'), ['sebelum', 'sesudah'], true)
            ? (string) $request->query('phase')
            : 'sebelum';

        return view('kru.capture', [
            'event' => $event,
            'floorplan' => $pin->floorplan,
            'pin' => $pin,
            'initialPhase' => $phase,
            'sebelumPhotos' => $pin->photos->where('phase', 'sebelum')->values(),
            'sesudahPhotos' => $pin->photos->where('phase', 'sesudah')->values(),
        ]);
    }

    public function storePhoto(Request $request, LocationPin $pin, PanoramaImageService $imageService): JsonResponse|RedirectResponse
    {
        $pin->load('floorplan.event');
        $event = $pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            abort(403, 'Anda tidak ditugaskan pada event ini.');
        }

        $validated = $request->validate([
            'phase' => ['required', Rule::in(['sebelum', 'sesudah'])],
            'angle_label' => ['nullable', 'string', 'max:100'],
            'initial_yaw' => ['nullable', 'numeric', 'min:-180', 'max:180'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:25600'],
            'panorama_data_url' => ['nullable', 'string'],
            'preview_token' => ['nullable', 'uuid'],
        ]);

        try {
            if (! empty($validated['preview_token'])) {
                $tempPath = "stitch_previews/{$validated['preview_token']}.webp";
                if (! Storage::disk('public')->exists($tempPath)) {
                    return response()->json(['message' => 'Pratinjau sudah kedaluwarsa, silakan jahit ulang.'], 422);
                }
                $bytes = (string) Storage::disk('public')->get($tempPath);
                $stored = $imageService->processAndSaveBytes($event->id, $bytes);
                Storage::disk('public')->delete($tempPath);
            } else {
                $stored = $imageService->storeFromUploadOrDataUrl(
                    $event->id,
                    $request->file('photo'),
                    $validated['panorama_data_url'] ?? null
                );
            }
        } catch (\Throwable $e) {
            if ($request->expectsJson()) {
                return response()->json(['message' => $e->getMessage()], 422);
            }

            return back()->withErrors(['photo' => 'Gagal memproses foto: '.$e->getMessage()]);
        }

        $existingCount = $pin->photos()->where('phase', $validated['phase'])->count();
        $photo = PanoramaPhoto::create([
            'pin_id' => $pin->id,
            'phase' => $validated['phase'],
            'angle_label' => $validated['angle_label'] ?: ('Sudut '.($existingCount + 1)),
            'image_path' => $stored['image_path'],
            'thumb_path' => $stored['thumb_path'],
            'initial_yaw' => (float) ($validated['initial_yaw'] ?? 0),
            'file_size' => $stored['file_size'],
            'created_by' => $request->user()->id,
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Foto panorama 360° berhasil disimpan ke titik pin.',
                'photo' => [
                    'id' => $photo->id,
                    'phase' => $photo->phase,
                    'angle_label' => $photo->angle_label,
                    'image_url' => $photo->image_url,
                    'thumb_url' => $photo->thumb_url,
                ],
                'redirect_url' => route('kru.pins.capture', ['pin' => $pin->id, 'phase' => $photo->phase]),
            ], 201);
        }

        return redirect()
            ->route('kru.pins.capture', ['pin' => $pin->id, 'phase' => $photo->phase])
            ->with('success', 'Foto panorama 360° berhasil disimpan ke titik pin.');
    }

    public function destroyPhoto(Request $request, PanoramaPhoto $photo, PanoramaImageService $imageService): JsonResponse|RedirectResponse
    {
        $photo->load('pin.floorplan.event');
        $event = $photo->pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            abort(403);
        }

        $imageService->deletePhotoFiles($photo->image_path, $photo->thumb_path);
        $phase = $photo->phase;
        $pinId = $photo->pin_id;
        $photo->delete();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Foto dihapus.']);
        }

        return redirect()
            ->route('kru.pins.capture', ['pin' => $pinId, 'phase' => $phase])
            ->with('success', 'Foto berhasil dihapus.');
    }

    public function stitchFrames(Request $request, LocationPin $pin, OpenCvStitcherService $stitcher): JsonResponse
    {
        $pin->load('floorplan.event');
        $event = $pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            abort(403, 'Anda tidak ditugaskan pada event ini.');
        }

        $validated = $request->validate([
            'poses_json' => ['nullable', 'string'],
            'frames' => ['required', 'array', 'min:2', 'max:36'],
            'frames.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
        ]);

        $result = $stitcher->stitchUploadedFrames($request->file('frames'), $validated['poses_json'] ?? null);
        $token = (string) Str::uuid();
        $tempPath = "stitch_previews/{$token}.webp";
        Storage::disk('public')->put($tempPath, $result['bytes']);

        return response()->json([
            'message' => 'Panorama 360° berhasil dijahit di server menggunakan OpenCV 3D.',
            'preview_token' => $token,
            'preview_url' => Storage::disk('public')->url($tempPath),
            'stitch_meta' => $result['meta'],
        ]);
    }
}
