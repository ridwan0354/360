@extends('layouts.app')

@section('title', 'Manajemen Kru Lapangan — Ruang360°')

@section('content')
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <div>
        <a href="{{ route('admin.dashboard') }}" class="text-xs font-semibold text-slate-500 hover:text-slate-900">← Kembali ke Dasbor</a>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">Manajemen Akun Kru Lapangan</h1>
        <p class="text-sm text-slate-600 mt-0.5">Buat akun kru, aktifkan/nonaktifkan akses, dan tentukan event yang ditugaskan kepada masing-masing kru.</p>
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
        <form method="POST" action="{{ route('admin.crew.store') }}" class="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm h-fit">
            @csrf
            <h2 class="text-base font-bold text-slate-900">+ Tambah Akun Kru Baru</h2>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                <input type="text" name="name" required class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none" placeholder="Nama Kru">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Email Login *</label>
                <input type="email" name="email" required class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none" placeholder="kru3@ruang360.test">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi *</label>
                <input type="password" name="password" required minlength="6" class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none" placeholder="Minimal 6 karakter">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tugaskan ke Event</label>
                <div class="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    @foreach($events as $event)
                        <label class="flex items-center gap-2 text-xs text-slate-700">
                            <input type="checkbox" name="event_ids[]" value="{{ $event->id }}" class="rounded border-slate-300 text-amber-600">
                            <span class="truncate">{{ $event->title }}</span>
                        </label>
                    @endforeach
                </div>
            </div>
            <button type="submit" class="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-slate-800 cursor-pointer">
                Simpan Akun Kru
            </button>
        </form>

        <div class="lg:col-span-8 space-y-4">
            @forelse($crewMembers as $crew)
                <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-base font-bold text-slate-900">{{ $crew->name }}</h3>
                                <span class="rounded-full px-2.5 py-0.5 text-[11px] font-bold {{ $crew->is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700' }}">
                                    {{ $crew->is_active ? 'Aktif' : 'Nonaktif' }}
                                </span>
                            </div>
                            <p class="text-xs text-slate-500">{{ $crew->email }} · {{ $crew->panoramaPhotos->count() }} foto 360° diunggah</p>
                        </div>

                        <form method="POST" action="{{ route('admin.crew.toggle', $crew) }}">
                            @csrf
                            @method('PATCH')
                            <button type="submit" class="rounded-xl border px-3.5 py-1.5 text-xs font-bold cursor-pointer {{ $crew->is_active ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' }}">
                                {{ $crew->is_active ? 'Nonaktifkan Akun' : 'Aktifkan Kembali' }}
                            </button>
                        </form>
                    </div>

                    <form method="POST" action="{{ route('admin.crew.assignments', $crew) }}" class="pt-3 border-t border-slate-100 space-y-3">
                        @csrf
                        @method('PUT')
                        <p class="text-xs font-semibold text-slate-700">Event yang Dapat Diakses Kru Ini:</p>
                        <div class="grid sm:grid-cols-2 gap-2">
                            @php $assignedIds = $crew->assignedEvents->pluck('id')->all(); @endphp
                            @foreach($events as $event)
                                <label class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer">
                                    <input type="checkbox" name="event_ids[]" value="{{ $event->id }}" @checked(in_array($event->id, $assignedIds)) class="rounded border-slate-300 text-amber-600">
                                    <span class="truncate font-medium">{{ $event->title }}</span>
                                </label>
                            @endforeach
                        </div>
                        <button type="submit" class="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer">
                            Simpan Penugasan Event
                        </button>
                    </form>
                </div>
            @empty
                <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                    Belum ada kru lapangan terdaftar.
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection
