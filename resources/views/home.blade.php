@extends('layouts.app')

@section('title', 'Ruang360° — Platform Virtual Tour 360° VR & Denah Interaktif Multi-Event')

@section('content')
@php
    $featured = $events->first();
@endphp

<section class="relative overflow-hidden bg-slate-950 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,157,84,0.22),transparent_50%)]"></div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative">
        <div class="grid lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-6 space-y-6">
                <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                    <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                    Denah Interaktif + Panorama 360° + Mode Kacamata VR
                </div>

                <h1 class="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.12]">
                    Jelajahi Tata Letak &amp; Atmosfer Ruangan <span class="text-amber-400">Sebelum &amp; Sesudah</span> Secara Nyata.
                </h1>

                <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
                    Platform operasional dan showcase virtual tour $360^\circ$ untuk pernikahan, pameran, dan acara korporat. Ketuk titik pin di atas denah untuk masuk ke ruang panorama, bandingkan fase persiapan vs hasil akhir, hingga aktifkan kacamata VR tanpa perlu login.
                </p>

                <div class="flex flex-wrap gap-3 pt-1">
                    @if($featured)
                        <a href="{{ route('tour.show', $featured->public_slug) }}" class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Buka Demo Tur: {{ $featured->title }}
                        </a>
                    @endif
                    <a href="{{ route('login') }}" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                        Masuk Dasbor Admin / Kru
                    </a>
                </div>
            </div>

            <div class="lg:col-span-6">
                @if($featured && $featured->floorplan?->image_url)
                    <div class="rounded-2xl border border-white/15 bg-slate-900/90 p-3 shadow-2xl">
                        <div class="relative overflow-hidden rounded-xl bg-white">
                            <img src="{{ $featured->floorplan->image_url }}" alt="Denah {{ $featured->title }}" class="w-full h-auto block">
                            @foreach($featured->floorplan->pins as $pin)
                                <a href="{{ route('tour.show', ['slug' => $featured->public_slug, 'pin' => $pin->id]) }}"
                                   title="Pin #{{ $pin->pin_number }} — {{ $pin->title }}"
                                   style="left: {{ $pin->pos_x }}%; top: {{ $pin->pos_y }}%;"
                                   class="absolute -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-slate-950 shadow-md ring-2 ring-white hover:scale-125 transition">
                                    {{ $pin->pin_number }}
                                </a>
                            @endforeach
                        </div>
                        <div class="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-300">
                            <div>
                                <span class="font-semibold text-white">{{ $featured->venue_name }}</span>
                                <span class="mx-1.5 text-slate-500">•</span>
                                <span>{{ $featured->floorplan->pins->count() }} Titik Pin Interaktif 360°</span>
                            </div>
                            <span class="text-amber-300 font-medium">Klik nomor pin untuk langsung masuk 360° →</span>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</section>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <div>
        <div class="flex items-end justify-between gap-4 mb-6">
            <div>
                <h2 class="text-2xl font-bold text-slate-900">Tur Virtual Publik Aktif</h2>
                <p class="text-sm text-slate-600 mt-1">Klien dan tamu undangan dapat membuka tautan langsung tanpa perlu login.</p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
            @foreach($events as $event)
                @php $stats = $event->completion_stats; @endphp
                <div class="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                    <div class="relative h-56 bg-slate-100 overflow-hidden">
                        @if($event->floorplan?->image_url)
                            <img src="{{ $event->floorplan->image_url }}" alt="{{ $event->title }}" class="h-full w-full object-cover object-center group-hover:scale-[1.02] transition duration-300">
                        @endif
                        <div class="absolute top-3 left-3 flex items-center gap-2">
                            <span class="rounded-full bg-slate-900/85 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                                {{ \App\Models\Event::STATUSES[$event->status] ?? ucfirst($event->status) }}
                            </span>
                            <span class="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950">
                                {{ $stats['total_pins'] }} Pin 360°
                            </span>
                        </div>
                    </div>

                    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div>
                            <div class="text-xs font-semibold uppercase tracking-wider text-amber-600">
                                {{ $event->organizer_name ?: 'Penyelenggara Acara' }}
                                @if($event->event_date)
                                    · {{ $event->event_date->translatedFormat('d M Y') }}
                                @endif
                            </div>
                            <h3 class="mt-1 text-xl font-bold text-slate-900">{{ $event->title }}</h3>
                            <p class="text-sm text-slate-600 mt-0.5">{{ $event->venue_name }}</p>
                            @if($event->description)
                                <p class="text-sm text-slate-500 mt-2 line-clamp-2">{{ $event->description }}</p>
                            @endif
                        </div>

                        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                            <div class="text-xs text-slate-500">
                                <span class="font-semibold text-slate-800">{{ $stats['total_photos'] }}</span> foto panorama ·
                                <span class="font-semibold text-slate-800">{{ $stats['progress_percent'] }}%</span> area terisi
                            </div>
                            <a href="{{ route('tour.show', $event->public_slug) }}" class="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition">
                                Jelajahi 360° VR →
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <div class="grid md:grid-cols-3 gap-5">
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <div class="h-10 w-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold mb-4">01</div>
            <h3 class="font-bold text-slate-900">Admin Utama</h3>
            <p class="mt-1.5 text-sm text-slate-600">Kelola multi-event, unggah atau gambar denah di kanvas, letakkan titik pin serta panah navigasi, atur akun kru, dan unduh QR Code PNG/SVG.</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <div class="h-10 w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-4">02</div>
            <h3 class="font-bold text-slate-900">Kru Lapangan (Mobile)</h3>
            <p class="mt-1.5 text-sm text-slate-600">Buka denah di ponsel, ketuk pin lokasi, pilih tab <strong>Sebelum</strong> atau <strong>Sesudah</strong>, lalu ambil foto 360° langsung dengan kamera pemandu browser.</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <div class="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">03</div>
            <h3 class="font-bold text-slate-900">Klien &amp; Tamu Undangan</h3>
            <p class="mt-1.5 text-sm text-slate-600">Pindai QR Code tanpa login, nikmati denah mini berputar real-time, sakelar Sebelum/Sesudah pada sudut pandang sama, musik latar, dan mode VR.</p>
        </div>
    </div>
</section>
@endsection
