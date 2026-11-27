@extends('layouts.app')

@section('title', ($isEdit ? 'Edit Event' : 'Buat Event Baru') . ' — Admin Ruang360°')

@section('content')
<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <div class="flex items-center justify-between gap-4">
        <div>
            <a href="{{ route('admin.dashboard') }}" class="text-xs font-semibold text-slate-500 hover:text-slate-900">← Kembali ke Dasbor</a>
            <h1 class="text-2xl font-bold text-slate-900 mt-1">{{ $isEdit ? 'Pengaturan Event: ' . $event->title : 'Buat Profil Event Baru' }}</h1>
        </div>
        @if($isEdit)
            <div class="flex items-center gap-2">
                <a href="{{ route('admin.floorplan.edit', $event) }}" class="rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400">Kelola Denah &amp; Pin</a>
                <a href="{{ route('tour.show', $event->public_slug) }}" target="_blank" class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Pratinjau Tur ↗</a>
            </div>
        @endif
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
        <form method="POST"
              action="{{ $isEdit ? route('admin.events.update', $event) : route('admin.events.store') }}"
              enctype="multipart/form-data"
              class="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
            @csrf
            @if($isEdit) @method('PUT') @endif

            <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Judul Acara *</label>
                    <input type="text" name="title" value="{{ old('title', $event->title) }}" required
                           class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                           placeholder="Contoh: Resepsi Pernikahan Shila & Rafi">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Tanggal Pelaksanaan</label>
                    <input type="date" name="event_date" value="{{ old('event_date', $event->event_date?->format('Y-m-d')) }}"
                           class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Status Acara *</label>
                    <select name="status" class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none">
                        @foreach($statuses as $key => $label)
                            <option value="{{ $key }}" @selected(old('status', $event->status) === $key)>{{ $label }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Lokasi / Nama Gedung (Venue) *</label>
                    <input type="text" name="venue_name" value="{{ old('venue_name', $event->venue_name) }}" required
                           class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                           placeholder="Opus Grand Ballroom, The Tribrata">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Nama Penyelenggara / Vendor</label>
                    <input type="text" name="organizer_name" value="{{ old('organizer_name', $event->organizer_name) }}"
                           class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                           placeholder="Azka Anggun Art">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Slug Tautan Publik {{ $isEdit ? '*' : '(Opsional — otomatis acak jika dikosongkan)' }}</label>
                    <div class="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:border-amber-500">
                        <span class="bg-slate-50 px-3 py-2.5 text-xs text-slate-500 border-r border-slate-200">{{ url('/tour') }}/</span>
                        <input type="text" name="public_slug" value="{{ old('public_slug', $event->public_slug) }}" {{ $isEdit ? 'required' : '' }}
                               class="flex-1 px-3 py-2.5 text-sm font-mono focus:outline-none"
                               placeholder="otomatis-unik">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Singkat Acara</label>
                    <textarea name="description" rows="3"
                              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                              placeholder="Catatan tata letak atau konsep dekorasi untuk klien dan tamu...">{{ old('description', $event->description) }}</textarea>
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Logo Penyelenggara / Acara</label>
                    @if($isEdit && $event->logo_url)
                        <img src="{{ $event->logo_url }}" alt="Logo" class="h-14 w-auto rounded-lg border border-slate-200 mb-2 bg-white p-1">
                    @endif
                    <input type="file" name="logo" accept="image/*" class="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-700 hover:file:bg-slate-200">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1.5">Musik Latar Mode VR (MP3 / WAV / OGG)</label>
                    @if($isEdit && $event->bg_music_url)
                        <div class="mb-2 space-y-1.5">
                            <audio controls class="w-full h-8">
                                <source src="{{ $event->bg_music_url }}">
                            </audio>
                            <label class="inline-flex items-center gap-1.5 text-xs text-rose-600">
                                <input type="checkbox" name="remove_bg_music" value="1"> Hapus musik latar saat ini
                            </label>
                        </div>
                    @endif
                    <input type="file" name="bg_music" accept=".mp3,.wav,.ogg,.m4a,audio/*" class="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-700 hover:file:bg-slate-200">
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100">
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tugaskan Kru Lapangan</label>
                <div class="grid sm:grid-cols-2 gap-2.5">
                    @forelse($crewMembers as $crew)
                        <label class="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm cursor-pointer hover:bg-slate-50">
                            <input type="checkbox" name="crew_ids[]" value="{{ $crew->id }}"
                                   @checked(in_array($crew->id, old('crew_ids', $assignedCrewIds)))
                                   class="rounded border-slate-300 text-amber-600 focus:ring-amber-500">
                            <div class="min-w-0">
                                <span class="block font-semibold text-slate-800 truncate">{{ $crew->name }}</span>
                                <span class="block text-[11px] text-slate-500 truncate">{{ $crew->email }} {{ $crew->is_active ? '' : '(Nonaktif)' }}</span>
                            </div>
                        </label>
                    @empty
                        <p class="text-xs text-slate-500">Belum ada akun kru. Buat akun kru di menu Manajemen Kru.</p>
                    @endforelse
                </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <button type="submit" class="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition cursor-pointer">
                    {{ $isEdit ? 'Simpan Perubahan' : 'Buat Event & Lanjut ke Denah →' }}
                </button>
            </div>
        </form>

        <div class="lg:col-span-4 space-y-5">
            @if($isEdit)
                <div class="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                    <h2 class="font-bold text-slate-900">QR Code &amp; Tautan Publik</h2>
                    <div class="mx-auto w-48 h-48 rounded-xl border border-slate-200 p-2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                        {!! $qrSvg !!}
                    </div>
                    <p class="text-xs font-mono break-all rounded-lg bg-slate-50 p-2.5 border border-slate-200 text-slate-700">{{ $event->public_url }}</p>
                    <div class="grid grid-cols-2 gap-2.5">
                        <a href="{{ route('admin.events.qr', ['event' => $event, 'format' => 'png']) }}" class="rounded-xl bg-slate-900 py-2 text-center text-xs font-bold text-white">Unduh PNG</a>
                        <a href="{{ route('admin.events.qr', ['event' => $event, 'format' => 'svg']) }}" class="rounded-xl border border-slate-300 py-2 text-center text-xs font-bold text-slate-800">Unduh SVG</a>
                    </div>
                </div>

                <form method="POST" action="{{ route('admin.events.destroy', $event) }}"
                      onsubmit="return confirm('Yakin ingin menghapus seluruh data event, denah, dan foto 360°?');"
                      class="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 space-y-3">
                    @csrf
                    @method('DELETE')
                    <h3 class="text-sm font-bold text-rose-900">Hapus Event</h3>
                    <p class="text-xs text-rose-700">Menghapus event akan menghapus denah dan seluruh foto 360° terkait.</p>
                    <button type="submit" class="w-full rounded-xl bg-rose-600 py-2 text-xs font-bold text-white hover:bg-rose-700 cursor-pointer">Hapus Event Permanen</button>
                </form>
            @else
                <div class="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 space-y-2">
                    <h2 class="font-bold text-slate-900">Langkah Setelah Membuat Event</h2>
                    <p>1. Unggah denah acara jadi atau buat tata letak baru menggunakan Kanvas Editor.</p>
                    <p>2. Tempatkan nomor titik pin area dan deskripsi dekorasinya.</p>
                    <p>3. Kru lapangan dapat langsung memotret foto 360° <strong>Sebelum</strong> &amp; <strong>Sesudah</strong> dari ponsel.</p>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
