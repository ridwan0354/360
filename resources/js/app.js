import Alpine from 'alpinejs';
import { Panorama360Viewer } from './panorama-viewer';
import { FloorplanCanvasBuilder, BUILDER_ICON_LIBRARY } from './floorplan-builder';
import { GuidedCamera360 } from './guided-camera-360';

window.Alpine = Alpine;
window.Ruang360 = {
    Panorama360Viewer,
    FloorplanCanvasBuilder,
    BUILDER_ICON_LIBRARY,
    GuidedCamera360,
};

Alpine.start();
