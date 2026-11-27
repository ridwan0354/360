<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Floorplan;
use App\Models\LocationPin;
use App\Models\NavigationLink;
use App\Models\PanoramaPhoto;
use App\Services\PanoramaImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class FloorplanController extends Controller
{
    public function edit(Event $event): View
    {
        $event->load(['floorplan.pins.photos.navigationLinks.toPin']);
        $floorplan = $event->floorplan;

        $pinsPayload = $floorplan
            ? $floorplan->pins->map(fn (LocationPin $pin) => $this->serializePin($pin))->values()
            : collect();

        return view('admin.floorplan.edit', [
            'event' => $event,
            'floorplan' => $floorplan,
            'pinsPayload' => $pinsPayload,
        ]);
    }

    public function uploadFloorplan(Request $request, Event $event, PanoramaImageService $imageService): RedirectResponse
    {
        $request->validate([
            'floorplan_image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
        ]);

        $bytes = file_get_contents($request->file('floorplan_image')->getRealPath());
        $stored = $imageService->storeFloorplanImage($event->id, (string) $bytes);

        $floorplan = $event->floorplan;
        if ($floorplan) {
            if ($floorplan->image_path) {
                Storage::disk('public')->delete($floorplan->image_path);
            }
            $floorplan->update([
                'source_type' => 'upload',
                'image_path' => $stored['image_path'],
                'width' => $stored['width'],
                'height' => $stored['height'],
            ]);
        } else {
            Floorplan::create([
                'event_id' => $event->id,
                'source_type' => 'upload',
                'image_path' => $stored['image_path'],
                'width' => $stored['width'],
                'height' => $stored['height'],
            ]);
        }

        return redirect()
            ->route('admin.floorplan.edit', $event)
            ->with('success', 'Gambar denah berhasil diunggah. Ketuk area di denah untuk menempatkan titik pin.');
    }

    public function saveBuilderFloorplan(Request $request, Event $event, PanoramaImageService $imageService): JsonResponse
    {
        $validated = $request->validate([
            'canvas_json' => ['required', 'string'],
            'snapshot_data_url' => ['required', 'string'],
        ]);

        $parts = explode(',', $validated['snapshot_data_url'], 2);
        if (count($parts) !== 2) {
            return response()->json(['message' => 'Format gambar kanvas tidak valid.'], 422);
        }

        $rawBytes = base64_decode($parts[1], true);
        if ($rawBytes === false) {
            return response()->json(['message' => 'Gagal memproses hasil render kanvas.'], 422);
        }

        $stored = $imageService->storeFloorplanImage($event->id, $rawBytes);

        $floorplan = $event->floorplan;
        if ($floorplan) {
            if ($floorplan->image_path) {
                Storage::disk('public')->delete($floorplan->image_path);
            }
            $floorplan->update([
                'source_type' => 'builder',
                'image_path' => $stored['image_path'],
                'canvas_json' => $validated['canvas_json'],
                'width' => $stored['width'],
                'height' => $stored['height'],
            ]);
        } else {
            $floorplan = Floorplan::create([
                'event_id' => $event->id,
                'source_type' => 'builder',
                'image_path' => $stored['image_path'],
                'canvas_json' => $validated['canvas_json'],
                'width' => $stored['width'],
                'height' => $stored['height'],
            ]);
        }

        return response()->json([
            'message' => 'Denah dari Kanvas Editor berhasil disimpan.',
            'image_url' => $floorplan->image_url,
            'source_type' => $floorplan->source_type,
        ]);
    }

    public function storePin(Request $request, Event $event): JsonResponse|RedirectResponse
    {
        $floorplan = $event->floorplan;
        if (! $floorplan) {
            return response()->json(['message' => 'Silakan unggah atau buat denah terlebih dahulu sebelum menambah pin.'], 422);
        }

        $validated = $request->validate([
            'pin_number' => ['nullable', 'integer', 'min:1', 'max:999'],
            'title' => ['required', 'string', 'max:150'],
            'dimensions_note' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1500'],
            'pos_x' => ['required', 'numeric', 'min:0', 'max:100'],
            'pos_y' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $nextNumber = $validated['pin_number'] ?? (($floorplan->pins()->max('pin_number') ?? 0) + 1);

        $pin = LocationPin::create([
            'floorplan_id' => $floorplan->id,
            'pin_number' => $nextNumber,
            'title' => $validated['title'],
            'dimensions_note' => $validated['dimensions_note'] ?? null,
            'description' => $validated['description'] ?? null,
            'pos_x' => round((float) $validated['pos_x'], 2),
            'pos_y' => round((float) $validated['pos_y'], 2),
        ]);

        $pin->load('photos.navigationLinks.toPin');

        if ($request->expectsJson()) {
            return response()->json([
                'message' => "Pin #{$pin->pin_number} ({$pin->title}) berhasil ditambahkan.",
                'pin' => $this->serializePin($pin),
            ], 201);
        }

        return back()->with('success', "Pin #{$pin->pin_number} berhasil ditambahkan.");
    }

    public function updatePin(Request $request, LocationPin $pin): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'pin_number' => ['sometimes', 'integer', 'min:1', 'max:999'],
            'title' => ['sometimes', 'required', 'string', 'max:150'],
            'dimensions_note' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1500'],
            'pos_x' => ['sometimes', 'numeric', 'min:0', 'max:100'],
            'pos_y' => ['sometimes', 'numeric', 'min:0', 'max:100'],
        ]);

        if (isset($validated['pos_x'])) {
            $validated['pos_x'] = round((float) $validated['pos_x'], 2);
        }
        if (isset($validated['pos_y'])) {
            $validated['pos_y'] = round((float) $validated['pos_y'], 2);
        }

        $pin->update($validated);
        $pin->load('photos.navigationLinks.toPin');

        if ($request->expectsJson()) {
            return response()->json([
                'message' => "Pin #{$pin->pin_number} diperbarui.",
                'pin' => $this->serializePin($pin),
            ]);
        }

        return back()->with('success', "Pin #{$pin->pin_number} berhasil diperbarui.");
    }

    public function destroyPin(Request $request, LocationPin $pin, PanoramaImageService $imageService): JsonResponse|RedirectResponse
    {
        $floorplan = $pin->floorplan;

        foreach ($pin->photos as $photo) {
            $imageService->deletePhotoFiles($photo->image_path, $photo->thumb_path);
        }
        $pin->delete();

        $pinsPayload = collect();
        if ($floorplan) {
            $this->resequenceFloorplanPins($floorplan);
            $floorplan->load('pins.photos.navigationLinks.toPin');
            $pinsPayload = $floorplan->pins->map(fn (LocationPin $p) => $this->serializePin($p))->values();
        }

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Titik pin berhasil dihapus & nomor pin dirapikan otomatis.',
                'pins' => $pinsPayload,
            ]);
        }

        return back()->with('success', 'Titik pin berhasil dihapus & nomor pin dirapikan otomatis.');
    }

    private function resequenceFloorplanPins(Floorplan $floorplan): void
    {
        DB::transaction(function () use ($floorplan): void {
            $remaining = $floorplan->pins()
                ->orderBy('pin_number')
                ->orderBy('id')
                ->get();

            foreach ($remaining as $index => $item) {
                $expectedNumber = $index + 1;
                if ((int) $item->pin_number !== $expectedNumber) {
                    $item->update(['pin_number' => $expectedNumber]);
                }
            }
        });
    }

    public function storePhoto(Request $request, LocationPin $pin, PanoramaImageService $imageService): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'phase' => ['required', Rule::in(['sebelum', 'sesudah'])],
            'angle_label' => ['nullable', 'string', 'max:100'],
            'initial_yaw' => ['nullable', 'numeric', 'min:-180', 'max:180'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
            'panorama_data_url' => ['nullable', 'string'],
        ]);

        $event = $pin->floorplan->event;
        $stored = $imageService->storeFromUploadOrDataUrl(
            $event->id,
            $request->file('photo'),
            $validated['panorama_data_url'] ?? null
        );

        $photo = PanoramaPhoto::create([
            'pin_id' => $pin->id,
            'phase' => $validated['phase'],
            'angle_label' => $validated['angle_label'] ?: ('Sudut '.($pin->photos()->where('phase', $validated['phase'])->count() + 1)),
            'image_path' => $stored['image_path'],
            'thumb_path' => $stored['thumb_path'],
            'initial_yaw' => (float) ($validated['initial_yaw'] ?? 0),
            'file_size' => $stored['file_size'],
            'created_by' => $request->user()->id,
        ]);

        $photo->load('navigationLinks.toPin');

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Foto panorama 360° berhasil disimpan.',
                'photo' => $this->serializePhoto($photo),
            ], 201);
        }

        return back()->with('success', 'Foto panorama 360° berhasil diunggah.');
    }

    public function destroyPhoto(Request $request, PanoramaPhoto $photo, PanoramaImageService $imageService): JsonResponse|RedirectResponse
    {
        $imageService->deletePhotoFiles($photo->image_path, $photo->thumb_path);
        $photo->delete();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Foto panorama berhasil dihapus.']);
        }

        return back()->with('success', 'Foto panorama berhasil dihapus.');
    }

    public function storeNavigationLink(Request $request, PanoramaPhoto $photo): JsonResponse
    {
        $validated = $request->validate([
            'to_pin_id' => ['required', 'integer', 'exists:location_pins,id'],
            'yaw' => ['required', 'numeric', 'min:-180', 'max:180'],
            'pitch' => ['required', 'numeric', 'min:-90', 'max:90'],
            'label' => ['nullable', 'string', 'max:120'],
        ]);

        $targetPin = LocationPin::findOrFail($validated['to_pin_id']);
        $link = NavigationLink::create([
            'from_photo_id' => $photo->id,
            'to_pin_id' => $targetPin->id,
            'yaw' => round((float) $validated['yaw'], 2),
            'pitch' => round((float) $validated['pitch'], 2),
            'label' => $validated['label'] ?: "Menuju {$targetPin->title}",
        ]);

        $link->load('toPin');

        return response()->json([
            'message' => 'Panah navigasi berhasil ditambahkan.',
            'link' => [
                'id' => $link->id,
                'to_pin_id' => $link->to_pin_id,
                'to_pin_number' => $link->toPin->pin_number,
                'to_pin_title' => $link->toPin->title,
                'yaw' => $link->yaw,
                'pitch' => $link->pitch,
                'label' => $link->label,
            ],
        ], 201);
    }

    public function destroyNavigationLink(NavigationLink $link): JsonResponse
    {
        $link->delete();

        return response()->json(['message' => 'Panah navigasi dihapus.']);
    }

    private function serializePin(LocationPin $pin): array
    {
        return [
            'id' => $pin->id,
            'pin_number' => $pin->pin_number,
            'title' => $pin->title,
            'dimensions_note' => $pin->dimensions_note,
            'description' => $pin->description,
            'pos_x' => $pin->pos_x,
            'pos_y' => $pin->pos_y,
            'photos' => $pin->photos->map(fn (PanoramaPhoto $photo) => $this->serializePhoto($photo))->values(),
        ];
    }

    private function serializePhoto(PanoramaPhoto $photo): array
    {
        return [
            'id' => $photo->id,
            'pin_id' => $photo->pin_id,
            'phase' => $photo->phase,
            'angle_label' => $photo->angle_label,
            'image_url' => $photo->image_url,
            'thumb_url' => $photo->thumb_url,
            'initial_yaw' => $photo->initial_yaw,
            'links' => $photo->navigationLinks->map(fn (NavigationLink $link) => [
                'id' => $link->id,
                'to_pin_id' => $link->to_pin_id,
                'to_pin_number' => $link->toPin?->pin_number,
                'to_pin_title' => $link->toPin?->title,
                'yaw' => $link->yaw,
                'pitch' => $link->pitch,
                'label' => $link->label,
            ])->values(),
        ];
    }
}
