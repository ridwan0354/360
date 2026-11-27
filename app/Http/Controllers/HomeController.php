<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function __invoke(): View
    {
        $events = Event::with(['floorplan', 'pins.photos'])
            ->whereIn('status', ['berlangsung', 'persiapan', 'selesai'])
            ->orderByRaw("CASE status WHEN 'berlangsung' THEN 1 WHEN 'persiapan' THEN 2 WHEN 'selesai' THEN 3 ELSE 4 END")
            ->latest('event_date')
            ->get();

        return view('home', [
            'events' => $events,
        ]);
    }
}
