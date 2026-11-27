<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use App\Services\QrCodeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class EventController extends Controller
{
    public function create(): View
    {
        $crewMembers = User::where('role', 'kru')->orderBy('name')->get();

        return view('admin.events.form', [
            'event' => new Event(['status' => 'persiapan']),
            'crewMembers' => $crewMembers,
            'assignedCrewIds' => [],
            'statuses' => Event::STATUSES,
            'isEdit' => false,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'venue_name' => ['required', 'string', 'max:255'],
            'organizer_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', Rule::in(array_keys(Event::STATUSES))],
            'public_slug' => ['nullable', 'string', 'max:120', 'alpha_dash', Rule::unique('events', 'public_slug')],
            'logo' => ['nullable', 'image', 'max:5120'],
            'bg_music' => ['nullable', 'file', 'mimes:mp3,wav,ogg,m4a', 'max:15360'],
            'crew_ids' => ['nullable', 'array'],
            'crew_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $slug = ! empty($validated['public_slug'])
            ? Str::lower($validated['public_slug'])
            : Event::generateUniqueSlug($validated['title']);

        $event = Event::create([
            'title' => $validated['title'],
            'event_date' => $validated['event_date'] ?? null,
            'venue_name' => $validated['venue_name'],
            'organizer_name' => $validated['organizer_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'public_slug' => $slug,
            'created_by' => $request->user()->id,
        ]);

        if ($request->hasFile('logo')) {
            $event->logo_path = $request->file('logo')->store("events/{$event->id}/logo", 'public');
        }

        if ($request->hasFile('bg_music')) {
            $event->bg_music_path = $request->file('bg_music')->store("events/{$event->id}/audio", 'public');
        }

        $event->save();
        $event->crew()->sync($validated['crew_ids'] ?? []);

        return redirect()
            ->route('admin.floorplan.edit', $event)
            ->with('success', 'Event berhasil dibuat. Silakan unggah atau gambar denah lokasi.');
    }

    public function edit(Event $event, QrCodeService $qrService): View
    {
        $crewMembers = User::where('role', 'kru')->orderBy('name')->get();

        return view('admin.events.form', [
            'event' => $event,
            'crewMembers' => $crewMembers,
            'assignedCrewIds' => $event->crew()->pluck('users.id')->all(),
            'statuses' => Event::STATUSES,
            'qrSvg' => $qrService->generateSvg($event->public_url),
            'isEdit' => true,
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'venue_name' => ['required', 'string', 'max:255'],
            'organizer_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', Rule::in(array_keys(Event::STATUSES))],
            'public_slug' => ['required', 'string', 'max:120', 'alpha_dash', Rule::unique('events', 'public_slug')->ignore($event->id)],
            'logo' => ['nullable', 'image', 'max:5120'],
            'bg_music' => ['nullable', 'file', 'mimes:mp3,wav,ogg,m4a', 'max:15360'],
            'remove_bg_music' => ['nullable', 'boolean'],
            'crew_ids' => ['nullable', 'array'],
            'crew_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $event->fill([
            'title' => $validated['title'],
            'event_date' => $validated['event_date'] ?? null,
            'venue_name' => $validated['venue_name'],
            'organizer_name' => $validated['organizer_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'public_slug' => Str::lower($validated['public_slug']),
        ]);

        if ($request->hasFile('logo')) {
            if ($event->logo_path) {
                Storage::disk('public')->delete($event->logo_path);
            }
            $event->logo_path = $request->file('logo')->store("events/{$event->id}/logo", 'public');
        }

        if ($request->boolean('remove_bg_music') && $event->bg_music_path) {
            Storage::disk('public')->delete($event->bg_music_path);
            $event->bg_music_path = null;
        }

        if ($request->hasFile('bg_music')) {
            if ($event->bg_music_path) {
                Storage::disk('public')->delete($event->bg_music_path);
            }
            $event->bg_music_path = $request->file('bg_music')->store("events/{$event->id}/audio", 'public');
        }

        $event->save();
        $event->crew()->sync($validated['crew_ids'] ?? []);

        return redirect()
            ->route('admin.events.edit', $event)
            ->with('success', 'Profil event berhasil diperbarui.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        Storage::disk('public')->deleteDirectory("events/{$event->id}");
        $event->delete();

        return redirect()
            ->route('admin.dashboard')
            ->with('success', 'Event beserta seluruh denah dan foto 360° telah dihapus.');
    }

    public function downloadQr(Event $event, Request $request, QrCodeService $qrService): Response
    {
        $format = strtolower((string) $request->query('format', 'svg'));
        $filename = "qr-{$event->public_slug}";

        if ($format === 'png') {
            $png = $qrService->generatePng($event->public_url);

            return response($png, 200, [
                'Content-Type' => 'image/png',
                'Content-Disposition' => "attachment; filename=\"{$filename}.png\"",
            ]);
        }

        $svg = $qrService->generateSvg($event->public_url);

        return response($svg, 200, [
            'Content-Type' => 'image/svg+xml',
            'Content-Disposition' => "attachment; filename=\"{$filename}.svg\"",
        ]);
    }
}
