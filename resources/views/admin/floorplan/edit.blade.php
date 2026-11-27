@extends('layouts.app')

@section('title', 'Editor Denah & Pin — ' . $event->title)

@section('content')
<div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 space-y-5"
     x-data="adminFloorplanStudio({
         eventId: {{ $event->id }},
         hasFloorplan: {{ $floorplan && $floorplan->image_url ? 'true' : 'false' }},
         sourceType: '{{ $floorplan?->source_type ?? 'upload' }}',
         canvasJson: @js($floorplan?->canvas_json),
         pins: @js($pinsPayload),
         urls: {
             storePin: '{{ route('admin.pins.store', $event) }}',
             updatePinBase: '{{ url('/admin/pins') }}',
             storePhotoBase: '{{ url('/admin/pins') }}',
             destroyPhotoBase: '{{ url('/admin/photos') }}',
             storeLinkBase: '{{ url('/admin/photos') }}',
             destroyLinkBase: '{{ url('/admin/links') }}',
             saveBuilder: '{{ route('admin.floorplan.builder', $event) }}',
         },
         csrf: '{{ csrf_token() }}'
     })"
     x-init="init()">

    {{-- Top Bar --}}
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
            <div class="flex items-center gap-2 text-xs text-slate-500">
                <a href="{{ route('admin.dashboard') }}" class="hover:text-slate-900 font-semibold">← Dasbor</a>
                <span>/</span>
                <a href="{{ route('admin.events.edit', $event) }}" class="hover:text-slate-900 font-semibold">Pengaturan Event</a>
            </div>
            <h1 class="text-xl font-bold text-slate-900 mt-0.5">{{ $event->title }} — Editor Denah, Pin &amp; Navigasi 360°</h1>
        </div>

        <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                <button type="button" @click="switchTab('upload')"
                        :class="activeTab === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'"
                        class="rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer">
                    Opsi 1: Denah &amp; Pin Interaktif
                </button>
                <button type="button" @click="switchTab('builder')"
                        :class="activeTab === 'builder' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'"
                        class="rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer">
                    Opsi 2: Kanvas Pembuat Denah
                </button>
            </div>

            <a href="{{ route('tour.show', $event->public_slug) }}" target="_blank"
               class="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition">
                Pratinjau Tur Publik ↗
            </a>
        </div>
    </div>

    {{-- Toast Notification --}}
    <div x-show="toast" x-cloak
         class="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl border border-amber-400/40"
         x-text="toast"></div>

    {{-- TAB 1: UPLOAD FLOORPLAN & PIN PLACEMENT --}}
    <div x-show="activeTab === 'upload'" class="grid lg:grid-cols-12 gap-5 items-start">
        <div class="lg:col-span-8 space-y-4">
            {{-- Upload & Zoom Toolbar --}}
            <div class="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <form method="POST" action="{{ route('admin.floorplan.upload', $event) }}" enctype="multipart/form-data" class="flex flex-wrap items-center gap-2">
                    @csrf
                    <label class="text-xs font-semibold text-slate-700">Unggah Denah Baru (JPG/PNG/WebP):</label>
                    <input type="file" name="floorplan_image" accept=".jpg,.jpeg,.png,.webp,image/*" required
                           class="text-xs text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:font-semibold file:text-slate-700 hover:file:bg-slate-200">
                    <button type="submit" class="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer">Unggah Denah</button>
                </form>

                <div class="flex items-center gap-1.5">
                    <button type="button" @click="placingMode = !placingMode"
                            :class="placingMode ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                            class="rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer">
                        <span x-text="placingMode ? '● Mode Tambah Pin (Klik Denah)' : '+ Tambah Pin di Denah'"></span>
                    </button>
                    <button type="button" @click="zoomBy(0.2)" class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold hover:bg-slate-50 cursor-pointer">+</button>
                    <button type="button" @click="zoomBy(-0.2)" class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold hover:bg-slate-50 cursor-pointer">−</button>
                    <button type="button" @click="resetPanZoom()" class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-slate-50 cursor-pointer">Reset</button>
                </div>
            </div>

            {{-- Interactive Zoom/Pan Map Canvas --}}
            <div class="rounded-2xl border border-slate-200 bg-slate-900/5 p-3 shadow-sm">
                @if($floorplan && $floorplan->image_url)
                    <div class="relative h-[560px] w-full overflow-hidden rounded-xl bg-white border border-slate-200 select-none"
                         x-ref="mapViewport"
                         @wheel.prevent="onWheelZoom($event)"
                         @pointerdown="startPan($event)"
                         @pointermove="onPan($event)"
                         @pointerup="endPan($event)">
                        <div class="absolute origin-top-left transition-transform duration-75"
                             x-ref="mapStage"
                             :style="`transform: translate(${panX}px, ${panY}px) scale(${zoom});`"
                             @click="handleMapClick($event)">
                            <img src="{{ $floorplan->image_url }}"
                                 alt="Denah {{ $event->title }}"
                                 class="block max-w-none w-[960px] h-auto pointer-events-none select-none"
                                 draggable="false"
                                 @load="resetPanZoom()">

                            <template x-for="pin in pins" :key="pin.id">
                                <button type="button"
                                        :style="`left: ${pin.pos_x}%; top: ${pin.pos_y}%;`"
                                        @pointerdown.stop="startDragPin($event, pin)"
                                        @click.stop="selectPin(pin)"
                                        :class="selectedPin && selectedPin.id === pin.id ? 'bg-amber-500 text-slate-950 scale-125 ring-4 ring-amber-300 z-20' : (pin.photos.length ? 'bg-slate-900 text-white ring-2 ring-white z-10' : 'bg-rose-600 text-white ring-2 ring-white z-10')"
                                        class="absolute -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold shadow-lg cursor-grab active:cursor-grabbing transition-transform"
                                        :title="`#${pin.pin_number} ${pin.title} (seret untuk geser posisi)`">
                                    <span x-text="pin.pin_number"></span>
                                </button>
                            </template>
                        </div>

                        <div class="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                            <span x-show="placingMode" class="text-amber-300 font-bold">Klik lokasi pada denah untuk menempatkan pin baru.</span>
                            <span x-show="!placingMode">Seret denah untuk geser · Gulir mouse untuk zoom · Seret pin angka untuk memindahkan posisi.</span>
                        </div>
                    </div>
                @else
                    <div class="h-96 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white text-center p-6">
                        <p class="text-base font-bold text-slate-800">Denah Belum Tersedia</p>
                        <p class="text-xs text-slate-500 mt-1 max-w-md">Unggah file gambar denah jadi di atas atau beralih ke <strong>Opsi 2: Kanvas Pembuat Denah</strong> untuk menggambar tata letak baru.</p>
                    </div>
                @endif
            </div>
        </div>

        {{-- Right Sidebar: Legend + Selected Pin Editor --}}
        <div class="lg:col-span-4 space-y-4">
            {{-- Pin Legend List --}}
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                    <h2 class="text-sm font-bold text-slate-900">Daftar Pin &amp; Legenda (<span x-text="pins.length"></span>)</h2>
                    <button type="button" @click="placingMode = true" class="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer">+ Tambah Pin</button>
                </div>

                <div class="max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1">
                    <template x-for="pin in pins" :key="'list-' + pin.id">
                        <button type="button" @click="selectPin(pin)"
                                :class="selectedPin && selectedPin.id === pin.id ? 'bg-amber-50 border-l-4 border-l-amber-500' : 'hover:bg-slate-50'"
                                class="w-full text-left px-2.5 py-2 flex items-start gap-2.5 transition cursor-pointer">
                            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white" x-text="pin.pin_number"></span>
                            <div class="min-w-0 flex-1">
                                <div class="text-xs font-bold text-slate-900 truncate" x-text="pin.title"></div>
                                <div class="text-[11px] text-slate-500">
                                    Sebelum: <strong x-text="countPhase(pin, 'sebelum')"></strong> ·
                                    Sesudah: <strong x-text="countPhase(pin, 'sesudah')"></strong>
                                </div>
                            </div>
                        </button>
                    </template>
                    <div x-show="pins.length === 0" class="py-6 text-center text-xs text-slate-400">
                        Belum ada titik pin. Klik "+ Tambah Pin di Denah".
                    </div>
                </div>
            </div>

            {{-- Selected Pin Details & Photos --}}
            <template x-if="selectedPin">
                <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-slate-900">Detail Pin #<span x-text="selectedPin.pin_number"></span></h3>
                        <button type="button" @click="deleteSelectedPin()" class="text-xs font-semibold text-rose-600 hover:underline cursor-pointer">Hapus Pin</button>
                    </div>

                    <div class="space-y-2.5">
                        <div class="grid grid-cols-4 gap-2">
                            <div>
                                <label class="block text-[11px] font-semibold text-slate-600 mb-1">No. Pin</label>
                                <input type="number" x-model.number="selectedPin.pin_number" class="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs">
                            </div>
                            <div class="col-span-3">
                                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Judul Area *</label>
                                <input type="text" x-model="selectedPin.title" class="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs">
                            </div>
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">Ukuran / Spesifikasi Properti</label>
                            <input type="text" x-model="selectedPin.dimensions_note" class="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs" placeholder="Misal: Pergola 5x5m dengan hanging garden">
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">Deskripsi Detail</label>
                            <textarea rows="2" x-model="selectedPin.description" class="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"></textarea>
                        </div>
                        <div class="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Koordinat: X <strong x-text="selectedPin.pos_x"></strong>%, Y <strong x-text="selectedPin.pos_y"></strong>%</span>
                            <button type="button" @click="savePinDetails()" class="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer">Simpan Detail</button>
                        </div>
                    </div>

                    {{-- Multi-Photo Upload & List --}}
                    <div class="pt-3 border-t border-slate-100 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-800">Foto Panorama 360°</span>
                            <div class="inline-flex rounded-lg bg-slate-100 p-0.5 text-[11px]">
                                <button type="button" @click="photoPhase = 'sebelum'" :class="photoPhase === 'sebelum' ? 'bg-white font-bold shadow-sm' : 'text-slate-600'" class="rounded-md px-2.5 py-1 cursor-pointer">Sebelum</button>
                                <button type="button" @click="photoPhase = 'sesudah'" :class="photoPhase === 'sesudah' ? 'bg-white font-bold shadow-sm' : 'text-slate-600'" class="rounded-md px-2.5 py-1 cursor-pointer">Sesudah</button>
                            </div>
                        </div>

                        <div class="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                            <input type="text" x-model="newAngleLabel" placeholder="Label sudut (misal: Tampak Depan)" class="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs">
                            <div class="flex items-center gap-2">
                                <input type="file" x-ref="adminPhotoInput" accept=".jpg,.jpeg,.png,.webp,image/*" class="flex-1 text-[11px] text-slate-600 file:mr-2 file:rounded file:border-0 file:bg-slate-200 file:px-2 file:py-1 file:font-semibold">
                                <button type="button" @click="uploadPinPhoto()" :disabled="uploadingPhoto"
                                        class="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 cursor-pointer">
                                    <span x-text="uploadingPhoto ? 'Mengunggah...' : 'Unggah 360°'"></span>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-2 max-h-60 overflow-y-auto">
                            <template x-for="photo in filteredSelectedPhotos()" :key="photo.id">
                                <div class="flex items-center gap-2.5 rounded-xl border border-slate-200 p-2 bg-white">
                                    <img :src="photo.thumb_url" class="h-12 w-20 rounded-lg object-cover shrink-0 bg-slate-100" alt="">
                                    <div class="min-w-0 flex-1">
                                        <div class="text-xs font-bold text-slate-900 truncate" x-text="photo.angle_label || 'Sudut Utama'"></div>
                                        <div class="text-[11px] text-slate-500">
                                            <span x-text="photo.links.length"></span> panah navigasi
                                        </div>
                                        <div class="mt-1 flex items-center gap-2">
                                            <button type="button" @click="openLinkModal(photo)" class="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer">
                                                Atur Panah 360°
                                            </button>
                                            <button type="button" @click="deletePhoto(photo)" class="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer">
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div x-show="filteredSelectedPhotos().length === 0" class="py-3 text-center text-xs text-slate-400">
                                Belum ada foto fase <strong x-text="photoPhase"></strong> di pin ini.
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    {{-- TAB 2: CANVAS BUILDER --}}
    <div x-show="activeTab === 'builder'" x-cloak class="grid lg:grid-cols-12 gap-5 items-start">
        <div class="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
            <div>
                <h2 class="text-sm font-bold text-slate-900">Bentuk Dasar &amp; Alur Tamu</h2>
                <div class="grid grid-cols-2 gap-2 mt-2">
                    <button type="button" @click="builder?.addRoom()" class="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold hover:bg-slate-100 cursor-pointer">+ Ruangan</button>
                    <button type="button" @click="builder?.addWall()" class="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold hover:bg-slate-100 cursor-pointer">+ Dinding</button>
                    <button type="button" @click="builder?.addDoor({kind:'door_in'})" class="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 cursor-pointer">+ Pintu Masuk</button>
                    <button type="button" @click="builder?.addDoor({kind:'door_out'})" class="rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 cursor-pointer">+ Pintu Keluar</button>
                    <button type="button" @click="builder?.addDoor({kind:'door_closed'})" class="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-100 cursor-pointer">✕ Pintu Tutup</button>
                    <button type="button" @click="builder?.addFlowArrow()" class="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold hover:bg-slate-100 cursor-pointer">→ Panah Alur</button>
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100">
                <h2 class="text-sm font-bold text-slate-900">Pustaka Ikon Acara</h2>
                <p class="text-[11px] text-slate-500 mb-2">Klik untuk menambahkan objek ke kanvas, lalu seret &amp; ubah ukuran.</p>
                <div class="grid grid-cols-1 gap-1.5">
                    <template x-for="item in iconLibrary" :key="item.kind">
                        <button type="button" @click="builder?.addEventIcon(item.kind)"
                                class="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-slate-800 hover:border-amber-400 hover:bg-amber-50/50 transition cursor-pointer">
                            <span x-text="item.label"></span>
                            <span class="text-amber-600">+</span>
                        </button>
                    </template>
                </div>
            </div>

            <div x-show="selectedBuilderLabel !== null" class="pt-3 border-t border-slate-100 space-y-2">
                <label class="block text-xs font-bold text-slate-700">Edit Label Objek Terpilih</label>
                <div class="flex gap-1.5">
                    <input type="text" x-model="selectedBuilderLabel" @input="builder?.updateSelectedLabel(selectedBuilderLabel)"
                           class="flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs">
                    <button type="button" @click="builder?.deleteSelected()" class="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white cursor-pointer">Hapus</button>
                </div>
            </div>
        </div>

        <div class="lg:col-span-9 space-y-3">
            <div class="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <p class="text-xs text-slate-600">Susun ruangan, dinding, pintu, alur tamu, dan ikon dekorasi. Saat disimpan, kanvas otomatis menjadi denah aktif siap dipasang pin.</p>
                <div class="flex items-center gap-2">
                    <button type="button" @click="builder?.clearCanvas()" class="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">Reset Kanvas</button>
                    <button type="button" @click="saveBuilder()" :disabled="savingBuilder"
                            class="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer">
                        <span x-text="savingBuilder ? 'Menyimpan...' : 'Simpan Kanvas sebagai Denah Event'"></span>
                    </button>
                </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-3 overflow-x-auto shadow-sm">
                <div id="konva-builder-container" class="mx-auto w-[1200px] h-[760px] rounded-xl overflow-hidden border border-slate-200"></div>
            </div>
        </div>
    </div>

    {{-- Modal: New Pin Input --}}
    <div x-show="newPinModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" @click.self="newPinModal = false">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 space-y-4 shadow-2xl">
            <h3 class="text-lg font-bold text-slate-900">Tambah Titik Pin Baru</h3>
            <p class="text-xs text-slate-500">Posisi pada denah: X = <strong x-text="pendingPin.pos_x"></strong>%, Y = <strong x-text="pendingPin.pos_y"></strong>%</p>
            <div class="space-y-3">
                <div class="grid grid-cols-4 gap-2">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">No. Pin</label>
                        <input type="number" x-model.number="pendingPin.pin_number" class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
                    </div>
                    <div class="col-span-3">
                        <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Area *</label>
                        <input type="text" x-model="pendingPin.title" placeholder="Contoh: Area Pelaminan" class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Ukuran / Catatan Properti</label>
                    <input type="text" x-model="pendingPin.dimensions_note" placeholder="Contoh: Frame 3x5m, LED multimedia" class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Area</label>
                    <textarea rows="2" x-model="pendingPin.description" class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></textarea>
                </div>
            </div>
            <div class="flex justify-end gap-2 pt-2">
                <button type="button" @click="newPinModal = false" class="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 cursor-pointer">Batal</button>
                <button type="button" @click="confirmCreatePin()" class="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white cursor-pointer">Simpan Pin</button>
            </div>
        </div>
    </div>

    {{-- Modal: 360° Navigation Arrow Placer --}}
    <div x-show="linkModalPhoto" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
        <div class="w-full max-w-5xl rounded-2xl bg-white overflow-hidden shadow-2xl grid lg:grid-cols-12">
            <div class="lg:col-span-8 bg-slate-950 relative h-[440px] lg:h-[540px]">
                <div x-ref="linkViewerEl" class="w-full h-full"></div>
                <div class="pointer-events-none absolute top-3 left-3 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs text-white border border-white/15">
                    Klik titik di dalam ruang 360° untuk menentukan arah panah (<span class="text-amber-300 font-bold" x-text="`Yaw ${pickedYaw}° · Pitch ${pickedPitch}°`"></span>)
                </div>
            </div>

            <div class="lg:col-span-4 p-5 flex flex-col justify-between gap-4">
                <div class="space-y-4">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="text-base font-bold text-slate-900">Panah Navigasi Antar-Titik</h3>
                            <p class="text-xs text-slate-500" x-text="linkModalPhoto ? (linkModalPhoto.angle_label + ' (' + linkModalPhoto.phase + ')') : ''"></p>
                        </div>
                        <button type="button" @click="closeLinkModal()" class="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
                    </div>

                    <div class="space-y-2.5 rounded-xl bg-slate-50 border border-slate-200 p-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Pin Tujuan *</label>
                            <select x-model="newLinkTargetPinId" class="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs">
                                <option value="">-- Pilih Pin Tujuan --</option>
                                <template x-for="p in pins.filter(x => !selectedPin || x.id !== selectedPin.id)" :key="'opt-' + p.id">
                                    <option :value="p.id" x-text="`#${p.pin_number} — ${p.title}`"></option>
                                </template>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Label Panah (Opsional)</label>
                            <input type="text" x-model="newLinkLabel" placeholder="Misal: Menuju Area Pelaminan" class="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs">
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <label class="block text-[11px] text-slate-500">Yaw (°)</label>
                                <input type="number" step="0.5" x-model.number="pickedYaw" class="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs">
                            </div>
                            <div>
                                <label class="block text-[11px] text-slate-500">Pitch (°)</label>
                                <input type="number" step="0.5" x-model.number="pickedPitch" class="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs">
                            </div>
                        </div>
                        <button type="button" @click="saveNavigationLink()" class="w-full rounded-lg bg-amber-500 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 cursor-pointer">
                            + Pasang Panah Navigasi
                        </button>
                    </div>

                    <div>
                        <h4 class="text-xs font-bold text-slate-700 mb-2">Panah Aktif pada Foto Ini:</h4>
                        <div class="space-y-1.5 max-h-40 overflow-y-auto">
                            <template x-for="lnk in (linkModalPhoto?.links || [])" :key="lnk.id">
                                <div class="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs">
                                    <span class="truncate font-medium text-slate-800" x-text="`#${lnk.to_pin_number || '?'} ${lnk.label}`"></span>
                                    <button type="button" @click="deleteNavigationLink(lnk)" class="text-rose-600 font-semibold hover:underline cursor-pointer">Hapus</button>
                                </div>
                            </template>
                            <p x-show="!linkModalPhoto?.links?.length" class="text-xs text-slate-400">Belum ada panah navigasi.</p>
                        </div>
                    </div>
                </div>

                <button type="button" @click="closeLinkModal()" class="w-full rounded-xl border border-slate-300 py-2 text-xs font-bold text-slate-700 cursor-pointer">Selesai</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function adminFloorplanStudio(config) {
    return {
        activeTab: config.sourceType === 'builder' && !config.hasFloorplan ? 'builder' : 'upload',
        pins: config.pins || [],
        selectedPin: (config.pins && config.pins[0]) ? config.pins[0] : null,
        placingMode: false,
        photoPhase: 'sesudah',
        newAngleLabel: '',
        uploadingPhoto: false,
        savingBuilder: false,
        toast: '',

        // Pan & Zoom state
        zoom: 1,
        panX: 0,
        panY: 0,
        isPanning: false,
        panStartX: 0,
        panStartY: 0,
        draggingPin: null,
        dragMoved: false,

        // New Pin Modal
        newPinModal: false,
        pendingPin: { pin_number: 1, title: '', dimensions_note: '', description: '', pos_x: 50, pos_y: 50 },

        // Canvas Builder
        builder: null,
        iconLibrary: [],
        selectedBuilderLabel: null,

        // 360 Linker Modal
        linkModalPhoto: null,
        linkViewer: null,
        pickedYaw: 0,
        pickedPitch: -6,
        newLinkTargetPinId: '',
        newLinkLabel: '',

        init() {
            this.iconLibrary = window.Ruang360?.BUILDER_ICON_LIBRARY || [];
            if (this.activeTab === 'builder') {
                this.$nextTick(() => this.initBuilder());
            }
        },

        showToast(msg) {
            this.toast = msg;
            setTimeout(() => { if (this.toast === msg) this.toast = ''; }, 3200);
        },

        switchTab(tab) {
            this.activeTab = tab;
            if (tab === 'builder') {
                this.$nextTick(() => this.initBuilder());
            }
        },

        initBuilder() {
            if (this.builder) return;
            const container = document.getElementById('konva-builder-container');
            if (!container) return;
            this.builder = new window.Ruang360.FloorplanCanvasBuilder(container, {
                initialJson: config.canvasJson,
                onSelect: (group) => {
                    this.selectedBuilderLabel = group ? (group.getAttr('builderMeta')?.label ?? '') : null;
                },
            });
        },

        async saveBuilder() {
            if (!this.builder) return;
            this.savingBuilder = true;
            try {
                const { canvasJson, snapshotDataUrl } = this.builder.exportState();
                const res = await fetch(config.urls.saveBuilder, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': config.csrf,
                    },
                    body: JSON.stringify({ canvas_json: canvasJson, snapshot_data_url: snapshotDataUrl }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Gagal menyimpan kanvas.');
                this.showToast(data.message);
                window.location.reload();
            } catch (err) {
                alert(err.message);
            } finally {
                this.savingBuilder = false;
            }
        },

        resetPanZoom() {
            const vp = this.$refs.mapViewport;
            if (!vp) return;
            const fit = Math.min(1, (vp.clientWidth - 20) / 960);
            this.zoom = Number(fit.toFixed(2));
            this.panX = Math.max(8, (vp.clientWidth - 960 * this.zoom) / 2);
            this.panY = 12;
        },

        zoomBy(delta) {
            this.zoom = Math.max(0.4, Math.min(3, Number((this.zoom + delta).toFixed(2))));
        },

        onWheelZoom(e) {
            this.zoomBy(e.deltaY < 0 ? 0.12 : -0.12);
        },

        startPan(e) {
            if (this.placingMode || this.draggingPin) return;
            this.isPanning = true;
            this.dragMoved = false;
            this.panStartX = e.clientX - this.panX;
            this.panStartY = e.clientY - this.panY;
        },

        onPan(e) {
            if (this.draggingPin) {
                const rect = this.$refs.mapStage.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                this.draggingPin.pos_x = Number(x.toFixed(2));
                this.draggingPin.pos_y = Number(y.toFixed(2));
                this.dragMoved = true;
                return;
            }
            if (!this.isPanning) return;
            this.dragMoved = true;
            this.panX = e.clientX - this.panStartX;
            this.panY = e.clientY - this.panStartY;
        },

        async endPan() {
            if (this.draggingPin) {
                const pin = this.draggingPin;
                this.draggingPin = null;
                if (this.dragMoved) {
                    await this.persistPinPosition(pin);
                }
            }
            this.isPanning = false;
        },

        startDragPin(e, pin) {
            this.draggingPin = pin;
            this.selectedPin = pin;
            this.dragMoved = false;
        },

        async persistPinPosition(pin) {
            const res = await fetch(`${config.urls.updatePinBase}/${pin.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': config.csrf,
                },
                body: JSON.stringify({ pos_x: pin.pos_x, pos_y: pin.pos_y }),
            });
            if (res.ok) {
                this.showToast(`Posisi Pin #${pin.pin_number} diperbarui.`);
            }
        },

        handleMapClick(e) {
            if (!this.placingMode) return;
            const rect = this.$refs.mapStage.getBoundingClientRect();
            const posX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            const posY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
            const nextNum = this.pins.length ? Math.max(...this.pins.map(p => Number(p.pin_number))) + 1 : 1;

            this.pendingPin = {
                pin_number: nextNum,
                title: '',
                dimensions_note: '',
                description: '',
                pos_x: Number(posX.toFixed(2)),
                pos_y: Number(posY.toFixed(2)),
            };
            this.newPinModal = true;
            this.placingMode = false;
        },

        async confirmCreatePin() {
            if (!this.pendingPin.title.trim()) {
                alert('Nama area wajib diisi.');
                return;
            }
            const res = await fetch(config.urls.storePin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': config.csrf,
                },
                body: JSON.stringify(this.pendingPin),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Gagal menambah pin.');
                return;
            }
            this.pins.push(data.pin);
            this.pins.sort((a, b) => a.pin_number - b.pin_number);
            this.selectedPin = data.pin;
            this.newPinModal = false;
            this.showToast(data.message);
        },

        selectPin(pin) {
            this.selectedPin = pin;
        },

        async savePinDetails() {
            if (!this.selectedPin) return;
            const res = await fetch(`${config.urls.updatePinBase}/${this.selectedPin.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': config.csrf,
                },
                body: JSON.stringify({
                    pin_number: this.selectedPin.pin_number,
                    title: this.selectedPin.title,
                    dimensions_note: this.selectedPin.dimensions_note,
                    description: this.selectedPin.description,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                Object.assign(this.selectedPin, data.pin);
                this.pins.sort((a, b) => a.pin_number - b.pin_number);
                this.showToast(data.message);
            }
        },

        async deleteSelectedPin() {
            if (!this.selectedPin || !confirm(`Hapus Pin #${this.selectedPin.pin_number}?`)) return;
            const id = this.selectedPin.id;
            const res = await fetch(`${config.urls.updatePinBase}/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf },
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                this.pins = Array.isArray(data.pins) ? data.pins : this.pins.filter(p => p.id !== id);
                this.selectedPin = this.pins[0] || null;
                this.showToast(data.message || 'Pin berhasil dihapus.');
            }
        },

        countPhase(pin, phase) {
            return (pin.photos || []).filter(ph => ph.phase === phase).length;
        },

        filteredSelectedPhotos() {
            if (!this.selectedPin) return [];
            return (this.selectedPin.photos || []).filter(ph => ph.phase === this.photoPhase);
        },

        async uploadPinPhoto() {
            const input = this.$refs.adminPhotoInput;
            if (!input || !input.files.length) {
                alert('Pilih file foto panorama 360° terlebih dahulu.');
                return;
            }
            this.uploadingPhoto = true;
            try {
                const fd = new FormData();
                fd.append('phase', this.photoPhase);
                fd.append('angle_label', this.newAngleLabel);
                fd.append('photo', input.files[0]);

                const res = await fetch(`${config.urls.storePhotoBase}/${this.selectedPin.id}/photos`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf },
                    body: fd,
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Gagal mengunggah foto.');
                this.selectedPin.photos.push(data.photo);
                this.newAngleLabel = '';
                input.value = '';
                this.showToast(data.message);
            } catch (err) {
                alert(err.message);
            } finally {
                this.uploadingPhoto = false;
            }
        },

        async deletePhoto(photo) {
            if (!confirm('Hapus foto 360° ini?')) return;
            const res = await fetch(`${config.urls.destroyPhotoBase}/${photo.id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf },
            });
            if (res.ok) {
                this.selectedPin.photos = this.selectedPin.photos.filter(p => p.id !== photo.id);
                this.showToast('Foto dihapus.');
            }
        },

        openLinkModal(photo) {
            this.linkModalPhoto = photo;
            this.pickedYaw = 0;
            this.pickedPitch = -6;
            this.newLinkTargetPinId = '';
            this.newLinkLabel = '';
            this.$nextTick(() => {
                if (this.linkViewer) this.linkViewer.destroy();
                this.linkViewer = new window.Ruang360.Panorama360Viewer(this.$refs.linkViewerEl, {
                    onSpherePick: ({ yaw, pitch }) => {
                        this.pickedYaw = yaw;
                        this.pickedPitch = pitch;
                        this.showToast(`Koordinat dipilih: Yaw ${yaw}°, Pitch ${pitch}°`);
                    },
                });
                this.linkViewer.setPickMode(true);
                this.linkViewer.setPhoto({
                    fullUrl: photo.image_url,
                    thumbUrl: photo.thumb_url,
                    initialYaw: photo.initial_yaw || 0,
                    links: photo.links || [],
                });
            });
        },

        closeLinkModal() {
            if (this.linkViewer) {
                this.linkViewer.destroy();
                this.linkViewer = null;
            }
            this.linkModalPhoto = null;
        },

        async saveNavigationLink() {
            if (!this.newLinkTargetPinId) {
                alert('Pilih Pin Tujuan terlebih dahulu.');
                return;
            }
            const res = await fetch(`${config.urls.storeLinkBase}/${this.linkModalPhoto.id}/links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': config.csrf,
                },
                body: JSON.stringify({
                    to_pin_id: Number(this.newLinkTargetPinId),
                    yaw: this.pickedYaw,
                    pitch: this.pickedPitch,
                    label: this.newLinkLabel,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Gagal menambah panah navigasi.');
                return;
            }
            this.linkModalPhoto.links.push(data.link);
            this.linkViewer?.setLinks(this.linkModalPhoto.links);
            this.newLinkLabel = '';
            this.showToast(data.message);
        },

        async deleteNavigationLink(lnk) {
            const res = await fetch(`${config.urls.destroyLinkBase}/${lnk.id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf },
            });
            if (res.ok) {
                this.linkModalPhoto.links = this.linkModalPhoto.links.filter(l => l.id !== lnk.id);
                this.linkViewer?.setLinks(this.linkModalPhoto.links);
                this.showToast('Panah navigasi dihapus.');
            }
        },
    };
}
</script>
@endpush
