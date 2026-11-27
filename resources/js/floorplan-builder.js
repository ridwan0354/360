import Konva from 'konva';

export const BUILDER_ICON_LIBRARY = [
    { kind: 'penerima_tamu', label: 'Penerima Tamu', short: 'Meja Tamu', fill: '#E0F2FE', stroke: '#0369A1', w: 150, h: 56 },
    { kind: 'pelaminan', label: 'Area Pelaminan', short: 'Pelaminan', fill: '#FEF3C7', stroke: '#B45309', w: 220, h: 78 },
    { kind: 'panggung_musik', label: 'Panggung Musik', short: 'Musik', fill: '#DCFCE7', stroke: '#15803D', w: 140, h: 70 },
    { kind: 'meja_vip', label: 'Meja VIP / VVIP', short: 'VIP', fill: '#F3E8FF', stroke: '#7E22CE', w: 120, h: 90 },
    { kind: 'photobooth', label: 'Photobooth / Gallery', short: 'Photo', fill: '#FCE7F3', stroke: '#BE185D', w: 130, h: 64 },
    { kind: 'taman_gantung', label: 'Taman Gantung / Pergola', short: 'Pergola', fill: '#ECFDF5', stroke: '#047857', w: 130, h: 110 },
    { kind: 'frame_screen', label: 'Layar Frame Screen', short: 'Screen', fill: '#FFEDD5', stroke: '#C2410C', w: 150, h: 42 },
    { kind: 'centerpiece', label: 'Centerpiece Floral', short: 'Floral', fill: '#FFE4E6', stroke: '#E11D48', w: 96, h: 96 },
];

export class FloorplanCanvasBuilder {
    constructor(container, options = {}) {
        this.container = container;
        this.width = 1200;
        this.height = 760;
        this.onChange = options.onChange ?? null;
        this.onSelect = options.onSelect ?? null;

        this.stage = new Konva.Stage({
            container,
            width: this.width,
            height: this.height,
        });

        this.bgLayer = new Konva.Layer();
        this.gridLayer = new Konva.Layer();
        this.mainLayer = new Konva.Layer();
        this.uiLayer = new Konva.Layer();

        this.stage.add(this.bgLayer);
        this.stage.add(this.gridLayer);
        this.stage.add(this.mainLayer);
        this.stage.add(this.uiLayer);

        this.transformer = new Konva.Transformer({
            rotateEnabled: true,
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            borderStroke: '#C89D54',
            anchorStroke: '#C89D54',
            anchorFill: '#FFFFFF',
            anchorSize: 9,
        });
        this.uiLayer.add(this.transformer);

        this._drawBackgroundAndGrid();
        this._bindStageEvents();

        if (options.initialJson) {
            this.loadJson(options.initialJson);
        } else {
            this.addDefaultRoomTemplate();
        }
    }

