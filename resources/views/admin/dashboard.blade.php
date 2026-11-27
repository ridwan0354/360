@extends('layouts.app')

@section('title', 'Dasbor Multi-Event — Admin Ruang360°')

@section('content')
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6" x-data="{ qrModalEvent: null, copiedId: null }">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold text-slate-900">Dasbor Multi-Event</h1>
            <p class="text-sm text-slate-600 mt-0.5">Sentralisasi pengelolaan acara, denah interaktif, penugasan kru, dan tautan publik QR Code.</p>
        </div>
        <div class="flex items-center gap-2.5">
            <a href="{{ route('admin.crew.index') }}" class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                Kelola Akun Kru
            </a>
            <a href="{{ route('admin.events.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-amber-500 hover:text-slate-950 transition">
                + Buat Event Baru
            </a>
        </div>
    </div>

    {{-- Summary Metrics --}}
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-xs font-medium text-slate-500">Total Event</p>
            <p class="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{{ $metrics['total_events'] }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-xs font-medium text-slate-500">Event Aktif</p>
            <p class="mt-1 text-2xl font-bold text-amber-600 tabular-nums">{{ $metrics['active_events'] }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-xs font-medium text-slate-500">Total Titik Pin</p>
            <p class="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{{ $metrics['total_pins'] }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <p class="text-xs font-medium text-slate-500">Foto Panorama 360°</p>
            <p class="mt-1 text-2xl font-bold text-emerald-600 tabular-nums">{{ $metrics['total_photos'] }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 col-span-2 lg:col-span-1">
            <p class="text-xs font-medium text-slate-500">Kru Lapangan Aktif</p>
            <p class="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{{ $metrics['active_crew'] }}</p>
        </div>
    </div>

    {{-- Search, Status Filter & View Switcher --}}
    <form method="GET" action="{{ route('admin.dashboard') }}" class="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
            <a href="{{ route('admin.dashboard', ['q' => $search, 'status' => 'all', 'view' => $viewMode]) }}"
               class="rounded-lg px-3 py-1.5 text-xs font-semibold {{ $status === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200' }}">
                Semua
            </a>
            @foreach($statuses as $key => $label)
                <a href="{{ route('admin.dashboard', ['q' => $search, 'status' => $key, 'view' => $viewMode]) }}"
                   class="rounded-lg px-3 py-1.5 text-xs font-semibold {{ $status === $key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200' }}">
                    {{ $label }}
                </a>
            @endforeach
        </div>

        <div class="flex items-center gap-2">
            <input type="hidden" name="status" value="{{ $status }}">
            <input type="hidden" name="view" value="{{ $viewMode }}">
            <input type="search" name="q" value="{{ $search }}" placeholder="Cari nama acara, venue, penyelenggara..."
                   class="w-full sm:w-64 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none">
            <button type="submit" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer">Cari</button>
            <div class="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
                <a href="{{ route('admin.dashboard', ['q' => $search, 'status' => $status, 'view' => 'cards']) }}"
                   class="rounded-lg px-2.5 py-1.5 text-xs font-semibold {{ $viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500' }}">Kartu</a>
                <a href="{{ route('admin.dashboard', ['q' => $search, 'status' => $status, 'view' => 'table']) }}"
                   class="rounded-lg px-2.5 py-1.5 text-xs font-semibold {{ $viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500' }}">Tabel</a>
            </div>
        </div>
    </form>

    @if($events->isEmpty())
        <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p class="text-base font-semibold text-slate-700">Belum ada event yang cocok dengan filter.</p>
            <a href="{{ route('admin.events.create') }}" class="mt-3 inline-flex rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950">+ Buat Event Pertama</a>
        </div>
    @elseif($viewMode === 'cards')
        <div class="grid md:grid-cols-2 gap-6">
            @foreach($events as $event)
                @php
                    $stats = $event->completion_stats;
                    $statusBadge = match($event->status) {
                        'berlangsung' => 'bg-emerald-100 text-emerald-800',
                        'persiapan' => 'bg-amber-100 text-amber-800',
                        'selesai' => 'bg-slate-200 text-slate-700',
                        default => 'bg-slate-100 text-slate-600',
                    };
                @endphp
                <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                    <div class="flex flex-col sm:flex-row gap-4 p-5">
                        <div class="sm:w-44 h-36 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                            @if($event->floorplan?->image_url)
                                <img src="{{ $event->floorplan->image_url }}" alt="Denah {{ $event->title }}" class="h-full w-full object-cover">
                            @else
                                <div class="h-full w-full flex items-center justify-center text-xs text-slate-400 px-3 text-center">Belum ada denah</div>
                            @endif
                            <span class="absolute top-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                                {{ $event->floorplan?->source_type === 'builder' ? 'Canvas' : 'Upload' }}
                            </span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <span class="rounded-full px-2.5 py-0.5 text-xs font-bold {{ $statusBadge }}">
                                    {{ $statuses[$event->status] ?? $event->status }}
                                </span>
                                @if($event->event_date)
                                    <span class="text-xs font-medium text-slate-500">{{ $event->event_date->translatedFormat('d M Y') }}</span>
                                @endif
                            </div>

                            <h2 class="mt-2 text-lg font-bold text-slate-900 truncate">{{ $event->title }}</h2>
                            <p class="text-xs text-slate-600 truncate">{{ $event->venue_name }}</p>

                            <div class="mt-3 space-y-1.5">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-medium text-slate-600">Progres Foto Pin</span>
                                    <span class="font-bold text-slate-900 tabular-nums">{{ $stats['filled_pins'] }}/{{ $stats['total_pins'] }} Pin ({{ $stats['progress_percent'] }}%)</span>
                                </div>
                                <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div class="h-full rounded-full bg-amber-500 transition-all" style="width: {{ $stats['progress_percent'] }}%"></div>
                                </div>
                                <div class="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                                    <span>Sebelum: <strong class="text-slate-700">{{ $stats['sebelum_pins'] }}</strong> pin</span>
                                    <span>Sesudah: <strong class="text-slate-700">{{ $stats['sesudah_pins'] }}</strong> pin</span>
                                    <span>Total foto: <strong class="text-slate-700">{{ $stats['total_photos'] }}</strong></span>
                                    <span>Kru: <strong class="text-slate-700">{{ $event->crew->count() }}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-auto border-t border-slate-100 bg-slate-50/70 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex flex-wrap items-center gap-2">
                            <a href="{{ route('admin.floorplan.edit', $event) }}" class="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition">
                                Denah &amp; Pin
                            </a>
                            <a href="{{ route('admin.events.edit', $event) }}" class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
                                Pengaturan
                            </a>
                            <a href="{{ route('tour.show', $event->public_slug) }}" target="_blank" class="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition">
                                Buka Tur 360° ↗
                            </a>
                        </div>

                        <div class="flex items-center gap-1.5">
                            <button type="button"
                                    @click="navigator.clipboard.writeText('{{ $event->public_url }}'); copiedId = {{ $event->id }}; setTimeout(() => copiedId = null, 2000)"
                                    class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer">
                                <span x-show="copiedId !== {{ $event->id }}">Salin Link</span>
                                <span x-show="copiedId === {{ $event->id }}" class="text-emerald-600">Tersalin!</span>
                            </button>
                            <button type="button" @click="qrModalEvent = {{ $event->id }}"
                                    class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer">
                                QR Code
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div class="rounded-2xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
            <table class="min-w-full divide-y divide-slate-200 text-sm">
                <thead class="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                        <th class="px-5 py-3.5">Acara &amp; Venue</th>
                        <th class="px-4 py-3.5">Status</th>
                        <th class="px-4 py-3.5">Progres Pin</th>
                        <th class="px-4 py-3.5">Kru</th>
                        <th class="px-5 py-3.5 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach($events as $event)
                        @php $stats = $event->completion_stats; @endphp
                        <tr class="hover:bg-slate-50/70">
                            <td class="px-5 py-3.5">
                                <div class="font-bold text-slate-900">{{ $event->title }}</div>
                                <div class="text-xs text-slate-500">{{ $event->venue_name }} · {{ $event->event_date?->translatedFormat('d M Y') ?? '-' }}</div>
                            </td>
                            <td class="px-4 py-3.5">
                                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{{ $statuses[$event->status] ?? $event->status }}</span>
                            </td>
                            <td class="px-4 py-3.5 tabular-nums text-xs">
                                <span class="font-bold text-slate-900">{{ $stats['filled_pins'] }}/{{ $stats['total_pins'] }}</span> pin · {{ $stats['total_photos'] }} foto
                            </td>
                            <td class="px-4 py-3.5 text-xs text-slate-600">{{ $event->crew->count() }} kru</td>
                            <td class="px-5 py-3.5 text-right whitespace-nowrap space-x-1.5">
                                <a href="{{ route('admin.floorplan.edit', $event) }}" class="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">Denah &amp; Pin</a>
                                <a href="{{ route('admin.events.edit', $event) }}" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Edit</a>
                                <button type="button" @click="qrModalEvent = {{ $event->id }}" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer">QR</button>
                                <a href="{{ route('tour.show', $event->public_slug) }}" target="_blank" class="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950">Tur ↗</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    {{-- QR Preview & Download Modals --}}
    @foreach($events as $event)
        <div x-show="qrModalEvent === {{ $event->id }}" x-cloak
             class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
             @click.self="qrModalEvent = null">
            <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">QR Code &amp; Tautan Publik</h3>
                        <p class="text-xs text-slate-500">{{ $event->title }}</p>
                    </div>
                    <button type="button" @click="qrModalEvent = null" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer">✕</button>
                </div>

                <div class="mx-auto w-56 h-56 rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    {!! $qrPreviews[$event->id] !!}
                </div>

                <div class="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between gap-2 text-xs">
                    <span class="truncate font-mono text-slate-700">{{ $event->public_url }}</span>
                    <button type="button" @click="navigator.clipboard.writeText('{{ $event->public_url }}'); copiedId = {{ $event->id }}"
                            class="shrink-0 rounded-lg bg-slate-900 px-2.5 py-1 font-semibold text-white cursor-pointer">Salin</button>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <a href="{{ route('admin.events.qr', ['event' => $event, 'format' => 'png']) }}"
                       class="rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white hover:bg-slate-800">
                        Unduh PNG (Digital)
                    </a>
                    <a href="{{ route('admin.events.qr', ['event' => $event, 'format' => 'svg']) }}"
                       class="rounded-xl border border-slate-300 bg-white py-2.5 text-center text-xs font-bold text-slate-800 hover:bg-slate-50">
                        Unduh SVG (Cetak)
                    </a>
                </div>
            </div>
        </div>
    @endforeach
</div>
@endsection
