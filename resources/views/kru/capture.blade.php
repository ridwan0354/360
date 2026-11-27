@extends('layouts.app')

@section('title', "Pin #{$pin->pin_number} {$pin->title} — Kru Ruang360°")

@section('content')
<div class="mx-auto max-w-4xl px-4 sm:px-6 py-5 space-y-5"
     x-data="kruCaptureStudio({
         initialPhase: '{{ $initialPhase }}',
         sebelumPhotos: @js($sebelumPhotos->map(fn($p) => ['id'=>$p->id,'phase'=>$p->phase,'angle_label'=>$p->angle_label,'image_url'=>$p->image_url,'thumb_url'=>$p->thumb_url])),
         sesudahPhotos: @js($sesudahPhotos->map(fn($p) => ['id'=>$p->id,'phase'=>$p->phase,'angle_label'=>$p->angle_label,'image_url'=>$p->image_url,'thumb_url'=>$p->thumb_url])),
         storeUrl: '{{ route('kru.pins.photos.store', $pin) }}',
         stitchUrl: '{{ route('kru.pins.stitch', $pin) }}',
         deleteBaseUrl: '{{ url('/kru/photos') }}',
         csrf: '{{ csrf_token() }}'
     })">

    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <a href="{{ route('kru.events.show', $event) }}" class="text-xs font-semibold text-slate-500 hover:text-slate-900">← Kembali ke Denah {{ $event->title }}</a>
            <div class="flex items-center gap-2.5 mt-1">
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-extrabold text-slate-950">{{ $pin->pin_number }}</span>
                <div>
                    <h1 class="text-xl font-bold text-slate-900">{{ $pin->title }}</h1>
                    @if($pin->dimensions_note)
                        <p class="text-xs text-slate-500">{{ $pin->dimensions_note }}</p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    {{-- Phase Switcher: Sebelum vs Sesudah --}}
    <div class="grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/80 p-1.5">
        <button type="button" @click="phase = 'sebelum'"
                :class="phase === 'sebelum' ? 'bg-slate-900 text-white shadow' : 'text-slate-700 hover:bg-white/60'"
                class="rounded-xl py-2.5 text-sm font-bold transition cursor-pointer">
            Fase Sebelum (<span x-text="sebelumPhotos.length"></span>)
        </button>
        <button type="button" @click="phase = 'sesudah'"
                :class="phase === 'sesudah' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-700 hover:bg-white/60'"
                class="rounded-xl py-2.5 text-sm font-bold transition cursor-pointer">
            Fase Sesudah (<span x-text="sesudahPhotos.length"></span>)
        </button>
    </div>

    {{-- Capture Options --}}
    <div class="grid md:grid-cols-2 gap-4">
        {{-- Option A: Guided Browser 360 Camera --}}
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
                <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">Kamera Pemandu WebRTC</span>
                <span class="text-[11px] font-semibold text-slate-500">Auto-Align 360°</span>
            </div>
            <h2 class="text-base font-bold text-slate-900">Ambil Foto 360° Langsung</h2>
            <p class="text-xs text-slate-600">Berdiri di satu titik, pegang HP tegak sejajar garis horizontal, lalu putar perlahan 360° mengikuti bulatan kuning. Sistem otomatis menyelaraskan sambungan foto.</p>

            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Label Sudut Pandang (Opsional)</label>
                <input type="text" x-model="angleLabel" placeholder="Misal: Tampak Depan / Tengah Ruangan"
                       class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none">
            </div>

            <div x-show="!isSecure" x-cloak class="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950 space-y-2">
                <p class="font-semibold">Akses kamera browser HP membutuhkan koneksi HTTPS.</p>
                <a :href="httpsSwitchUrl" class="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 font-bold text-slate-950 hover:bg-amber-400">
                    🔒 Buka Halaman Ini via HTTPS (Port 8443) →
                </a>
            </div>

            <button type="button" @click="openScanner()"
                    class="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer">
                Buka Kamera Pemandu 360°
            </button>
        </div>

        {{-- Option B: Fallback File Upload + Native Phone Camera --}}
        <form method="POST" action="{{ route('kru.pins.photos.store', $pin) }}" enctype="multipart/form-data"
              class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            @csrf
            <input type="hidden" name="phase" :value="phase">
            <div class="flex items-center justify-between">
                <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">Kamera HP / Galeri</span>
                <span class="text-[11px] text-slate-500">Maks 15 MB</span>
            </div>
            <h2 class="text-base font-bold text-slate-900">Foto via Kamera Bawaan / Galeri HP</h2>
            <p class="text-xs text-slate-600">Ambil langsung dengan aplikasi kamera bawaan ponsel (mode Panorama) atau pilih foto dari galeri.</p>

            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Label Sudut Pandang</label>
                <input type="text" name="angle_label" x-model="angleLabel" placeholder="Misal: Sudut Samping Kiri"
                       class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
            </div>

            <div class="space-y-2">
                <input type="file" name="photo" accept=".jpg,.jpeg,.png,.webp,image/*" x-ref="galleryFileInput" required
                       @change="onNativeFilePicked($event.target.files[0])"
                       class="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-700">
                <div class="flex flex-wrap items-center gap-2">
                    <label class="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs font-bold text-amber-950 cursor-pointer hover:bg-amber-100">
                        <span>📷 Foto Langsung dengan Kamera HP</span>
                        <input type="file" accept="image/*" capture="environment" class="hidden"
                               @change="if ($event.target.files.length) { const dt = new DataTransfer(); dt.items.add($event.target.files[0]); $refs.galleryFileInput.files = dt.files; onNativeFilePicked($event.target.files[0]); }">
                    </label>
                    <span x-show="pickedFileName" x-cloak class="text-xs font-semibold text-emerald-700 truncate max-w-[200px]" x-text="'✓ ' + pickedFileName"></span>
                </div>
                <img x-show="pickedPreviewUrl" x-cloak :src="pickedPreviewUrl" alt="Pratinjau foto" class="h-28 w-full rounded-xl object-cover border border-slate-200">
            </div>

            <button type="submit"
                    :class="pickedFileName ? 'bg-amber-500 text-slate-950 border-amber-500' : 'border-slate-900 bg-white text-slate-900 hover:bg-slate-900 hover:text-white'"
                    class="w-full rounded-xl border py-2.5 text-sm font-bold transition cursor-pointer">
                Unggah &amp; Kompres Otomatis
            </button>
        </form>
    </div>

    {{-- Existing Photos in Selected Phase --}}
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-900">
                Foto Tersimpan — Fase <span class="capitalize" x-text="phase"></span>
            </h2>
            <span class="text-xs text-slate-500" x-text="currentPhotos().length + ' sudut'"></span>
        </div>

        <div class="grid sm:grid-cols-2 gap-4" x-show="currentPhotos().length > 0">
            <template x-for="ph in currentPhotos()" :key="ph.id">
                <div class="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                    <img :src="ph.thumb_url" alt="" class="w-full h-36 object-cover bg-slate-200">
                    <div class="p-3 flex items-center justify-between gap-2 bg-white">
                        <span class="text-xs font-bold text-slate-900 truncate" x-text="ph.angle_label || 'Tampak Utama'"></span>
                        <div class="flex items-center gap-2 shrink-0">
                            <button type="button" @click="openPreview(ph.image_url, ph.thumb_url)"
                                    class="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white cursor-pointer">Pratinjau 360°</button>
                            <button type="button" @click="removePhoto(ph)"
                                    class="rounded-lg border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-600 cursor-pointer">Hapus</button>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <p x-show="currentPhotos().length === 0" class="py-6 text-center text-sm text-slate-400">
            Belum ada foto untuk fase <strong x-text="phase"></strong> di titik pin ini.
        </p>
    </div>

    {{-- Guided 360 Camera Scanner Modal --}}
    <div x-show="scannerOpen" x-cloak class="fixed inset-0 z-50 bg-slate-950 flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 bg-slate-900/90 text-white border-b border-white/10">
            <div>
                <h3 class="text-sm font-bold">Pemindaian 360° — Pin #{{ $pin->pin_number }} (<span class="uppercase text-amber-400" x-text="phase"></span>)</h3>
                <p class="text-[11px] text-slate-300" x-text="scannerStatus"></p>
            </div>
            <button type="button" @click="closeScanner()" class="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold cursor-pointer">Tutup</button>
        </div>

        <div class="relative flex-1 overflow-hidden bg-black">
            <video x-ref="scannerVideo" class="absolute inset-0 h-full w-full object-cover" autoplay playsinline muted></video>
            <canvas x-ref="scannerCanvas" class="absolute inset-0 h-full w-full touch-none"></canvas>

            <div class="absolute top-3 right-3 flex items-center gap-1.5">
                <span class="rounded-full px-2.5 py-1 text-[10px] font-bold"
                      :class="capabilities.hasLiveCamera ? 'bg-emerald-500/90 text-slate-950' : 'bg-slate-800/85 text-slate-200'"
                      x-text="capabilities.hasLiveCamera ? '● Kamera Live' : 'Simulasi'"></span>
                <button type="button" x-show="!capabilities.hasGyro" @click="requestGyroManual()"
                        class="rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-bold text-slate-950 cursor-pointer">
                    Aktifkan Sensor Gerak
                </button>
            </div>

            <div class="absolute bottom-5 inset-x-4 flex flex-wrap items-center justify-between gap-2.5">
                <div class="rounded-xl bg-slate-950/85 px-3.5 py-2 text-[11px] text-white border border-white/15 space-y-0.5">
                    <div>
                        Tengah: <strong class="text-amber-400" x-text="`${scanProgress.horizonCaptured ?? 0}/${scanProgress.horizonTotal ?? 14}`"></strong>
                        <span class="mx-1 text-slate-500">·</span>
                        Atas: <strong class="text-sky-300" x-text="`${scanProgress.upperCaptured ?? 0}/6`"></strong>
                        <span class="mx-1 text-slate-500">·</span>
                        Bawah: <strong class="text-purple-300" x-text="`${scanProgress.lowerCaptured ?? 0}/6`"></strong>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <button type="button" @click="scanner?.captureCurrentManual()"
                            class="rounded-xl bg-white/90 px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow cursor-pointer">
                        + Tangkap Titik Ini
                    </button>
                    <button type="button"
                            x-show="(scanProgress.horizonFramesCount || 0) >= 3"
                            @click="finishScannerManual()"
                            class="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:bg-emerald-400 cursor-pointer">
                        ✓ Selesai &amp; Gabung 360°
                    </button>
                    <button type="button"
                            x-show="!capabilities.hasLiveCamera"
                            @click="runAutoSweep()"
                            class="rounded-xl bg-amber-500 px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow cursor-pointer">
                        Bidik Otomatis (Demo)
                    </button>
                </div>
            </div>
        </div>
    </div>

    {{-- 360° Interactive Preview & Save Modal --}}
    <div x-show="previewOpen" x-cloak class="fixed inset-0 z-50 bg-slate-950/95 flex flex-col">
        <div class="flex items-center justify-between gap-2 px-4 py-3 bg-slate-900 text-white border-b border-white/10">
            <h3 class="text-sm font-bold truncate">Pratinjau Hasil Panorama 360°</h3>
            <div class="flex items-center gap-2 shrink-0">
                <button type="button" @click="togglePreviewGyro()"
                        :class="previewGyro ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-white'"
                        class="rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer">
                    <span x-text="previewGyro ? '◎ Giroskop Aktif' : '◎ Gerakkan HP'"></span>
                </button>
                <button type="button" @click="closePreview()" class="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold cursor-pointer">Tutup</button>
            </div>
        </div>
        <div class="flex-1 relative">
            <div x-ref="preview360El" class="w-full h-full"></div>
        </div>
        <div x-show="stitchedDataUrl || stitchedPreviewToken" class="bg-slate-900 border-t border-white/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs text-slate-300">
                <span x-show="stitchEngine" class="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 mr-1.5" x-text="'Engine: ' + stitchEngine"></span>
                Gerakkan HP atau geser layar untuk memeriksa seluruh sudut sebelum disimpan.
            </p>
            <div class="flex items-center gap-2">
                <button type="button" @click="stitchedDataUrl = null; stitchedPreviewToken = null; closePreview(); openScanner()" class="rounded-xl border border-white/20 px-4 py-2 text-xs font-bold text-white cursor-pointer">Ulangi Pemotretan</button>
                <button type="button" @click="saveStitchedPanorama()" :disabled="savingStitched"
                        class="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 cursor-pointer">
                    <span x-text="savingStitched ? 'Menyimpan...' : 'Simpan ke Titik Pin'"></span>
                </button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function kruCaptureStudio(cfg) {
    return {
        phase: cfg.initialPhase || 'sebelum',
        sebelumPhotos: cfg.sebelumPhotos || [],
        sesudahPhotos: cfg.sesudahPhotos || [],
        angleLabel: '',
        scannerOpen: false,
        scannerStatus: 'Menyiapkan kamera...',
        scanProgress: { captured: 0, total: 26, horizonCaptured: 0, horizonTotal: 14, upperCaptured: 0, lowerCaptured: 0, framesCount: 0, horizonFramesCount: 0 },
        capabilities: { hasLiveCamera: false, hasGyro: false },
        isSecure: window.isSecureContext,
        httpsSwitchUrl: `https://${window.location.hostname}:8443${window.location.pathname}${window.location.search}`,
        pickedFileName: '',
        pickedPreviewUrl: '',
        scanner: null,
        sweepTimer: null,

        previewOpen: false,
        previewViewer: null,
        previewGyro: false,
        stitchedDataUrl: null,
        stitchedPreviewToken: null,
        stitchEngine: '',
        savingStitched: false,

        currentPhotos() {
            return this.phase === 'sebelum' ? this.sebelumPhotos : this.sesudahPhotos;
        },

        onNativeFilePicked(file) {
            if (!file) return;
            this.pickedFileName = file.name;
            this.pickedPreviewUrl = URL.createObjectURL(file);
        },

        async openScanner() {
            let gyroGranted = null;
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    gyroGranted = (await DeviceOrientationEvent.requestPermission()) === 'granted';
                } catch {
                    gyroGranted = false;
                }
            }
            this.scannerOpen = true;
            this.scanProgress = { captured: 0, total: 26, horizonCaptured: 0, horizonTotal: 14, upperCaptured: 0, lowerCaptured: 0, framesCount: 0, horizonFramesCount: 0 };
            this.$nextTick(() => {
                this.scanner = new window.Ruang360.GuidedCamera360({
                    videoEl: this.$refs.scannerVideo,
                    overlayCanvas: this.$refs.scannerCanvas,
                    serverStitchUrl: cfg.stitchUrl,
                    csrfToken: cfg.csrf,
                    onStatus: (s) => { this.scannerStatus = s; },
                    onProgress: (p) => { this.scanProgress = p; },
                    onCapabilities: (c) => { this.capabilities = c; },
                    onComplete: (result) => {
                        this.stopSweep();
                        this.closeScanner();
                        if (typeof result === 'string') {
                            this.stitchedDataUrl = result;
                            this.stitchedPreviewToken = null;
                            this.stitchEngine = 'browser';
                            this.openPreview(result, null);
                        } else {
                            this.stitchedDataUrl = result.dataUrl || null;
                            this.stitchedPreviewToken = result.previewToken || null;
                            this.stitchEngine = result.engine || 'opencv_3d';
                            this.openPreview(result.previewUrl || result.dataUrl, null);
                        }
                    },
                });
                this.scanner.start({ gyroGranted });
            });
        },

        finishScannerManual() {
            try {
                this.scanner?.finishNow();
            } catch (err) {
                alert(err.message);
            }
        },

        async requestGyroManual() {
            try {
                await this.scanner?.enableGyroFromGesture();
            } catch (err) {
                alert(err.message);
            }
        },

        runAutoSweep() {
            this.stopSweep();
            this.sweepTimer = setInterval(() => {
                if (!this.scanner) return this.stopSweep();
                this.scanner.autoSweepDemo();
            }, 140);
        },

        stopSweep() {
            if (this.sweepTimer) {
                clearInterval(this.sweepTimer);
                this.sweepTimer = null;
            }
        },

        closeScanner() {
            this.stopSweep();
            if (this.scanner) {
                this.scanner.stop();
                this.scanner = null;
            }
            this.scannerOpen = false;
        },

        openPreview(fullUrl, thumbUrl) {
            this.previewOpen = true;
            this.previewGyro = false;
            this.$nextTick(() => {
                if (this.previewViewer) this.previewViewer.destroy();
                this.previewViewer = new window.Ruang360.Panorama360Viewer(this.$refs.preview360El, {});
                this.previewViewer.setPhoto({ fullUrl, thumbUrl });

                // Automatically activate phone gyroscope on devices where permission doesn't require a fresh prompt (Android & already-granted iOS)
                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                if (isMobile && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
                    this.previewViewer.setGyroscope(true).then((ok) => { this.previewGyro = ok; }).catch(() => {});
                }
            });
        },

        async togglePreviewGyro() {
            if (!this.previewViewer) return;
            try {
                this.previewGyro = await this.previewViewer.setGyroscope(!this.previewGyro);
            } catch (err) {
                alert(err.message);
            }
        },

        closePreview() {
            if (this.previewViewer) {
                this.previewViewer.destroy();
                this.previewViewer = null;
            }
            this.previewGyro = false;
            this.previewOpen = false;
            this.stitchedDataUrl = null;
            this.stitchedPreviewToken = null;
            this.stitchEngine = '';
        },

        async saveStitchedPanorama() {
            if (!this.stitchedDataUrl && !this.stitchedPreviewToken) return;
            this.savingStitched = true;
            try {
                const payload = {
                    phase: this.phase,
                    angle_label: this.angleLabel,
                };
                if (this.stitchedPreviewToken) {
                    payload.preview_token = this.stitchedPreviewToken;
                } else {
                    payload.panorama_data_url = this.stitchedDataUrl;
                }

                const res = await fetch(cfg.storeUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': cfg.csrf,
                    },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Gagal menyimpan foto 360°.');
                if (this.phase === 'sebelum') {
                    this.sebelumPhotos.push(data.photo);
                } else {
                    this.sesudahPhotos.push(data.photo);
                }
                this.angleLabel = '';
                this.closePreview();
            } catch (err) {
                alert(err.message);
            } finally {
                this.savingStitched = false;
            }
        },

        async removePhoto(ph) {
            if (!confirm('Hapus foto 360° ini?')) return;
            const res = await fetch(`${cfg.deleteBaseUrl}/${ph.id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'X-CSRF-TOKEN': cfg.csrf },
            });
            if (res.ok) {
                if (this.phase === 'sebelum') {
                    this.sebelumPhotos = this.sebelumPhotos.filter(x => x.id !== ph.id);
                } else {
                    this.sesudahPhotos = this.sesudahPhotos.filter(x => x.id !== ph.id);
                }
            }
        },
    };
}
</script>
@endpush
