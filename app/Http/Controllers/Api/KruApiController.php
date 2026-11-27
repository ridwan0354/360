<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\LocationPin;
use App\Models\PanoramaPhoto;
use App\Models\User;
use App\Services\OpenCvStitcherService;
use App\Services\PanoramaImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class KruApiController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:100'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Email atau kata sandi tidak sesuai.'], 401);
        }

        if (! $user->is_active) {
            return response()->json(['message' => 'Akun Anda sedang dinonaktifkan oleh Admin Utama.'], 403);
        }

        $token = $user->createToken($validated['device_name'] ?? 'ruang360-kru-mobile')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $u = $request->user();

        return response()->json([
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'role' => $u->role,
            'is_active' => $u->is_active,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Berhasil keluar.']);
    }

    public function events(Request $request): JsonResponse
    {
        $user = $request->user();
        $events = ($user->isAdmin()
            ? Event::with(['floorplan.pins.photos'])
            : $user->assignedEvents()->with(['floorplan.pins.photos'])
        )->latest('event_date')->get();

        $baseUrl = $request->getSchemeAndHttpHost();

        return response()->json([
            'events' => $events->map(function (Event $event) use ($baseUrl): array {
                $stats = $event->completion_stats;

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'venue_name' => $event->venue_name,
                    'organizer_name' => $event->organizer_name,
                    'event_date' => $event->event_date?->format('Y-m-d'),
                    'status' => $event->status,
                    'public_slug' => $event->public_slug,
                    'public_url' => "{$baseUrl}/tour/{$event->public_slug}",
                    'floorplan_url' => $event->floorplan?->image_url ? "{$baseUrl}{$event->floorplan->image_url}" : null,
                    'stats' => $stats,
                ];
            })->values(),
        ]);
    }

    public function showEvent(Request $request, Event $event): JsonResponse
    {
        if (! $request->user()->canAccessEvent($event)) {
            return response()->json(['message' => 'Anda tidak ditugaskan pada event ini.'], 403);
        }

        $event->load(['floorplan.pins.photos']);
        $baseUrl = $request->getSchemeAndHttpHost();

        return response()->json([
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'venue_name' => $event->venue_name,
                'organizer_name' => $event->organizer_name,
                'public_slug' => $event->public_slug,
                'public_url' => "{$baseUrl}/tour/{$event->public_slug}",
                'floorplan_url' => $event->floorplan?->image_url ? "{$baseUrl}{$event->floorplan->image_url}" : null,
            ],
            'pins' => ($event->floorplan?->pins ?? collect())->map(function (LocationPin $pin) use ($baseUrl): array {
                $mapPhoto = fn (PanoramaPhoto $p) => [
                    'id' => $p->id,
                    'phase' => $p->phase,
                    'angle_label' => $p->angle_label ?: 'Tampak Utama',
                    'image_url' => "{$baseUrl}{$p->image_url}",
                    'thumb_url' => "{$baseUrl}{$p->thumb_url}",
                ];

                return [
                    'id' => $pin->id,
                    'pin_number' => $pin->pin_number,
                    'title' => $pin->title,
                    'dimensions_note' => $pin->dimensions_note,
                    'description' => $pin->description,
                    'pos_x' => $pin->pos_x,
                    'pos_y' => $pin->pos_y,
                    'sebelum_count' => $pin->photos->where('phase', 'sebelum')->count(),
                    'sesudah_count' => $pin->photos->where('phase', 'sesudah')->count(),
                    'sebelum' => $pin->photos->where('phase', 'sebelum')->values()->map($mapPhoto)->all(),
                    'sesudah' => $pin->photos->where('phase', 'sesudah')->values()->map($mapPhoto)->all(),
                ];
            })->values(),
        ]);
    }

    public function stitchPinFrames(
        Request $request,
        LocationPin $pin,
        OpenCvStitcherService $stitcher,
        PanoramaImageService $imageService
    ): JsonResponse {
        $pin->load('floorplan.event');
        $event = $pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            return response()->json(['message' => 'Anda tidak ditugaskan pada event ini.'], 403);
        }

        $validated = $request->validate([
            'phase' => ['required', Rule::in(['sebelum', 'sesudah'])],
            'angle_label' => ['nullable', 'string', 'max:100'],
            'poses_json' => ['nullable', 'string'],
            'preview_only' => ['nullable', 'boolean'],
            'frames' => ['required', 'array', 'min:2', 'max:36'],
            'frames.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
        ]);

        $result = $stitcher->stitchUploadedFrames($request->file('frames'), $validated['poses_json'] ?? null);
        $baseUrl = $request->getSchemeAndHttpHost();

        if ($request->boolean('preview_only')) {
            $token = (string) Str::uuid();
            $tempPath = "stitch_previews/{$token}.webp";
            Storage::disk('public')->put($tempPath, $result['bytes']);

            return response()->json([
                'message' => 'Berhasil dijahit dengan OpenCV 3D.',
                'preview_token' => $token,
                'preview_url' => "{$baseUrl}/storage/{$tempPath}",
                'stitch_meta' => $result['meta'],
            ]);
        }

        $stored = $imageService->processAndSaveBytes($event->id, $result['bytes']);
        $existingCount = $pin->photos()->where('phase', $validated['phase'])->count();

        $photo = PanoramaPhoto::create([
            'pin_id' => $pin->id,
            'phase' => $validated['phase'],
            'angle_label' => $validated['angle_label'] ?: ('OpenCV 360° #'.($existingCount + 1)),
            'image_path' => $stored['image_path'],
            'thumb_path' => $stored['thumb_path'],
            'initial_yaw' => 0,
            'file_size' => $stored['file_size'],
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Panorama 360° berhasil dijahit OpenCV 3D & disimpan ke pin.',
            'stitch_meta' => $result['meta'],
            'photo' => [
                'id' => $photo->id,
                'phase' => $photo->phase,
                'angle_label' => $photo->angle_label,
                'image_url' => "{$baseUrl}{$photo->image_url}",
                'thumb_url' => "{$baseUrl}{$photo->thumb_url}",
            ],
        ], 201);
    }

    public function storePinPhoto(
        Request $request,
        LocationPin $pin,
        PanoramaImageService $imageService
    ): JsonResponse {
        $pin->load('floorplan.event');
        $event = $pin->floorplan->event;

        if (! $request->user()->canAccessEvent($event)) {
            return response()->json(['message' => 'Anda tidak ditugaskan pada event ini.'], 403);
        }

        $validated = $request->validate([
            'phase' => ['required', Rule::in(['sebelum', 'sesudah'])],
            'angle_label' => ['nullable', 'string', 'max:100'],
            'preview_token' => ['nullable', 'uuid'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
        ]);

        if (! empty($validated['preview_token'])) {
            $tempPath = "stitch_previews/{$validated['preview_token']}.webp";
            if (! Storage::disk('public')->exists($tempPath)) {
                return response()->json(['message' => 'Pratinjau sudah kedaluwarsa, silakan jahit ulang.'], 422);
            }
            $bytes = (string) Storage::disk('public')->get($tempPath);
            $stored = $imageService->processAndSaveBytes($event->id, $bytes);
            Storage::disk('public')->delete($tempPath);
        } else {
            $stored = $imageService->storeFromUploadOrDataUrl($event->id, $request->file('photo'));
        }

        $existingCount = $pin->photos()->where('phase', $validated['phase'])->count();
        $photo = PanoramaPhoto::create([
            'pin_id' => $pin->id,
            'phase' => $validated['phase'],
            'angle_label' => $validated['angle_label'] ?: ('Sudut '.($existingCount + 1)),
            'image_path' => $stored['image_path'],
            'thumb_path' => $stored['thumb_path'],
            'initial_yaw' => 0,
            'file_size' => $stored['file_size'],
            'created_by' => $request->user()->id,
        ]);

        $baseUrl = $request->getSchemeAndHttpHost();

        return response()->json([
            'message' => 'Foto panorama 360° berhasil disimpan.',
            'photo' => [
                'id' => $photo->id,
                'phase' => $photo->phase,
                'angle_label' => $photo->angle_label,
                'image_url' => "{$baseUrl}{$photo->image_url}",
                'thumb_url' => "{$baseUrl}{$photo->thumb_url}",
            ],
        ], 201);
    }

    public function destroyPhoto(Request $request, PanoramaPhoto $photo, PanoramaImageService $imageService): JsonResponse
    {
        $photo->load('pin.floorplan.event');
        if (! $request->user()->canAccessEvent($photo->pin->floorplan->event)) {
            return response()->json(['message' => 'Tidak diizinkan.'], 403);
        }

        $imageService->deletePhotoFiles($photo->image_path, $photo->thumb_path);
        $photo->delete();

        return response()->json(['message' => 'Foto dihapus.']);
    }
}
