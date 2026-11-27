@extends('layouts.app')

@section('title', 'Denah Kru — ' . $event->title)

@section('content')
<div class="mx-auto max-w-5xl px-4 sm:px-6 py-5 space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <a href="{{ route('kru.dashboard') }}" class="text-xs font-semibold text-slate-500 hover:text-slate-900">← Daftar Event Saya</a>
            <h1 class="text-xl font-bold text-slate-900 mt-0.5">{{ $event->title }}</h1>
            <p class="text-xs text-slate-600">{{ $event->venue_name }} · Ketuk nomor pin pada denah untuk ambil foto 360°.</p>
        </div>
        <a href="{{ route('tour.show', $event->public_slug) }}" target="_blank" class="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700">
            Lihat Tur Publik ↗
        </a>
    </div>

    @if($floorplan && $floorplan->image_url)
        <div class="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
            <div class="relative overflow-hidden rounded-xl bg-slate-50">
                <img src="{{ $floorplan->image_url }}" alt="Denah {{ $event->title }}" class="w-full h-auto block">
                @foreach($pins as $pin)
                    @php
                        $seb = $pin->photos->where('phase', 'sebelum')->count();
                        $ses = $pin->photos->where('phase', 'sesudah')->count();
                        $pinColor = ($seb > 0 && $ses > 0)
                            ? 'bg-emerald-600 text-white ring-white'
                            : (($seb > 0 || $ses > 0) ? 'bg-amber-500 text-slate-950 ring-white' : 'bg-rose-600 text-white ring-white');
                    @endphp
                    <a href="{{ route('kru.pins.capture', $pin) }}"
                       style="left: {{ $pin->pos_x }}%; top: {{ $pin->pos_y }}%;"
                       class="absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-extrabold shadow-lg ring-2 {{ $pinColor }} hover:scale-125 transition"
                       title="Pin #{{ $pin->pin_number }} — {{ $pin->title }}">
                        {{ $pin->pin_number }}
                    </a>
                @endforeach
            </div>

            <div class="mt-3 flex flex-wrap items-center gap-4 px-2 text-xs text-slate-600">
                <span class="inline-flex items-center gap-1.5"><span class="h-3 w-3 rounded-full bg-emerald-600"></span> Sebelum &amp; Sesudah Lengkap</span>
                <span class="inline-flex items-center gap-1.5"><span class="h-3 w-3 rounded-full bg-amber-500"></span> Baru 1 Fase</span>
                <span class="inline-flex items-center gap-1.5"><span class="h-3 w-3 rounded-full bg-rose-600"></span> Belum Ada Foto</span>
            </div>
        </div>
    @else
        <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            Admin belum mengunggah denah untuk acara ini.
        </div>
    @endif

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 class="text-sm font-bold text-slate-900">Pilih Titik Lokasi ({{ $pins->count() }} Pin)</h2>
        <div class="grid sm:grid-cols-2 gap-2.5">
            @foreach($pins as $pin)
                @php
                    $sebCount = $pin->photos->where('phase', 'sebelum')->count();
                    $sesCount = $pin->photos->where('phase', 'sesudah')->count();
                @endphp
                <a href="{{ route('kru.pins.capture', $pin) }}"
                   class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 hover:border-amber-400 hover:bg-amber-50/40 transition">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{{ $pin->pin_number }}</span>
                        <div class="min-w-0">
                            <div class="text-sm font-bold text-slate-900 truncate">{{ $pin->title }}</div>
                            <div class="text-[11px] text-slate-500">
                                Sebelum: <strong>{{ $sebCount }}</strong> · Sesudah: <strong>{{ $sesCount }}</strong>
                            </div>
                        </div>
                    </div>
                    <span class="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-800">Ambil 360° →</span>
                </a>
            @endforeach
        </div>
    </div>
</div>
@endsection
