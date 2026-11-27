import 'dart:async';
import 'dart:math' as math;
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/api_service.dart';
import '../services/orientation_service.dart';

class PanoramaPreviewScreen extends StatefulWidget {
  final ApiService api;
  final int pinId;
  final String phase;
  final String angleLabel;
  final String imageUrl;
  final String? previewToken;
  final String? stitchEngine;

  const PanoramaPreviewScreen({
    Key? key,
    required this.api,
    required this.pinId,
    required this.phase,
    required this.angleLabel,
    required this.imageUrl,
    this.previewToken,
    this.stitchEngine,
  }) : super(key: key);

  @override
  State<PanoramaPreviewScreen> createState() => _PanoramaPreviewScreenState();
}

class _PanoramaPreviewScreenState extends State<PanoramaPreviewScreen> {
  ui.Image? _panoImage;
  bool _loadingImage = true;
  bool _saving = false;
  bool _gyroEnabled = true;

  double _yawDeg = 0;
  double _pitchDeg = 0;
  double _panYawOffset = 0;
  double _panPitchOffset = 0;
  final OrientationService _orientation = OrientationService();
  StreamSubscription<OrientationSample>? _orientSub;

  @override
  void initState() {
    super.initState();
    _loadImage();
    _startGyro();
  }

  Future<void> _loadImage() async {
    try {
      final resp = await http.get(Uri.parse(widget.imageUrl));
      final codec = await ui.instantiateImageCodec(resp.bodyBytes);
      final frame = await codec.getNextFrame();
      if (mounted) {
        setState(() {
          _panoImage = frame.image;
          _loadingImage = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _loadingImage = false);
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Gagal memuat pratinjau: $e')));
      }
    }
  }

  void _startGyro() {
    _orientation.start();
    _orientSub = _orientation.stream.listen((sample) {
      if (!_gyroEnabled || !mounted) return;
      setState(() {
        _yawDeg = (sample.yawDeg + _panYawOffset) % 360.0;
        _pitchDeg = (sample.pitchDeg + _panPitchOffset).clamp(-65.0, 65.0);
      });
    });
  }

  Future<void> _saveToPin() async {
    if (widget.previewToken == null || _saving) return;
    setState(() => _saving = true);
    try {
      await widget.api.confirmSavePreview(
        pinId: widget.pinId,
        phase: widget.phase,
        angleLabel: widget.angleLabel,
        previewToken: widget.previewToken!,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Panorama 360° berhasil disimpan ke titik pin!'), backgroundColor: Colors.green),
      );
      Navigator.of(context).pop(true);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$e'), backgroundColor: Colors.redAccent));
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  void dispose() {
    _orientSub?.cancel();
    _orientation.dispose();
    _panoImage?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: const Color(0xFF090D16),
        foregroundColor: Colors.white,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Pratinjau 360°', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            if (widget.stitchEngine != null)
              Text('Engine: ${widget.stitchEngine}', style: const TextStyle(fontSize: 11, color: Color(0xFF34D399))),
          ],
        ),
        actions: [
          TextButton.icon(
            onPressed: () => setState(() => _gyroEnabled = !_gyroEnabled),
            icon: Icon(Icons.screen_rotation, size: 16, color: _gyroEnabled ? const Color(0xFF34D399) : Colors.white54),
            label: Text(
              _gyroEnabled ? 'Giroskop ON' : 'Giroskop OFF',
              style: TextStyle(color: _gyroEnabled ? const Color(0xFF34D399) : Colors.white54, fontSize: 11),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: _loadingImage || _panoImage == null
                ? const Center(child: CircularProgressIndicator(color: Color(0xFFC89D54)))
                : GestureDetector(
                    onPanUpdate: (details) {
                      setState(() {
                        _panYawOffset = (_panYawOffset - details.delta.dx * 0.25) % 360.0;
                        _panPitchOffset = (_panPitchOffset + details.delta.dy * 0.2).clamp(-45.0, 45.0);
                        _yawDeg = (_yawDeg - details.delta.dx * 0.25) % 360.0;
                        _pitchDeg = (_pitchDeg + details.delta.dy * 0.2).clamp(-65.0, 65.0);
                      });
                    },
                    child: CustomPaint(
                      size: Size.infinite,
                      painter: _EquirectangularViewportPainter(
                        image: _panoImage!,
                        yawDeg: _yawDeg,
                        pitchDeg: _pitchDeg,
                      ),
                    ),
                  ),
          ),
          if (widget.previewToken != null)
            Container(
              color: const Color(0xFF0F172A),
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 18),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _saving ? null : () => Navigator.of(context).pop(false),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: Colors.white24),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      child: const Text('Ulangi'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    flex: 2,
                    child: ElevatedButton(
                      onPressed: _saving ? null : _saveToPin,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFC89D54),
                        foregroundColor: const Color(0xFF090D16),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      child: _saving
                          ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF090D16)))
                          : const Text('Simpan ke Titik Pin', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _EquirectangularViewportPainter extends CustomPainter {
  final ui.Image image;
  final double yawDeg;
  final double pitchDeg;

  _EquirectangularViewportPainter({
    required this.image,
    required this.yawDeg,
    required this.pitchDeg,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final imgW = image.width.toDouble();
    final imgH = image.height.toDouble();

    // Scale panorama cleanly for smooth 360° seamless wraparound
    final viewH = imgH * 0.56;
    final viewW = viewH * (size.width / math.max(1.0, size.height));

    final normYaw = ((yawDeg % 360.0) + 360.0) % 360.0;
    final centerX = (normYaw / 360.0) * imgW;
    final centerY = ((90.0 - pitchDeg) / 180.0) * imgH;

    final top = (centerY - viewH / 2).clamp(0.0, imgH - viewH);
    final left = centerX - viewW / 2;

    final paint = Paint()..filterQuality = FilterQuality.high;

    if (left >= 0 && left + viewW <= imgW) {
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(left, top, viewW, viewH),
        Rect.fromLTWH(0, 0, size.width, size.height),
        paint,
      );
    } else if (left < 0) {
      final w1 = -left;
      final w2 = viewW - w1;
      final splitDst = (w1 / viewW) * size.width;
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(imgW - w1, top, w1, viewH),
        Rect.fromLTWH(0, 0, splitDst, size.height),
        paint,
      );
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(0, top, w2, viewH),
        Rect.fromLTWH(splitDst, 0, size.width - splitDst, size.height),
        paint,
      );
    } else {
      final w1 = imgW - left;
      final w2 = viewW - w1;
      final splitDst = (w1 / viewW) * size.width;
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(left, top, w1, viewH),
        Rect.fromLTWH(0, 0, splitDst, size.height),
        paint,
      );
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(0, top, w2, viewH),
        Rect.fromLTWH(splitDst, 0, size.width - splitDst, size.height),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _EquirectangularViewportPainter oldDelegate) =>
      oldDelegate.yawDeg != yawDeg || oldDelegate.pitchDeg != pitchDeg || oldDelegate.image != image;
}
