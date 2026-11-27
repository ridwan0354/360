<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\LocationPin;
use App\Models\NavigationLink;
use App\Models\PanoramaPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PublicTourController extends Controller
{
    public function show(Request $request, string $slug): View
    {
        $event = $this->loadTourEvent($slug);
        $tourPayload = $this->buildTourPayload($event);

        $initialPinId = $request->query('pin')
            ? (int) $request->query('pin')
            : ($tourPayload['pins'][0]['id'] ?? null);

        $initialMode = $request->query('pin') ? 'vr' : 'overview';

        return view('tour.show', [
            'event' => $event,
            'tourPayload' => $tourPayload,
            'initialPinId' => $initialPinId,
            'initialMode' => $initialMode,
        ]);
    }

    public function data(string $slug): JsonResponse
    {
        $event = $this->loadTourEvent($slug);

        return response()->json($this->buildTourPayload($event));
    }

    private function loadTourEvent(string $slug): Event
    {
        return Event::with([
            'floorplan.pins.photos.navigationLinks.toPin',
        ])->where('public_slug', $slug)->firstOrFail();
    }

    private function buildTourPayload(Event $event): array
    {
        $floorplan = $event->floorplan;
        $pins = $floorplan ? $floorplan->pins : collect();

        return [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'event_date' => $event->event_date?->translatedFormat('d F Y'),
                'venue_name' => $event->venue_name,
                'organizer_name' => $event->organizer_name,
                'description' => $event->description,
                'logo_url' => $event->logo_url,
                'bg_music_url' => $event->bg_music_url,
                'public_slug' => $event->public_slug,
                'status' => $event->status,
            ],
            'floorplan' => $floorplan ? [
                'id' => $floorplan->id,
                'source_type' => $floorplan->source_type,
                'image_url' => $floorplan->image_url,
                'width' => $floorplan->width,
                'height' => $floorplan->height,
            ] : null,
            'pins' => $pins->map(function (LocationPin $pin): array {
                $mapPhoto = fn (PanoramaPhoto $photo): array => [
                    'id' => $photo->id,
                    'phase' => $photo->phase,
                    'angle_label' => $photo->angle_label ?: 'Tampak Utama',
                    'image_url' => $photo->image_url,
                    'thumb_url' => $photo->thumb_url,
                    'initial_yaw' => $photo->initial_yaw,
                    'links' => $photo->navigationLinks->map(fn (NavigationLink $link): array => [
                        'id' => $link->id,
                        'to_pin_id' => $link->to_pin_id,
                        'to_pin_number' => $link->toPin?->pin_number,
                        'to_pin_title' => $link->toPin?->title,
                        'yaw' => $link->yaw,
                        'pitch' => $link->pitch,
                        'label' => $link->label ?: ('Ke '.($link->toPin?->title ?? 'Area Berikutnya')),
                    ])->values()->all(),
                ];

                return [
                    'id' => $pin->id,
                    'pin_number' => $pin->pin_number,
                    'title' => $pin->title,
                    'dimensions_note' => $pin->dimensions_note,
                    'description' => $pin->description,
                    'pos_x' => $pin->pos_x,
                    'pos_y' => $pin->pos_y,
                    'sebelum' => $pin->photos->where('phase', 'sebelum')->values()->map($mapPhoto)->all(),
                    'sesudah' => $pin->photos->where('phase', 'sesudah')->values()->map($mapPhoto)->all(),
                ];
            })->values()->all(),
        ];
    }
}
