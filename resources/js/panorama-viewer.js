import * as THREE from 'three';

export class Panorama360Viewer {
    constructor(container, options = {}) {
        this.container = container;
        const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
        const defaultFov = aspect < 0.72 ? 82 : 75;

        this.options = {
            initialYaw: options.initialYaw ?? 0,
            initialPitch: options.initialPitch ?? 0,
            initialFov: options.initialFov ?? defaultFov,
            onViewChange: options.onViewChange ?? null,
            onHotspotClick: options.onHotspotClick ?? null,
            onSpherePick: options.onSpherePick ?? null,
            onLoadState: options.onLoadState ?? null,
        };

        this.lon = this.options.initialYaw;
        this.lat = this.options.initialPitch;
        this.fov = this.options.initialFov;
        this.baseFov = this.fov;
        this.vrMode = false;
        this.gyroEnabled = false;
        this.pickMode = false;
        this.links = [];
        this.hotspotEls = [];

        this.isDragging = false;
        this.dragMoved = false;
        this.pointerDownX = 0;
        this.pointerDownY = 0;
        this.pointerDownLon = 0;
        this.pointerDownLat = 0;
        this.pointerDownUserYaw = 0;
        this.pointerDownUserPitch = 0;
        this.pinchDist = null;
        this.disposed = false;
        this.loadToken = 0;

        this.gyroBaseQuat = null;
        this.gyroYaw = 0;
        this.gyroPitch = 0;
        this.userYawOffset = 0;
        this.userPitchOffset = 0;

        // LRU Texture Cache & Walk-Through Animation State
        this.textureCache = new Map();
        this.pendingLoads = new Map();
        this.maxCacheSize = 10;
        this.walkAnim = null;

        this._initThree();
        this._initHotspotLayers();
        this._bindEvents();
        this._animate();
    }

