<?php

namespace App\Http\Controllers\Kru;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FloorplanController extends Controller
{
    public function show(Request $request, Event $event): View
    {
        if (! $request->user()->canAccessEvent($event)) {
            abort(403, 'Anda tidak ditugaskan pada event ini.');
        }

        $event->load(['floorplan.pins.photos']);

        return view('kru.floorplan', [
            'event' => $event,
            'floorplan' => $event->floorplan,
            'pins' => $event->floorplan?->pins ?? collect(),
        ]);
    }
}
