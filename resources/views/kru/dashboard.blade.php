@extends('layouts.app')

@section('title', 'Portal Kru Lapangan — Ruang360°')

@section('content')
<div class="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
    <div>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            Mode Kru Lapangan (Mobile-First)
        </span>
        <h1 class="text-2xl font-bold text-slate-900 mt-2">Event yang Ditugaskan</h1>
        <p class="text-sm text-slate-600 mt-0.5">Pilih acara aktif untuk membuka denah lokasi, memilih titik pin, dan merekam atau mengunggah foto panorama 360°.</p>
    </div>

    @if(file_exists(storage_path('app/public/apk/ruang360-kru.apk')))
        <div class="rounded-2xl border border-amber-300 bg-slate-950 p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
                <div class="text-xs font-bold uppercase tracking-wider text-amber-400">Aplikasi Android Native (Disarankan)</div>
                <h2 class="text-base font-bold mt-0.5">Ruang360° Kru — Kamera Native + OpenCV 3D</h2>
                <p class="text-xs text-slate-300 mt-0.5">Kunci exposure/fokus kamera asli HP &amp; sensor giroskop presisi tinggi tanpa batasan browser Chrome.</p>
            </div>
            <a href="{{ route('download.apk') }}"
               class="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-400 transition">
                ⬇ Unduh APK Android
            </a>
        </div>
    @endif

    @if($events->isEmpty())
        <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            Belum ada event yang ditugaskan kepada akun Anda. Hubungi Admin Utama.
        </div>
    @else
        <div class="space-y-4">
            @foreach($events as $event)
                @php $stats = $event->completion_stats; @endphp
                <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div class="h-36 sm:h-28 sm:w-40 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        @if($event->floorplan?->image_url)
                            <img src="{{ $event->floorplan->image_url }}" alt="{{ $event->title }}" class="h-full w-full object-cover">
                        @else
                            <div class="h-full w-full flex items-center justify-center text-xs text-slate-400">Belum ada denah</div>
                        @endif
                    </div>

                    <div class="flex-1 min-w-0 space-y-2">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-bold text-white">
                                {{ $statuses[$event->status] ?? $event->status }}
                            </span>
                            @if($event->event_date)
                                <span class="text-xs text-slate-500">{{ $event->event_date->translatedFormat('d M Y') }}</span>
                            @endif
                        </div>
                        <h2 class="text-lg font-bold text-slate-900 truncate">{{ $event->title }}</h2>
                        <p class="text-xs text-slate-600 truncate">{{ $event->venue_name }}</p>

                        <div class="flex items-center gap-3 text-xs pt-1">
                            <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div class="h-full rounded-full bg-emerald-500" style="width: {{ $stats['progress_percent'] }}%"></div>
                            </div>
                            <span class="font-bold text-slate-800 tabular-nums shrink-0">{{ $stats['filled_pins'] }}/{{ $stats['total_pins'] }} Pin</span>
                        </div>
                    </div>

                    <a href="{{ route('kru.events.show', $event) }}"
                       class="rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-bold text-slate-950 shadow-sm hover:bg-amber-400 transition shrink-0">
                        Buka Denah →
                    </a>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
