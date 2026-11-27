<?php

namespace App\Http\Controllers\Kru;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(Request $request): View
    {
        $user = $request->user();

        $eventsQuery = $user->isAdmin()
            ? Event::with(['floorplan.pins.photos'])
            : $user->assignedEvents()->with(['floorplan.pins.photos']);

        $events = $eventsQuery->latest('event_date')->get();

        return view('kru.dashboard', [
            'events' => $events,
            'statuses' => Event::STATUSES,
        ]);
    }
}