    _initThree() {
        const w = Math.max(1, this.container.clientWidth);
        const h = Math.max(1, this.container.clientHeight);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(this.fov, w / h, 0.1, 1100);
        this.camera.target = new THREE.Vector3(0, 0, 0);

        this.leftCamera = new THREE.PerspectiveCamera(this.fov, w / 2 / h, 0.1, 1100);
        this.rightCamera = new THREE.PerspectiveCamera(this.fov, w / 2 / h, 0.1, 1100);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer.setSize(w, h);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.domElement.style.display = 'block';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.touchAction = 'none';

        this.container.innerHTML = '';
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        this.container.appendChild(this.renderer.domElement);

        // Outer Sphere (Current Room)
        const geometry = new THREE.SphereGeometry(500, 64, 40);
        geometry.scale(-1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.sphere = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.sphere);

        // Inner Sphere (Incoming Room for Kuula-style Walk-Through Crossfade)
        const nextGeom = new THREE.SphereGeometry(494, 64, 40);
        nextGeom.scale(-1, 1, 1);
        this.nextMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            depthWrite: false,
        });
        this.nextSphere = new THREE.Mesh(nextGeom, this.nextMaterial);
        this.nextSphere.visible = false;
        this.scene.add(this.nextSphere);

        this.textureLoader = new THREE.TextureLoader();
        this.textureLoader.setCrossOrigin('anonymous');
    }

    _initHotspotLayers() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'pointer-events-none absolute inset-0 overflow-hidden z-10 transition-opacity duration-200';
        this.container.appendChild(this.overlay);

        this.vrDivider = document.createElement('div');
        this.vrDivider.className = 'hidden pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/40 z-20';
        this.container.appendChild(this.vrDivider);

        this.vrReticles = document.createElement('div');
        this.vrReticles.className = 'hidden pointer-events-none absolute inset-0 z-20';
        this.vrReticles.innerHTML = `
            <div class="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-300/90 shadow"></div>
            <div class="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-300/90 shadow"></div>
        `;
        this.container.appendChild(this.vrReticles);
    }

    _bindEvents() {
        const el = this.renderer.domElement;

        this._onPointerDown = (e) => {
            if (e.pointerType === 'touch' && !e.isPrimary) return;
            this.isDragging = true;
            this.dragMoved = false;
            this.pointerDownX = e.clientX;
            this.pointerDownY = e.clientY;
            this.pointerDownLon = this.lon;
            this.pointerDownLat = this.lat;
            this.pointerDownUserYaw = this.userYawOffset;
            this.pointerDownUserPitch = this.userPitchOffset;
        };

        this._onPointerMove = (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.pointerDownX;
            const dy = e.clientY - this.pointerDownY;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
                this.dragMoved = true;
                this._cancelWalkZoomIfInteracted();
            }
            const factor = 0.14 * (this.fov / 75);
            if (this.gyroEnabled) {
                this.userYawOffset = this._normalizeYaw(this.pointerDownUserYaw - dx * factor);
                this.userPitchOffset = Math.max(-45, Math.min(45, this.pointerDownUserPitch + dy * factor));
                this.lon = this._normalizeYaw(this.gyroYaw + this.userYawOffset);
                this.lat = Math.max(-85, Math.min(85, this.gyroPitch + this.userPitchOffset));
            } else {
                this.lon = this._normalizeYaw(this.pointerDownLon - dx * factor);
                this.lat = Math.max(-85, Math.min(85, this.pointerDownLat + dy * factor));
            }
            this._emitViewChange();
        };

        this._onPointerUp = (e) => {
            if (this.isDragging && !this.dragMoved && this.pickMode && this.options.onSpherePick) {
                const coords = this._screenToSpherical(e.clientX, e.clientY);
                if (coords) {
                    this.options.onSpherePick(coords);
                }
            }
            this.isDragging = false;
        };

        this._onWheel = (e) => {
            e.preventDefault();
            this.fov = Math.max(38, Math.min(100, this.fov + e.deltaY * 0.04));
            this.baseFov = this.fov;
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
            this._emitViewChange();
        };

        this._onTouchStart = (e) => {
            if (e.touches.length === 2) {
                this.pinchDist = this._touchDistance(e.touches[0], e.touches[1]);
            }
        };

        this._onTouchMove = (e) => {
            if (e.touches.length === 2 && this.pinchDist !== null) {
                const next = this._touchDistance(e.touches[0], e.touches[1]);
                const delta = this.pinchDist - next;
                this.pinchDist = next;
                this.fov = Math.max(38, Math.min(100, this.fov + delta * 0.12));
                this.baseFov = this.fov;
                this.camera.fov = this.fov;
                this.camera.updateProjectionMatrix();
                this._emitViewChange();
            }
        };

        this._onTouchEnd = () => {
            this.pinchDist = null;
        };

        const zee = new THREE.Vector3(0, 0, 1);
        const worldUp = new THREE.Vector3(0, 1, 0);
        const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
        const q0 = new THREE.Quaternion();
        const euler = new THREE.Euler();

        this._onDeviceOrientation = (e) => {
            if (!this.gyroEnabled || e.alpha === null || e.beta === null) return;
            const screenAngle = window.screen?.orientation?.angle ?? window.orientation ?? 0;
            euler.set(
                THREE.MathUtils.degToRad(e.beta),
                THREE.MathUtils.degToRad(e.alpha),
                -THREE.MathUtils.degToRad(e.gamma || 0),
                'YXZ'
            );
            const qRaw = new THREE.Quaternion().setFromEuler(euler).multiply(q1);
            qRaw.multiply(q0.setFromAxisAngle(zee, -THREE.MathUtils.degToRad(screenAngle)));

            if (this.gyroBaseQuat === null) {
                const startFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(qRaw);
                const startAz = Math.atan2(startFwd.z, startFwd.x);
                this.gyroBaseQuat = new THREE.Quaternion().setFromAxisAngle(worldUp, startAz - THREE.MathUtils.degToRad(this.lon));
                this.userYawOffset = 0;
                this.userPitchOffset = 0;
            }
            const q = this.gyroBaseQuat.clone().multiply(qRaw);
            const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(q).normalize();
            this.gyroYaw = this._normalizeYaw(THREE.MathUtils.radToDeg(Math.atan2(fwd.z, fwd.x)));
            this.gyroPitch = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, fwd.y))));

            if (!this.walkAnim) {
                this.lon = this._normalizeYaw(this.gyroYaw + this.userYawOffset);
                this.lat = Math.max(-85, Math.min(85, this.gyroPitch + this.userPitchOffset));
                this._emitViewChange();
            }
        };

        this._onResize = () => this.resize();

        el.addEventListener('pointerdown', this._onPointerDown);
        window.addEventListener('pointermove', this._onPointerMove);
        window.addEventListener('pointerup', this._onPointerUp);
        el.addEventListener('wheel', this._onWheel, { passive: false });
        el.addEventListener('touchstart', this._onTouchStart, { passive: true });
        el.addEventListener('touchmove', this._onTouchMove, { passive: true });
        el.addEventListener('touchend', this._onTouchEnd);
        window.addEventListener('resize', this._onResize);
        window.addEventListener('deviceorientation', this._onDeviceOrientation);
    }

    _touchDistance(t1, t2) {
        return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
    }

    _normalizeYaw(deg) {
        return ((deg + 180) % 360 + 360) % 360 - 180;
    }

    _shortestYawDelta(fromDeg, toDeg) {
        return this._normalizeYaw(toDeg - fromDeg);
    }

    _cancelWalkZoomIfInteracted() {
        if (this.walkAnim && this.walkAnim.phase === 'dolly') {
            this.walkAnim.focusYaw = null;
        }
    }

    _screenToSpherical(clientX, clientY) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), this.camera);
        const hits = raycaster.intersectObject(this.sphere);
        if (!hits.length) return null;

        const p = hits[0].point.clone().normalize();
        const lat = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, p.y))));
        const lon = THREE.MathUtils.radToDeg(Math.atan2(p.z, p.x));
        return {
            yaw: Number(this._normalizeYaw(lon).toFixed(2)),
            pitch: Number(lat.toFixed(2)),
        };
    }

    setPickMode(enabled) {
        this.pickMode = Boolean(enabled);
        this.renderer.domElement.style.cursor = this.pickMode ? 'crosshair' : 'grab';
        if (this.links.length) {
            this.setLinks(this.links);
        }
    }

    preload(url, thumbUrl = null) {
        if (thumbUrl) {
            this._loadTextureCached(thumbUrl).catch(() => {});
        }
        if (url) {
            this._loadTextureCached(url).catch(() => {});
        }
    }

    _touchCache(url, tex) {
        if (this.textureCache.has(url)) {
            this.textureCache.delete(url);
        }
        this.textureCache.set(url, tex);
        while (this.textureCache.size > this.maxCacheSize) {
            const oldestKey = this.textureCache.keys().next().value;
            const oldestTex = this.textureCache.get(oldestKey);
            this.textureCache.delete(oldestKey);
            if (oldestTex && oldestTex !== this.material.map && oldestTex !== this.nextMaterial.map) {
                oldestTex.dispose();
            }
        }
    }

    _loadTextureCached(url) {
        if (!url) return Promise.reject(new Error('Missing texture URL'));
        if (this.textureCache.has(url)) {
            const tex = this.textureCache.get(url);
            this._touchCache(url, tex);
            return Promise.resolve(tex);
        }
        if (this.pendingLoads.has(url)) {
            return this.pendingLoads.get(url);
        }

        const promise = new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (tex) => {
                    this.pendingLoads.delete(url);
                    if (this.disposed) {
                        tex.dispose();
                        reject(new Error('Viewer disposed'));
                        return;
                    }
                    tex.colorSpace = THREE.SRGBColorSpace;
                    tex.minFilter = THREE.LinearFilter;
                    tex.magFilter = THREE.LinearFilter;
                    this._touchCache(url, tex);
                    resolve(tex);
                },
                undefined,
                (err) => {
                    this.pendingLoads.delete(url);
                    reject(err || new Error('Failed to load texture'));
                }
            );
        });

        this.pendingLoads.set(url, promise);
        return promise;
    }

    _commitTextureImmediate(tex) {
        this.sphere.rotation.y = 0;
        this.nextSphere.visible = false;
        this.nextMaterial.opacity = 0;
        this.nextMaterial.map = null;

        this.material.map = tex;
        this.material.needsUpdate = true;
    }

    _beginCrossfadeWithTexture(tex, destYaw, destPitch, preserveView) {
        if (!this.material.map) {
            this._commitTextureImmediate(tex);
            return;
        }

        // Keep outgoing panoramic view visually aligned while stepping continuously into the new spot
        const outgoingLon = this.lon;
        const outgoingLat = this.lat;
        if (!preserveView) {
            this.lon = Number(destYaw || 0);
            this.lat = Math.max(-85, Math.min(85, Number(destPitch || 0) * 0.25));
            this.gyroBaseQuat = null;
            this.userYawOffset = 0;
            this.userPitchOffset = 0;
            this.sphere.rotation.y = THREE.MathUtils.degToRad(outgoingLon - this.lon);
        } else {
            this.sphere.rotation.y = 0;
        }

        this.nextMaterial.map = tex;
        this.nextMaterial.opacity = 0;
        this.nextMaterial.needsUpdate = true;
        this.nextSphere.visible = true;

        const targetLatFinal = preserveView ? outgoingLat : 0;
        this.walkAnim = {
            phase: 'crossfade',
            startTime: performance.now(),
            duration: 460,
            startFov: preserveView ? this.fov : Math.min(94, this.baseFov + 10),
            endFov: this.baseFov,
            startLat: this.lat,
            endLat: targetLatFinal,
            preserveView,
        };
    }

    setPhoto({
        fullUrl,
        thumbUrl = null,
        initialYaw = 0,
        links = [],
        preserveView = false,
        transition = false,
        focusYaw = null,
        focusPitch = null,
    }) {
        const token = ++this.loadToken;
        const hasExistingMap = Boolean(this.material.map);
        const useWalkThrough = Boolean(transition && hasExistingMap && !this.pickMode);
        const destYaw = Number(initialYaw || 0);

        if (!useWalkThrough && !preserveView) {
            this.lon = destYaw;
            this.lat = 0;
            this.gyroBaseQuat = null;
            this.userYawOffset = 0;
            this.userPitchOffset = 0;
            this.fov = this.baseFov;
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
        }

        // Hide hotspots smoothly during walk-through flight, reveal when arrived
        if (useWalkThrough) {
            this.overlay.style.opacity = '0';
            this.walkAnim = {
                phase: 'dolly',
                startTime: performance.now(),
                duration: 210,
                startLon: this.lon,
                focusYaw: focusYaw !== null && focusYaw !== undefined ? Number(focusYaw) : null,
                startLat: this.lat,
                focusPitch: focusPitch !== null && focusPitch !== undefined ? Number(focusPitch) * 0.45 : this.lat * 0.4,
                startFov: this.fov,
                endFov: Math.max(40, this.baseFov - 22),
            };
        } else {
            this.walkAnim = null;
            this.overlay.style.opacity = '1';
        }

        this.setLinks(links);

        const cachedFull = this.textureCache.get(fullUrl);
        if (this.options.onLoadState) {
            this.options.onLoadState({ loadingThumb: !cachedFull && Boolean(thumbUrl), loadingFull: !cachedFull });
        }

        let crossfadeStarted = false;

        const applyIncomingTexture = (tex, isFull) => {
            if (this.disposed || token !== this.loadToken) return;

            if (!useWalkThrough) {
                this._commitTextureImmediate(tex);
                this.overlay.style.opacity = '1';
                if (isFull && this.options.onLoadState) {
                    this.options.onLoadState({ loadingThumb: false, loadingFull: false });
                }
                return;
            }

            if (crossfadeStarted) {
                if (this.walkAnim && this.walkAnim.phase === 'crossfade' && this.nextSphere.visible) {
                    this.nextMaterial.map = tex;
                    this.nextMaterial.needsUpdate = true;
                } else {
                    this._commitTextureImmediate(tex);
                }
                if (isFull && this.options.onLoadState) {
                    this.options.onLoadState({ loadingThumb: false, loadingFull: false });
                }
                return;
            }

            crossfadeStarted = true;
            const elapsed = this.walkAnim?.phase === 'dolly' ? performance.now() - this.walkAnim.startTime : 210;
            const remaining = Math.max(0, 175 - elapsed);
            setTimeout(() => {
                if (this.disposed || token !== this.loadToken) return;
                // Prefer full-res texture if it finished loading while dolly timer waited
                const bestTex = this.textureCache.get(fullUrl) || tex;
                this._beginCrossfadeWithTexture(bestTex, destYaw, focusPitch, preserveView);
                if (this.textureCache.has(fullUrl) && this.options.onLoadState) {
                    this.options.onLoadState({ loadingThumb: false, loadingFull: false });
                }
            }, remaining);
        };

        if (cachedFull) {
            applyIncomingTexture(cachedFull, true);
            this._emitViewChange();
            return;
        }

        if (thumbUrl) {
            this._loadTextureCached(thumbUrl)
                .then((thumbTex) => {
                    if (this.disposed || token !== this.loadToken) return;
                    if (!this.textureCache.has(fullUrl) && this.options.onLoadState) {
                        this.options.onLoadState({ loadingThumb: false, loadingFull: true });
                    }
                    applyIncomingTexture(thumbTex, false);
                })
                .catch(() => {});
        }

        this._loadTextureCached(fullUrl)
            .then((fullTex) => {
                applyIncomingTexture(fullTex, true);
            })
            .catch(() => {
                if (this.options.onLoadState && token === this.loadToken) {
                    this.options.onLoadState({ loadingThumb: false, loadingFull: false });
                }
            });

        this._emitViewChange();
    }

    setLinks(links = []) {
        this.links = links;
        this.overlay.innerHTML = '';
        this.hotspotEls = [];

        const copies = this.vrMode ? [0, 1] : [0];
        for (const eyeIndex of copies) {
            for (const link of this.links) {
                const btn = document.createElement('button');
                btn.type = 'button';
                const labelText = `${link.to_pin_number ? `#${link.to_pin_number} · ` : ''}${this._escapeHtml(link.label || link.to_pin_title || 'Lanjut')}`;

                if (this.pickMode) {
                    btn.className = 'pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform duration-150 hover:scale-110';
                    btn.innerHTML = `
                        <div class="flex flex-col items-center gap-1">
                            <div class="w-10 h-10 rounded-full bg-amber-500/95 text-slate-950 shadow-xl ring-4 ring-white/40 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                                </svg>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/90 text-white border border-white/25 shadow whitespace-nowrap">
                                ${labelText}
                            </span>
                        </div>
                    `;
                } else if (Number(link.pitch ?? 0) <= -5) {
                    // Kuula-style 3D Perspective Concentric Floor Target Ring
                    btn.className = 'pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer';
                    btn.innerHTML = `
                        <div class="flex flex-col items-center">
                            <div class="kuula-ring-wrap relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                                 style="width: 62px; height: 62px;">
                                <span class="absolute inset-0 rounded-full border-[4px] border-white/90 shadow-[0_0_16px_rgba(0,0,0,0.55)] animate-ping" style="animation-duration: 2.6s;"></span>
                                <span class="relative flex items-center justify-center w-14 h-14 rounded-full border-[5px] border-white bg-slate-950/25 shadow-[0_6px_22px_rgba(0,0,0,0.65)] group-hover:border-amber-300 transition-colors">
                                    <span class="w-6 h-6 rounded-full border-[3.5px] border-white/95 bg-white/80 group-hover:bg-amber-300 transition-colors"></span>
                                </span>
                            </div>
                            <span class="-mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 text-white border border-white/25 shadow-lg whitespace-nowrap backdrop-blur-md group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-300 transition-colors">
                                ${labelText}
                            </span>
                        </div>
                    `;
                } else {
                    // Kuula-style Floating Walk Chevron Puck (Horizon / Gateways)
                    btn.className = 'pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-110';
                    btn.innerHTML = `
                        <div class="flex flex-col items-center gap-1.5">
                            <div class="w-12 h-12 rounded-full bg-slate-950/55 border-2 border-white/90 text-white shadow-[0_6px_24px_rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-white transition-colors">
                                <svg class="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 14l7-7 7 7"/>
                                </svg>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 text-white border border-white/25 shadow-lg whitespace-nowrap backdrop-blur-md group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                ${labelText}
                            </span>
                        </div>
                    `;
                }

                const ringWrap = btn.querySelector('.kuula-ring-wrap');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.options.onHotspotClick) {
                        this.options.onHotspotClick(link);
                    }
                });
                this.overlay.appendChild(btn);
                this.hotspotEls.push({ btn, ringWrap, link, eyeIndex });
            }
        }
    }

    setVrMode(enabled) {
        this.vrMode = Boolean(enabled);
        this.vrDivider.classList.toggle('hidden', !this.vrMode);
        this.vrReticles.classList.toggle('hidden', !this.vrMode);
        this.setLinks(this.links);
        this.resize();
    }

    async setGyroscope(enabled) {
        if (enabled && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const state = await DeviceOrientationEvent.requestPermission();
            if (state !== 'granted') {
                throw new Error('Izin sensor giroskop ditolak oleh browser.');
            }
        }
        this.gyroBaseQuat = null;
        this.userYawOffset = 0;
        this.userPitchOffset = 0;
        this.gyroEnabled = Boolean(enabled);
        return this.gyroEnabled;
    }

    lookAt(yaw, pitch = 0) {
        this.lon = Number(yaw || 0);
        this.lat = Math.max(-85, Math.min(85, Number(pitch || 0)));
        this._emitViewChange();
    }

    getView() {
        return { yaw: this.lon, pitch: this.lat, fov: this.fov };
    }

    resize() {
        if (!this.container || this.disposed) return;
        const w = Math.max(1, this.container.clientWidth);
        const h = Math.max(1, this.container.clientHeight);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.leftCamera.aspect = w / 2 / h;
        this.leftCamera.updateProjectionMatrix();
        this.rightCamera.aspect = w / 2 / h;
        this.rightCamera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    _emitViewChange() {
        if (this.options.onViewChange) {
            this.options.onViewChange({ yaw: this.lon, pitch: this.lat, fov: this.fov });
        }
    }

    _sphericalToWorld(yawDeg, pitchDeg, radius = 480) {
        const phi = THREE.MathUtils.degToRad(90 - pitchDeg);
        const theta = THREE.MathUtils.degToRad(yawDeg);
        return new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    _updateHotspotPositions() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (!w || !h) return;

        // Perspective tilt makes floor rings lie realistically flat on the ground
        const floorTiltDeg = Math.max(24, Math.min(68, 66 + this.lat * 0.55));

        for (const item of this.hotspotEls) {
            const cam = this.vrMode
                ? (item.eyeIndex === 0 ? this.leftCamera : this.rightCamera)
                : this.camera;

            const worldPos = this._sphericalToWorld(item.link.yaw, item.link.pitch, 450);
            const camDir = new THREE.Vector3();
            cam.getWorldDirection(camDir);

            if (camDir.dot(worldPos.clone().normalize()) <= 0.12) {
                item.btn.style.display = 'none';
                continue;
            }

            const projected = worldPos.project(cam);
            if (projected.z > 1) {
                item.btn.style.display = 'none';
                continue;
            }

            if (item.ringWrap) {
                item.ringWrap.style.transform = `perspective(240px) rotateX(${floorTiltDeg.toFixed(1)}deg)`;
            }

            if (this.vrMode) {
                const halfW = w / 2;
                const xOffset = item.eyeIndex === 0 ? 0 : halfW;
                const sx = xOffset + ((projected.x + 1) * 0.5) * halfW;
                const sy = ((-projected.y + 1) * 0.5) * h;
                if (sx < xOffset + 20 || sx > xOffset + halfW - 20 || sy < 20 || sy > h - 20) {
                    item.btn.style.display = 'none';
                } else {
                    item.btn.style.display = 'block';
                    item.btn.style.left = `${sx}px`;
                    item.btn.style.top = `${sy}px`;
                }
            } else {
                const sx = ((projected.x + 1) * 0.5) * w;
                const sy = ((-projected.y + 1) * 0.5) * h;
                if (sx < 12 || sx > w - 12 || sy < 12 || sy > h - 12) {
                    item.btn.style.display = 'none';
                } else {
                    item.btn.style.display = 'block';
                    item.btn.style.left = `${sx}px`;
                    item.btn.style.top = `${sy}px`;
                }
            }
        }
    }

    _stepWalkAnimation() {
        const anim = this.walkAnim;
        if (!anim) return;

        const now = performance.now();
        const rawT = Math.min(1, (now - anim.startTime) / Math.max(1, anim.duration));
        const easeOut = 1 - Math.pow(1 - rawT, 3);
        const easeInOut = rawT < 0.5 ? 2 * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

        if (anim.phase === 'dolly') {
            if (anim.focusYaw !== null && anim.focusYaw !== undefined) {
                const dYaw = this._shortestYawDelta(anim.startLon, anim.focusYaw);
                this.lon = this._normalizeYaw(anim.startLon + dYaw * easeOut);
                this.lat = Math.max(-85, Math.min(85, anim.startLat + (anim.focusPitch - anim.startLat) * easeOut));
            }
            this.fov = anim.startFov + (anim.endFov - anim.startFov) * easeOut;
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
        } else if (anim.phase === 'crossfade') {
            this.nextMaterial.opacity = easeInOut;
            this.fov = anim.startFov + (anim.endFov - anim.startFov) * easeOut;
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();

            if (!anim.preserveView) {
                this.lat = anim.startLat + (anim.endLat - anim.startLat) * easeOut;
            }

            if (rawT >= 1) {
                const settledTex = this.nextMaterial.map;
                this.walkAnim = null;
                this._commitTextureImmediate(settledTex);
                this.overlay.style.opacity = '1';
                this._emitViewChange();
            }
        }
    }

    _animate() {
        if (this.disposed) return;
        requestAnimationFrame(() => this._animate());

        this._stepWalkAnimation();

        const phi = THREE.MathUtils.degToRad(90 - this.lat);
        const theta = THREE.MathUtils.degToRad(this.lon);
        const target = new THREE.Vector3(
            500 * Math.sin(phi) * Math.cos(theta),
            500 * Math.cos(phi),
            500 * Math.sin(phi) * Math.sin(theta)
        );

        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(target);
        this.camera.updateMatrixWorld();

        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        if (this.vrMode) {
            const halfW = Math.floor(w / 2);
            const rightVec = new THREE.Vector3().crossVectors(target.clone().normalize(), new THREE.Vector3(0, 1, 0)).normalize();
            const ipdHalf = 0.08;

            this.leftCamera.fov = this.fov;
            this.leftCamera.updateProjectionMatrix();
            this.leftCamera.position.copy(rightVec.clone().multiplyScalar(-ipdHalf));
            this.leftCamera.lookAt(target);
            this.leftCamera.updateMatrixWorld();

            this.rightCamera.fov = this.fov;
            this.rightCamera.updateProjectionMatrix();
            this.rightCamera.position.copy(rightVec.clone().multiplyScalar(ipdHalf));
            this.rightCamera.lookAt(target);
            this.rightCamera.updateMatrixWorld();

            this.renderer.setScissorTest(true);

            this.renderer.setViewport(0, 0, halfW, h);
            this.renderer.setScissor(0, 0, halfW, h);
            this.renderer.render(this.scene, this.leftCamera);

            this.renderer.setViewport(halfW, 0, w - halfW, h);
            this.renderer.setScissor(halfW, 0, w - halfW, h);
            this.renderer.render(this.scene, this.rightCamera);
        } else {
            this.renderer.setScissorTest(false);
            this.renderer.setViewport(0, 0, w, h);
            this.renderer.render(this.scene, this.camera);
        }

        this._updateHotspotPositions();
    }

    _escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    destroy() {
        this.disposed = true;
        const el = this.renderer?.domElement;
        if (el) {
            el.removeEventListener('pointerdown', this._onPointerDown);
            el.removeEventListener('wheel', this._onWheel);
            el.removeEventListener('touchstart', this._onTouchStart);
            el.removeEventListener('touchmove', this._onTouchMove);
            el.removeEventListener('touchend', this._onTouchEnd);
        }
        window.removeEventListener('pointermove', this._onPointerMove);
        window.removeEventListener('pointerup', this._onPointerUp);
        window.removeEventListener('resize', this._onResize);
        window.removeEventListener('deviceorientation', this._onDeviceOrientation);

        for (const tex of this.textureCache.values()) {
            tex.dispose();
        }
        this.textureCache.clear();
        this.pendingLoads.clear();

        if (this.material?.map) this.material.map.dispose();
        if (this.nextMaterial?.map) this.nextMaterial.map.dispose();
        this.material?.dispose();
        this.nextMaterial?.dispose();
        this.sphere?.geometry?.dispose();
        this.nextSphere?.geometry?.dispose();
        this.renderer?.dispose();
    }
}
