<!DOCTYPE html>
<html lang="id" class="h-full bg-slate-950">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{{ $event->title }} — Virtual Tour 360° VR</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full overflow-hidden text-white antialiased select-none"
      x-data="publicTourApp({
          payload: @js($tourPayload),
          initialPinId: @js($initialPinId),
          initialMode: @js($initialMode)
      })"
      x-init="init()">

    {{-- Background Audio Element --}}
    @if($event->bg_music_url)
        <audio x-ref="bgAudio" loop preload="none">
            <source src="{{ $event->bg_music_url }}">
        </audio>
    @endif

    {{-- MODE 1: OVERVIEW DENAH INTERAKTIF --}}
    <div x-show="mode === 'overview'" class="h-full flex flex-col bg-slate-950 overflow-y-auto">
        {{-- Top Event Header --}}
        <header class="border-b border-white/10 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 py-3.5 sticky top-0 z-30">
            <div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    @if($event->logo_url)
                        <img src="{{ $event->logo_url }}" alt="Logo" class="h-10 w-10 rounded-xl object-contain bg-white p-1 shrink-0">
                    @else
                        <div class="h-10 w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-sm shrink-0">
                            360°
                        </div>
                    @endif
                    <div class="min-w-0">
                        <div class="text-[11px] font-semibold uppercase tracking-wider text-amber-400 truncate">
                            {{ $event->organizer_name ?: 'Virtual Tour 360°' }}
                            @if($event->event_date) · {{ $event->event_date->translatedFormat('d F Y') }} @endif
                        </div>
                        <h1 class="text-base sm:text-lg font-bold text-white truncate">{{ $event->title }}</h1>
                        <p class="text-xs text-slate-400 truncate">{{ $event->venue_name }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    @if($event->bg_music_url)
                        <button type="button" @click="toggleMusic()"
                                :class="musicPlaying ? 'bg-amber-500 text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'"
                                class="rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer">
                            <span x-text="musicPlaying ? '♫ Musik Aktif' : '♫ Putar Musik'"></span>
                        </button>
                    @endif
                    <button type="button" @click="enterVrForPin(currentPin?.id || payload.pins[0]?.id)"
                            x-show="payload.pins.length > 0"
                            class="rounded-xl bg-amber-500 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition cursor-pointer">
                        Mulai Tur 360° →
                    </button>
                </div>
            </div>
        </header>

        {{-- Interactive Floorplan + Synchronized Legend --}}
        <main class="mx-auto max-w-7xl w-full flex-1 px-4 sm:px-6 py-5 grid lg:grid-cols-12 gap-5 items-start">
            <div class="lg:col-span-8 space-y-3">
                <div class="flex items-center justify-between text-xs text-slate-300">
                    <span>Ketuk titik pin bernomor di atas denah untuk masuk ke tampilan panorama $360^\circ$.</span>
                    <div class="flex items-center gap-1">
                        <button type="button" @click="ovZoom = Math.min(2.6, +(ovZoom + 0.2).toFixed(2))" class="rounded-lg bg-white/10 px-2.5 py-1 font-bold hover:bg-white/20 cursor-pointer">+</button>
                        <button type="button" @click="ovZoom = Math.max(0.6, +(ovZoom - 0.2).toFixed(2))" class="rounded-lg bg-white/10 px-2.5 py-1 font-bold hover:bg-white/20 cursor-pointer">−</button>
                        <button type="button" @click="resetOverviewPan()" class="rounded-lg bg-white/10 px-2.5 py-1 font-semibold hover:bg-white/20 cursor-pointer">Reset</button>
                    </div>
                </div>

                <div class="relative h-[56vh] sm:h-[68vh] w-full overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl touch-none"
                     x-ref="ovViewport"
                     @wheel.prevent="ovZoom = Math.max(0.6, Math.min(2.6, +(ovZoom + ($event.deltaY < 0 ? 0.12 : -0.12)).toFixed(2)))"
                     @pointerdown="startOvPan($event)"
                     @pointermove="onOvPan($event)"
                     @pointerup="ovPanning = false">
                    <template x-if="payload.floorplan && payload.floorplan.image_url">
                        <div class="absolute origin-top-left"
                             :style="`transform: translate(${ovPanX}px, ${ovPanY}px) scale(${ovZoom});`">
                            <img :src="payload.floorplan.image_url" alt="Denah Acara"
                                 class="block max-w-none w-[920px] h-auto pointer-events-none select-none"
                                 @load="resetOverviewPan()">

                            <template x-for="pin in payload.pins" :key="'ov-' + pin.id">
                                <button type="button"
                                        @click.stop="enterVrForPin(pin.id)"
                                        :style="`left: ${pin.pos_x}%; top: ${pin.pos_y}%;`"
                                        class="pin-pulse absolute -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-amber-500 text-xs font-extrabold text-slate-950 shadow-lg ring-2 ring-white hover:scale-125 transition cursor-pointer"
                                        :title="`#${pin.pin_number} — ${pin.title}`">
                                    <span x-text="pin.pin_number"></span>
                                </button>
                            </template>
                        </div>
                    </template>
                </div>
            </div>

            {{-- Synchronized Area Legend --}}
            <aside class="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-900/90 p-4 space-y-3 max-h-[74vh] flex flex-col">
                <div class="flex items-center justify-between">
                    <h2 class="text-sm font-bold text-white">Keterangan Area &amp; Titik Pin</h2>
                    <span class="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300" x-text="`${payload.pins.length} Lokasi`"></span>
                </div>

                <input type="search" x-model="legendSearch" placeholder="Cari area (misal: Pelaminan, VIP)..."
                       class="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none">

                <div class="flex-1 overflow-y-auto space-y-2 pr-1">
                    <template x-for="pin in filteredLegendPins()" :key="'leg-' + pin.id">
                        <button type="button" @click="enterVrForPin(pin.id)"
                                class="w-full text-left rounded-xl border border-white/10 bg-white/5 p-3 hover:border-amber-400/60 hover:bg-amber-500/10 transition flex items-start gap-3 cursor-pointer">
                            <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-extrabold text-slate-950" x-text="pin.pin_number"></span>
                            <div class="min-w-0 flex-1">
                                <div class="text-sm font-bold text-white" x-text="pin.title"></div>
                                <div x-show="pin.dimensions_note" class="text-[11px] text-amber-300/90 mt-0.5" x-text="pin.dimensions_note"></div>
                                <div class="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400">
                                    <span x-show="pin.sebelum.length" class="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">Sebelum (<span x-text="pin.sebelum.length"></span>)</span>
                                    <span x-show="pin.sesudah.length" class="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">Sesudah (<span x-text="pin.sesudah.length"></span>)</span>
                                </div>
                            </div>
                        </button>
                    </template>
                </div>
            </aside>
        </main>
    </div>

    {{-- MODE 2: PENAMPIL VIRTUAL TOUR 360° & VR --}}
    <div x-show="mode === 'vr'" x-cloak class="relative h-full w-full bg-black overflow-hidden" x-ref="vrRoot">
        {{-- WebGL 360° Canvas --}}
        <div x-ref="viewerEl" class="absolute inset-0 w-full h-full"></div>

        {{-- Progressive Loading Pill --}}
        <div x-show="loadingFull" x-cloak
             class="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 z-30 rounded-full glass-hud px-3.5 py-1 text-[11px] font-medium text-amber-200">
            Memuat detail resolusi penuh 360°...
        </div>

        {{-- iOS Direct-Link Gyro Permission Prompt (only shown if opened straight from QR without tapping Denah) --}}
        <button type="button"
                x-show="gyroNeedsTap && !gyroEnabled"
                x-cloak
                @click="toggleGyro(true)"
                class="pointer-events-auto absolute top-28 left-1/2 -translate-x-1/2 z-30 rounded-full bg-emerald-500/95 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-xl ring-2 ring-white/40 cursor-pointer animate-pulse">
            ◎ Ketuk untuk Aktifkan Giroskop
        </button>

        {{-- VR Mode Exit Bar (visible only in Stereoscopic Split-Screen VR) --}}
        <div x-show="vrMode" x-cloak class="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
            <button type="button" @click="toggleVrMode()"
                    class="rounded-full bg-rose-600/90 px-4 py-1.5 text-xs font-bold text-white shadow-xl ring-2 ring-white/40 cursor-pointer">
                ✕ Keluar Mode Kacamata VR
            </button>
        </div>

        {{-- Standard HUD (hidden in Split-Screen VR for clean dual-eye immersion) --}}
        <div x-show="!vrMode" class="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-3 sm:p-5">
            {{-- Top Bar --}}
            <div class="flex items-start justify-between gap-3">
                {{-- Top-Left: Back to Denah + Current Area Title --}}
                <div class="pointer-events-auto flex items-center gap-2.5 max-w-[65%] sm:max-w-md">
                    <button type="button" @click="exitToOverview()"
                            class="glass-hud rounded-xl px-3 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition shrink-0 cursor-pointer">
                        ← Denah
                    </button>
                    <div class="glass-hud rounded-xl px-3.5 py-2 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[11px] font-extrabold text-slate-950" x-text="currentPin?.pin_number"></span>
                            <span class="text-xs sm:text-sm font-bold text-white truncate" x-text="currentPin?.title || 'Area'"></span>
                        </div>
                        <p class="text-[11px] text-slate-300 truncate mt-0.5" x-text="payload.event.title"></p>
                    </div>
                </div>

                {{-- Top-Right: Interactive Mini-Map with Live FOV Cone --}}
                <div x-show="payload.floorplan && payload.floorplan.image_url"
                     class="pointer-events-auto glass-hud rounded-2xl overflow-hidden shadow-2xl transition-all duration-200"
                     :class="miniMapExpanded ? 'w-72 sm:w-[420px]' : 'w-36 sm:w-52'">
                    <div class="flex items-center justify-between px-2.5 py-1.5 border-b border-white/10 text-[11px]">
                        <span class="font-bold text-amber-300">Denah Mini</span>
                        <button type="button" @click="miniMapExpanded = !miniMapExpanded"
                                class="rounded px-1.5 py-0.5 bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                                x-text="miniMapExpanded ? 'Kecilkan' : 'Perbesar'"></button>
                    </div>

                    <div class="relative bg-white overflow-hidden">
                        <img :src="payload.floorplan?.image_url" alt="Mini Map" class="w-full h-auto block select-none pointer-events-none">

                        {{-- Rotating Field of View Radar Cone around Active Pin --}}
                        <template x-if="currentPin">
                            <div :style="`left: ${currentPin.pos_x}%; top: ${currentPin.pos_y}%; transform: translate(-50%, -50%) rotate(${viewYaw - 90}deg);`"
                                 class="pointer-events-none absolute w-14 h-14 z-10">
                                <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
                                    <path d="M 50 50 L 24 8 A 48 48 0 0 1 76 8 Z" fill="rgba(245, 158, 11, 0.42)" stroke="rgba(245, 158, 11, 0.9)" stroke-width="2"/>
                                </svg>
                            </div>
                        </template>

                        {{-- Clickable Pins on Mini-Map --}}
                        <template x-for="pin in payload.pins" :key="'mm-' + pin.id">
                            <button type="button"
                                    @click="selectPin(pin.id)"
                                    :style="`left: ${pin.pos_x}%; top: ${pin.pos_y}%;`"
                                    :class="[
                                        currentPin && currentPin.id === pin.id ? 'bg-amber-500 text-slate-950 scale-125 ring-2 ring-slate-950 z-20' : 'bg-slate-900/85 text-white ring-1 ring-white z-10 hover:scale-110',
                                        miniMapExpanded ? 'h-5 w-5 text-[10px]' : 'h-4 w-4 text-[9px]'
                                    ]"
                                    class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-bold shadow transition cursor-pointer"
                                    :title="`#${pin.pin_number} ${pin.title}`">
                                <span x-text="pin.pin_number"></span>
                            </button>
                        </template>
                    </div>
                </div>
            </div>

            {{-- Floating Area Information Card Drawer --}}
            <div x-show="infoOpen && currentPin" x-cloak
                 class="pointer-events-auto self-start max-w-sm glass-hud rounded-2xl p-4 space-y-2.5 shadow-2xl my-auto">
                <div class="flex items-start justify-between gap-2">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400">Pin #<span x-text="currentPin?.pin_number"></span> · Informasi Area</span>
                        <h3 class="text-base font-bold text-white" x-text="currentPin?.title"></h3>
                    </div>
                    <button type="button" @click="infoOpen = false" class="text-slate-400 hover:text-white cursor-pointer">✕</button>
                </div>
                <p x-show="currentPin?.dimensions_note" class="rounded-lg bg-amber-500/15 border border-amber-400/25 px-2.5 py-1.5 text-xs font-semibold text-amber-200" x-text="currentPin?.dimensions_note"></p>
                <p class="text-xs text-slate-200 leading-relaxed" x-text="currentPin?.description || 'Area dekorasi acara.'"></p>
                <div class="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                    <button type="button" @click="stepPin(-1)" class="rounded-lg bg-white/10 px-3 py-1.5 font-semibold hover:bg-white/20 cursor-pointer">← Area Sebelumnya</button>
                    <button type="button" @click="stepPin(1)" class="rounded-lg bg-amber-500 px-3 py-1.5 font-bold text-slate-950 hover:bg-amber-400 cursor-pointer">Area Berikutnya →</button>
                </div>
            </div>

            {{-- Bottom Controls: Multi-Angle Thumbnails + Before/After Switcher + Action Pills --}}
            <div class="flex flex-col items-center gap-2.5">
                {{-- Multi-Angle Switcher (only shown if >1 angle in active phase) --}}
                <div x-show="currentPhasePhotos().length > 1" x-cloak
                     class="pointer-events-auto glass-hud rounded-2xl p-1.5 flex items-center gap-1.5 max-w-full overflow-x-auto">
                    <template x-for="(ph, idx) in currentPhasePhotos()" :key="'ang-' + ph.id">
                        <button type="button" @click="selectAngle(idx)"
                                :class="currentAngleIndex === idx ? 'ring-2 ring-amber-400 bg-amber-500/20' : 'opacity-75 hover:opacity-100'"
                                class="flex items-center gap-2 rounded-xl p-1 pr-2.5 transition shrink-0 cursor-pointer">
                            <img :src="ph.thumb_url" alt="" class="h-9 w-14 rounded-lg object-cover">
                            <span class="text-[11px] font-semibold text-white whitespace-nowrap" x-text="ph.angle_label"></span>
                        </button>
                    </template>
                </div>

                {{-- Main Floating Action Dock --}}
                <div class="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
                    {{-- Sakelar Instan Sebelum & Sesudah --}}
                    <div class="glass-hud rounded-full p-1 flex items-center shadow-xl">
                        <button type="button"
                                @click="switchPhase('sebelum')"
                                :disabled="!hasPhase('sebelum')"
                                :class="phase === 'sebelum' ? 'bg-white text-slate-950 font-extrabold shadow' : 'text-slate-200 hover:text-white disabled:opacity-35'"
                                class="rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer">
                            Sebelum
                        </button>
                        <button type="button"
                                @click="switchPhase('sesudah')"
                                :disabled="!hasPhase('sesudah')"
                                :class="phase === 'sesudah' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'text-slate-200 hover:text-white disabled:opacity-35'"
                                class="rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer">
                            Sesudah
                        </button>
                    </div>

                    {{-- Info Area Button --}}
                    <button type="button" @click="infoOpen = !infoOpen"
                            :class="infoOpen ? 'bg-amber-500 text-slate-950' : 'glass-hud text-white hover:bg-white/15'"
                            class="rounded-full px-3.5 py-2 text-xs font-bold shadow-lg transition cursor-pointer">
                        ⓘ Info Area
                    </button>

                    {{-- Gyroscope Toggle --}}
                    <button type="button" @click="toggleGyro()"
                            :class="gyroEnabled ? 'bg-emerald-500 text-slate-950' : 'glass-hud text-white hover:bg-white/15'"
                            class="rounded-full px-3.5 py-2 text-xs font-bold shadow-lg transition cursor-pointer">
                        <span x-text="gyroEnabled ? '◎ Giroskop Aktif' : '◎ Giroskop'"></span>
                    </button>

                    {{-- Music Toggle --}}
                    @if($event->bg_music_url)
                        <button type="button" @click="toggleMusic()"
                                :class="musicPlaying ? 'bg-amber-500 text-slate-950' : 'glass-hud text-white hover:bg-white/15'"
                                class="rounded-full px-3.5 py-2 text-xs font-bold shadow-lg transition cursor-pointer">
                            <span x-text="musicPlaying ? '♫ Senyapkan' : '♫ Musik'"></span>
                        </button>
                    @endif

                    {{-- Split-Screen Stereoscopic VR Mode --}}
                    <button type="button" @click="toggleVrMode()"
                            class="glass-hud rounded-full px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-slate-950 shadow-lg transition cursor-pointer">
                        🥽 Mode VR
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        function publicTourApp(cfg) {
            return {
                payload: cfg.payload,
                mode: cfg.initialMode || 'overview',
                currentPin: null,
                phase: 'sesudah',
                currentAngleIndex: 0,
                viewer: null,
                loadingFull: false,
                miniMapExpanded: false,
                infoOpen: false,
                gyroEnabled: false,
                gyroNeedsTap: false,
                gyroPrefEnabled: true,
                vrMode: false,
                musicPlaying: false,
                viewYaw: 0,
                legendSearch: '',

                // Overview map pan/zoom
                ovZoom: 1,
                ovPanX: 0,
                ovPanY: 0,
                ovPanning: false,
                ovStartX: 0,
                ovStartY: 0,

                init() {
                    const firstPin = this.payload.pins.find(p => p.id === cfg.initialPinId) || this.payload.pins[0] || null;
                    this.currentPin = firstPin;
                    if (this.mode === 'vr' && firstPin) {
                        this.$nextTick(() => this.mountAndLoadPin(firstPin, false));
                    }
                },

                filteredLegendPins() {
                    const q = this.legendSearch.trim().toLowerCase();
                    if (!q) return this.payload.pins;
                    return this.payload.pins.filter(p =>
                        p.title.toLowerCase().includes(q) ||
                        (p.dimensions_note || '').toLowerCase().includes(q) ||
                        String(p.pin_number) === q
                    );
                },

                resetOverviewPan() {
                    const vp = this.$refs.ovViewport;
                    if (!vp) return;
                    const fit = Math.min(1, (vp.clientWidth - 16) / 920);
                    this.ovZoom = Number(Math.max(0.45, fit).toFixed(2));
                    this.ovPanX = Math.max(8, (vp.clientWidth - 920 * this.ovZoom) / 2);
                    this.ovPanY = 8;
                },

                startOvPan(e) {
                    this.ovPanning = true;
                    this.ovStartX = e.clientX - this.ovPanX;
                    this.ovStartY = e.clientY - this.ovPanY;
                },

                onOvPan(e) {
                    if (!this.ovPanning) return;
                    this.ovPanX = e.clientX - this.ovStartX;
                    this.ovPanY = e.clientY - this.ovStartY;
                },

                isTouchMobileDevice() {
                    return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent)
                        || (navigator.maxTouchPoints > 0 && window.matchMedia?.('(pointer: coarse)')?.matches);
                },

                async requestMobileGyroPermissionSync() {
                    // MUST be invoked synchronously inside a tap/click handler for iOS Safari/Chrome!
                    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                        try {
                            const state = await DeviceOrientationEvent.requestPermission();
                            return state === 'granted';
                        } catch {
                            return false;
                        }
                    }
                    return true;
                },

                async tryAutoEnableGyro(permissionPromise = null) {
                    if (!this.viewer || !this.gyroPrefEnabled || !this.isTouchMobileDevice()) return;
                    if (!window.isSecureContext || typeof DeviceOrientationEvent === 'undefined') return;

                    if (permissionPromise) {
                        const granted = await permissionPromise;
                        if (!granted) {
                            this.gyroNeedsTap = true;
                            return;
                        }
                    } else if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                        // Opened via direct link (?pin=...) on iOS without a prior tap — activate on first touch
                        this.gyroNeedsTap = true;
                        const onFirstTap = () => {
                            if (!this.gyroPrefEnabled || this.gyroEnabled) return;
                            this.toggleGyro(true);
                        };
                        window.addEventListener('pointerdown', onFirstTap, { once: true, capture: true });
                        return;
                    }

                    try {
                        this.gyroEnabled = await this.viewer.setGyroscope(true);
                        this.gyroNeedsTap = false;
                    } catch {
                        this.gyroEnabled = false;
                    }
                },

                enterVrForPin(pinId) {
                    const pin = this.payload.pins.find(p => p.id === Number(pinId)) || this.payload.pins[0];
                    if (!pin) return;

                    // Capture iOS motion sensor permission SYNCHRONOUSLY while click gesture is active!
                    const permPromise = (this.gyroPrefEnabled && this.isTouchMobileDevice())
                        ? this.requestMobileGyroPermissionSync()
                        : null;

                    this.mode = 'vr';
                    this.$nextTick(() => this.selectPin(pin.id, { transition: false, gyroPermissionPromise: permPromise }));
                },

                exitToOverview() {
                    if (this.vrMode) this.toggleVrMode();
                    this.mode = 'overview';
                    this.$nextTick(() => this.resetOverviewPan());
                },

                selectPin(pinId, options = {}) {
                    const pin = this.payload.pins.find(p => p.id === Number(pinId));
                    if (!pin) return;
                    const wasSameMode = Boolean(this.viewer && this.currentPin && this.currentPin.id !== pin.id);
                    const transition = options.transition ?? wasSameMode;

                    this.currentPin = pin;
                    this.currentAngleIndex = 0;

                    if (!this.hasPhase(this.phase, pin)) {
                        this.phase = pin.sesudah.length ? 'sesudah' : 'sebelum';
                    }

                    this.mountAndLoadPin(pin, {
                        preserveView: false,
                        transition,
                        fromLink: options.fromLink || null,
                        gyroPermissionPromise: options.gyroPermissionPromise || null,
                    });
                },

                stepPin(delta) {
                    if (!this.currentPin || !this.payload.pins.length) return;
                    const idx = this.payload.pins.findIndex(p => p.id === this.currentPin.id);
                    const nextIdx = (idx + delta + this.payload.pins.length) % this.payload.pins.length;
                    this.selectPin(this.payload.pins[nextIdx].id, { transition: true });
                },

                hasPhase(phaseName, pin = null) {
                    const target = pin || this.currentPin;
                    if (!target) return false;
                    return (target[phaseName] || []).length > 0;
                },

                currentPhasePhotos() {
                    if (!this.currentPin) return [];
                    return this.currentPin[this.phase] || [];
                },

                switchPhase(targetPhase) {
                    if (!this.hasPhase(targetPhase) || this.phase === targetPhase) return;
                    this.phase = targetPhase;
                    this.currentAngleIndex = 0;
                    // Preserve exact camera yaw/pitch/fov & smoothly crossfade Before/After!
                    this.mountAndLoadPin(this.currentPin, { preserveView: true, transition: true });
                },

                selectAngle(idx) {
                    this.currentAngleIndex = idx;
                    this.mountAndLoadPin(this.currentPin, { preserveView: false, transition: true });
                },

                effectiveLinksForPhoto(photo, pin) {
                    if (photo?.links && photo.links.length > 0) {
                        return photo.links;
                    }
                    // Kuula Walk-Through Continuous Floor Hotspots fallback from floorplan coordinates
                    // when no manual 360° arrows have been placed on this photo yet
                    const otherPins = (this.payload.pins || []).filter((other) => {
                        if (other.id === pin.id) return false;
                        return ((other.sesudah || []).length + (other.sebelum || []).length) > 0;
                    });
                    if (!otherPins.length) return [];

                    const ranked = otherPins
                        .map((other) => {
                            const dx = Number(other.pos_x) - Number(pin.pos_x);
                            const dy = Number(other.pos_y) - Number(pin.pos_y);
                            const dist = Math.hypot(dx, dy);
                            const seqBias = Math.abs(Number(other.pin_number) - Number(pin.pin_number)) === 1 ? -18 : 0;
                            const yawRad = Math.atan2(dx, -dy);
                            const yawDeg = Number(((yawRad * 180) / Math.PI).toFixed(1));
                            return { other, score: dist + seqBias, yawDeg };
                        })
                        .sort((a, b) => a.score - b.score)
                        .slice(0, 3);

                    return ranked.map(({ other, yawDeg }) => ({
                        id: `auto-${pin.id}-${other.id}`,
                        to_pin_id: other.id,
                        to_pin_number: other.pin_number,
                        to_pin_title: other.title,
                        yaw: yawDeg,
                        pitch: -18,
                        label: `Ke ${other.title}`,
                        is_auto: true,
                    }));
                },

                preloadNeighbors(links) {
                    if (!this.viewer) return;
                    for (const lnk of links || []) {
                        const targetPin = this.payload.pins.find(p => p.id === Number(lnk.to_pin_id));
                        if (!targetPin) continue;
                        const targetPhotos = (targetPin[this.phase]?.length ? targetPin[this.phase] : (targetPin.sesudah?.length ? targetPin.sesudah : targetPin.sebelum)) || [];
                        const firstPhoto = targetPhotos[0];
                        if (firstPhoto) {
                            this.viewer.preload(firstPhoto.image_url, firstPhoto.thumb_url);
                        }
                    }
                },

                mountAndLoadPin(pin, opts = false) {
                    const options = typeof opts === 'boolean' ? { preserveView: opts } : (opts || {});
                    const preserveView = Boolean(options.preserveView);
                    const transition = Boolean(options.transition);
                    const fromLink = options.fromLink || null;

                    if (!this.viewer && this.$refs.viewerEl) {
                        this.viewer = new window.Ruang360.Panorama360Viewer(this.$refs.viewerEl, {
                            onViewChange: ({ yaw }) => { this.viewYaw = yaw; },
                            onHotspotClick: (link) => { this.selectPin(link.to_pin_id, { transition: true, fromLink: link }); },
                            onLoadState: ({ loadingFull }) => { this.loadingFull = loadingFull; },
                        });

                        this.tryAutoEnableGyro(options.gyroPermissionPromise || null);
                    }

                    const photos = pin[this.phase] || [];
                    const photo = photos[this.currentAngleIndex] || photos[0];
                    if (!photo || !this.viewer) return;

                    const activeLinks = this.effectiveLinksForPhoto(photo, pin);

                    this.viewer.resize();
                    this.viewer.setPhoto({
                        fullUrl: photo.image_url,
                        thumbUrl: photo.thumb_url,
                        initialYaw: photo.initial_yaw || 0,
                        links: activeLinks,
                        preserveView,
                        transition,
                        focusYaw: fromLink?.yaw ?? null,
                        focusPitch: fromLink?.pitch ?? null,
                    });

                    // Background-preload neighboring panoramas so next walk-through click is instant
                    setTimeout(() => this.preloadNeighbors(activeLinks), 120);
                },

                async toggleGyro(forceState = null) {
                    if (!this.viewer) return;
                    const desired = forceState !== null ? Boolean(forceState) : !this.gyroEnabled;
                    this.gyroPrefEnabled = desired;
                    try {
                        if (desired && !window.isSecureContext) {
                            throw new Error('Sensor giroskop membutuhkan akses HTTPS (https://360.galipatsistem.com).');
                        }
                        this.gyroEnabled = await this.viewer.setGyroscope(desired);
                        this.gyroNeedsTap = false;
                    } catch (err) {
                        this.gyroEnabled = false;
                        alert(err.message);
                    }
                },

                toggleMusic() {
                    const audio = this.$refs.bgAudio;
                    if (!audio) return;
                    if (this.musicPlaying) {
                        audio.pause();
                        this.musicPlaying = false;
                    } else {
                        audio.play().then(() => { this.musicPlaying = true; }).catch(() => {});
                    }
                },

                toggleVrMode() {
                    this.vrMode = !this.vrMode;
                    if (this.viewer) {
                        this.viewer.setVrMode(this.vrMode);
                    }
                    if (this.vrMode && this.$refs.vrRoot?.requestFullscreen) {
                        this.$refs.vrRoot.requestFullscreen().catch(() => {});
                    } else if (!this.vrMode && document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {});
                    }
                },
            };
        }
    </script>
</body>
</html>
