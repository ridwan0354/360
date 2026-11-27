<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use App\Services\QrCodeService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(Request $request, QrCodeService $qrService): View
    {
        $search = trim((string) $request->query('q', ''));
        $status = (string) $request->query('status', 'all');
        $viewMode = in_array($request->query('view'), ['cards', 'table'], true)
            ? (string) $request->query('view')
            : 'cards';

        $query = Event::with(['floorplan', 'crew'])
            ->latest('created_at');

        if ($search !== '') {
            $query->where(function ($q) use ($search): void {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('venue_name', 'like', "%{$search}%")
                    ->orWhere('organizer_name', 'like', "%{$search}%");
            });
        }

        if ($status !== 'all' && array_key_exists($status, Event::STATUSES)) {
            $query->where('status', $status);
        }

        $events = $query->get();

        $qrPreviews = [];
        foreach ($events as $event) {
            $qrPreviews[$event->id] = $qrService->generateSvg($event->public_url);
        }

        $allEvents = Event::with(['floorplan.pins.photos'])->get();
        $totalEvents = $allEvents->count();
        $activeEvents = $allEvents->whereIn('status', ['persiapan', 'berlangsung'])->count();
        $totalPins = $allEvents->sum(fn (Event $e) => $e->completion_stats['total_pins']);
        $totalPhotos = $allEvents->sum(fn (Event $e) => $e->completion_stats['total_photos']);
        $activeCrewCount = User::where('role', 'kru')->where('is_active', true)->count();

        return view('admin.dashboard', [
            'events' => $events,
            'qrPreviews' => $qrPreviews,
            'search' => $search,
            'status' => $status,
            'viewMode' => $viewMode,
            'statuses' => Event::STATUSES,
            'metrics' => [
                'total_events' => $totalEvents,
                'active_events' => $activeEvents,
                'total_pins' => $totalPins,
                'total_photos' => $totalPhotos,
                'active_crew' => $activeCrewCount,
            ],
        ]);
    }
}