    _drawBackgroundAndGrid() {
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
            fill: '#F8FAFC',
            listening: false,
        });
        this.bgLayer.add(bg);

        const step = 40;
        for (let x = 0; x <= this.width; x += step) {
            this.gridLayer.add(new Konva.Line({
                points: [x, 0, x, this.height],
                stroke: '#E2E8F0',
                strokeWidth: 1,
                listening: false,
            }));
        }
        for (let y = 0; y <= this.height; y += step) {
            this.gridLayer.add(new Konva.Line({
                points: [0, y, this.width, y],
                stroke: '#E2E8F0',
                strokeWidth: 1,
                listening: false,
            }));
        }
    }

    _bindStageEvents() {
        this.stage.on('click tap', (e) => {
            if (e.target === this.stage) {
                this.transformer.nodes([]);
                if (this.onSelect) this.onSelect(null);
                return;
            }
            const group = e.target.findAncestor('.builder-item', true) || (e.target.hasName('builder-item') ? e.target : null);
            if (group) {
                this.transformer.nodes([group]);
                if (this.onSelect) this.onSelect(group);
            }
        });
    }

    addDefaultRoomTemplate() {
        this.addRoom({ x: 100, y: 80, width: 1000, height: 590, label: 'Ruang Acara Utama' });
    }

    addRoom({ x = 140, y = 110, width = 460, height = 320, label = 'Ruangan', fill = '#FFFFFF', stroke = '#1E293B' } = {}) {
        const group = this._createItemGroup('room', { x, y, label, fill, stroke, width, height });
        const rect = new Konva.Rect({
            width,
            height,
            fill,
            stroke,
            strokeWidth: 3,
            cornerRadius: 4,
        });
        const text = new Konva.Text({
            text: label,
            x: 12,
            y: 10,
            fontSize: 15,
            fontStyle: 'bold',
            fill: '#334155',
        });
        group.add(rect, text);
        this.mainLayer.add(group);
        this._selectGroup(group);
        this._emitChange();
        return group;
    }

    addWall({ x = 200, y = 260, width = 220, height = 10, label = 'Dinding' } = {}) {
        const group = this._createItemGroup('wall', { x, y, label, width, height });
        const rect = new Konva.Rect({
            width,
            height,
            fill: '#0F172A',
            cornerRadius: 2,
        });
        group.add(rect);
        this.mainLayer.add(group);
        this._selectGroup(group);
        this._emitChange();
        return group;
    }

    addDoor({ kind = 'door_in', x = 520, y = 655, width = 100, height = 22 } = {}) {
        const isIn = kind === 'door_in';
        const isClosed = kind === 'door_closed';
        const label = isClosed ? 'Pintu Tertutup' : (isIn ? 'Pintu Masuk' : 'Pintu Keluar');
        const fill = isClosed ? '#FEE2E2' : (isIn ? '#DCFCE7' : '#FEF3C7');
        const stroke = isClosed ? '#DC2626' : (isIn ? '#16A34A' : '#EA580C');

        const group = this._createItemGroup(kind, { x, y, label, fill, stroke, width, height });
        const rect = new Konva.Rect({
            width,
            height,
            fill,
            stroke,
            strokeWidth: 2,
            cornerRadius: 6,
        });
        const text = new Konva.Text({
            text: isClosed ? 'X TERTUTUP' : (isIn ? '→ MASUK' : '← KELUAR'),
            width,
            height,
            align: 'center',
            verticalAlign: 'middle',
            fontSize: 11,
            fontStyle: 'bold',
            fill: stroke,
        });
        group.add(rect, text);
        this.mainLayer.add(group);
        this._selectGroup(group);
        this._emitChange();
        return group;
    }

    addFlowArrow({ x = 420, y = 420, label = 'Alur Tamu', color = '#16A34A' } = {}) {
        const group = this._createItemGroup('flow_arrow', { x, y, label, fill: color, stroke: color, width: 120, height: 34 });
        const arrow = new Konva.Arrow({
            points: [0, 17, 110, 17],
            pointerLength: 14,
            pointerWidth: 14,
            fill: color,
            stroke: color,
            strokeWidth: 4,
        });
        group.add(arrow);
        this.mainLayer.add(group);
        this._selectGroup(group);
        this._emitChange();
        return group;
    }

    addEventIcon(kind, customX = null, customY = null) {
        const spec = BUILDER_ICON_LIBRARY.find((i) => i.kind === kind) || BUILDER_ICON_LIBRARY[0];
        const x = customX ?? (this.width / 2 - spec.w / 2 + (Math.random() * 60 - 30));
        const y = customY ?? (this.height / 2 - spec.h / 2 + (Math.random() * 60 - 30));

        const group = this._createItemGroup('icon', {
            x,
            y,
            width: spec.w,
            height: spec.h,
            label: spec.label,
            iconKind: spec.kind,
            fill: spec.fill,
            stroke: spec.stroke,
        });

        const box = new Konva.Rect({
            width: spec.w,
            height: spec.h,
            fill: spec.fill,
            stroke: spec.stroke,
            strokeWidth: 2,
            cornerRadius: 10,
            shadowColor: 'rgba(15, 23, 42, 0.12)',
            shadowBlur: 8,
            shadowOffsetY: 3,
        });

        const title = new Konva.Text({
            text: spec.label,
            width: spec.w,
            height: spec.h,
            padding: 8,
            align: 'center',
            verticalAlign: 'middle',
            fontSize: 13,
            fontStyle: 'bold',
            fill: '#0F172A',
        });

        group.add(box, title);
        this.mainLayer.add(group);
        this._selectGroup(group);
        this._emitChange();
        return group;
    }

    _createItemGroup(itemType, meta) {
        const group = new Konva.Group({
            x: meta.x,
            y: meta.y,
            draggable: true,
            name: 'builder-item',
        });
        group.setAttr('builderMeta', {
            id: meta.id || `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            type: itemType,
            iconKind: meta.iconKind || null,
            label: meta.label || '',
            fill: meta.fill || '#FFFFFF',
            stroke: meta.stroke || '#1E293B',
            width: meta.width || 120,
            height: meta.height || 60,
        });
        group.on('dragend transformend', () => this._emitChange());
        return group;
    }

    _selectGroup(group) {
        this.transformer.nodes([group]);
        if (this.onSelect) this.onSelect(group);
    }

    updateSelectedLabel(newLabel) {
        const nodes = this.transformer.nodes();
        if (!nodes.length) return;
        const group = nodes[0];
        const meta = group.getAttr('builderMeta') || {};
        meta.label = newLabel;
        group.setAttr('builderMeta', meta);
        const textNode = group.findOne('Text');
        if (textNode) {
            textNode.text(newLabel);
        }
        this.mainLayer.draw();
        this._emitChange();
    }

    deleteSelected() {
        const nodes = this.transformer.nodes();
        if (!nodes.length) return;
        nodes.forEach((n) => n.destroy());
        this.transformer.nodes([]);
        if (this.onSelect) this.onSelect(null);
        this._emitChange();
    }

    clearCanvas() {
        this.transformer.nodes([]);
        this.mainLayer.destroyChildren();
        this.addDefaultRoomTemplate();
        this._emitChange();
    }

    getItemsSummary() {
        return this.mainLayer.getChildren().map((group) => {
            const meta = group.getAttr('builderMeta') || {};
            const scaleX = group.scaleX();
            const scaleY = group.scaleY();
            return {
                ...meta,
                x: Math.round(group.x()),
                y: Math.round(group.y()),
                width: Math.round((meta.width || 120) * scaleX),
                height: Math.round((meta.height || 60) * scaleY),
                rotation: Math.round(group.rotation()),
                center_pct_x: Number((((group.x() + ((meta.width || 120) * scaleX) / 2) / this.width) * 100).toFixed(2)),
                center_pct_y: Number((((group.y() + ((meta.height || 60) * scaleY) / 2) / this.height) * 100).toFixed(2)),
            };
        });
    }

    exportState() {
        this.transformer.nodes([]);
        this.uiLayer.hide();
        const snapshotDataUrl = this.stage.toDataURL({ pixelRatio: 1 });
        this.uiLayer.show();

        const json = JSON.stringify({
            width: this.width,
            height: this.height,
            background: '#F8FAFC',
            items: this.getItemsSummary(),
        });

        return { canvasJson: json, snapshotDataUrl, items: this.getItemsSummary() };
    }

    loadJson(jsonStr) {
        try {
            const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
            if (!data || !Array.isArray(data.items)) return;

            this.transformer.nodes([]);
            this.mainLayer.destroyChildren();

            for (const item of data.items) {
                let g = null;
                if (item.type === 'room') {
                    g = this.addRoom(item);
                } else if (item.type === 'wall') {
                    g = this.addWall(item);
                } else if (item.type === 'door_in' || item.type === 'door_out' || item.type === 'door_closed') {
                    g = this.addDoor({ ...item, kind: item.type });
                } else if (item.type === 'flow_arrow') {
                    g = this.addFlowArrow({ ...item, color: item.stroke || '#16A34A' });
                } else if (item.type === 'icon') {
                    g = this.addEventIcon(item.iconKind || 'penerima_tamu', item.x, item.y);
                    const meta = g.getAttr('builderMeta');
                    meta.label = item.label || meta.label;
                    g.setAttr('builderMeta', meta);
                    const textNode = g.findOne('Text');
                    if (textNode && item.label) textNode.text(item.label);
                }
                if (g && item.rotation) {
                    g.rotation(item.rotation);
                }
            }
            this.transformer.nodes([]);
            this._emitChange();
        } catch (err) {
            console.warn('Gagal memuat canvas JSON:', err);
        }
    }

    _emitChange() {
        if (this.onChange) {
            this.onChange(this.getItemsSummary());
        }
    }
}
