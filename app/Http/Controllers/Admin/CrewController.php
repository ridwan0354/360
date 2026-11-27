<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class CrewController extends Controller
{
    public function index(): View
    {
        $crewMembers = User::where('role', 'kru')
            ->with(['assignedEvents', 'panoramaPhotos'])
            ->orderBy('name')
            ->get();

        $events = Event::orderBy('title')->get();

        return view('admin.crew.index', [
            'crewMembers' => $crewMembers,
            'events' => $events,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'event_ids' => ['nullable', 'array'],
            'event_ids.*' => ['integer', 'exists:events,id'],
        ]);

        $crew = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'kru',
            'is_active' => true,
        ]);

        if (! empty($validated['event_ids'])) {
            $crew->assignedEvents()->sync($validated['event_ids']);
        }

        return redirect()
            ->route('admin.crew.index')
            ->with('success', "Akun kru {$crew->name} berhasil ditambahkan.");
    }

    public function toggle(User $user): RedirectResponse
    {
        if ($user->isAdmin()) {
            return back()->withErrors(['crew' => 'Akun Admin Utama tidak dapat dinonaktifkan.']);
        }

        $user->update(['is_active' => ! $user->is_active]);
        $stateText = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Status akun {$user->name} berhasil {$stateText}.");
    }

    public function syncAssignments(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'event_ids' => ['nullable', 'array'],
            'event_ids.*' => ['integer', 'exists:events,id'],
        ]);

        $user->assignedEvents()->sync($validated['event_ids'] ?? []);

        return back()->with('success', "Penugasan event untuk {$user->name} berhasil diperbarui.");
    }
}
