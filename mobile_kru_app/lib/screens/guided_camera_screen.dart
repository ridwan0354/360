import 'dart:async';
import 'dart:io';
import 'dart:math' as math;
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/api_service.dart';
import '../services/orientation_service.dart';
import 'panorama_preview_screen.dart';

class _TargetDot {
  final String id;
  final String ring; // horizon | upper | lower
  final double yawDeg;
  final double pitchDeg;
  bool captured = false;

  _TargetDot(this.id, this.ring, this.yawDeg, this.pitchDeg);
}

class _CapturedShot {
  final File file;
  final String ring;
  final double yaw;
  final double pitch;
  final double roll;

  _CapturedShot({
    required this.file,
    required this.ring,
    required this.yaw,
    required this.pitch,
    required this.roll,
  });
}

class GuidedCameraScreen extends StatefulWidget {
  final ApiService api;
  final int pinId;
  final int pinNumber;
  final String pinTitle;
  final String phase;
  final String angleLabel;

  const GuidedCameraScreen({
    Key? key,
    required this.api,
    required this.pinId,
    required this.pinNumber,
    required this.pinTitle,
    required this.phase,
    required this.angleLabel,
  }) : super(key: key);

  @override
  State<GuidedCameraScreen> createState() => _GuidedCameraScreenState();
}

class _GuidedCameraScreenState extends State<GuidedCameraScreen> {
  CameraController? _controller;
  bool _cameraReady = false;
  bool _exposureLocked = false;
  bool _takingPhoto = false;
  bool _stitching = false;
  bool _capsUnlocked = false; // Stage 2: unlocks Upper (ceiling) & Lower (floor) dots cleanly after horizon ring!
  String _statusText = 'Tahap 1/2 · Putar pelan di poros lensa HP ikuti 12 bulatan KUNING.';

  final OrientationService _orientation = OrientationService();
  StreamSubscription<OrientationSample>? _orientSub;
  bool _hardwareFused = false;

  double _yawDeg = 0.0;
  double _pitchDeg = 0.0;
  double _rollDeg = 0.0;

  late final List<_TargetDot> _targets;
  final List<_CapturedShot> _shots = [];

  String? _dwellTargetId;
  int _dwellStartMs = 0;
  double _dwellProgress = 0;
  bool _flashVisible = false;

  @override
  void initState() {
    super.initState();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    _targets = [
      for (int i = 0; i < 12; i++) _TargetDot('h-$i', 'horizon', _normYaw(i * 30.0), 0.0),
      // 8 shots at 45° spacing (±38° pitch) guarantees full 360° overlap with ZERO triangular ceiling/floor gaps!
      for (int i = 0; i < 8; i++) _TargetDot('u-$i', 'upper', _normYaw(i * 45.0), 38.0),
      for (int i = 0; i < 8; i++) _TargetDot('d-$i', 'lower', _normYaw(i * 45.0), -38.0),
    ];
    _initCamera();
    _initImuSensors();
  }

  List<_TargetDot> get _activeTargets =>
      _capsUnlocked ? _targets : _targets.where((t) => t.ring == 'horizon').toList();

  Future<void> _initCamera() async {
    try {
      final cameras = await availableCameras();
      final rear = cameras.firstWhere(
        (c) => c.lensDirection == CameraLensDirection.back,
        orElse: () => cameras.first,
      );
      // Upgrade to veryHigh (1080p+/sharp sensor resolution) for crisp 4K stitched panoramas!
      final ctrl = CameraController(
        rear,
        ResolutionPreset.veryHigh,
        enableAudio: false,
        imageFormatGroup: ImageFormatGroup.jpeg,
      );
      await ctrl.initialize();
      await ctrl.setFlashMode(FlashMode.off);

      if (!mounted) {
        await ctrl.dispose();
        return;
      }
      setState(() {
        _controller = ctrl;
        _cameraReady = true;
      });
    } catch (e) {
      if (mounted) {
        setState(() => _statusText = 'Gagal membuka kamera: $e');
      }
    }
  }

  void _initImuSensors() {
    _orientation.start();
    _orientSub = _orientation.stream.listen((sample) {
      _yawDeg = sample.yawDeg;
      _pitchDeg = sample.pitchDeg;
      _rollDeg = sample.rollDeg;
      _hardwareFused = sample.hardwareFused;
      _checkDwellAutoCapture();
      if (mounted) setState(() {});
    });
  }

  void _checkDwellAutoCapture() {
    if (!_cameraReady || _takingPhoto || _stitching) return;

    final target = _findNearestUncaptured(7.5);
    if (target == null) {
      _dwellTargetId = null;
      _dwellProgress = 0;
      return;
    }

    final nowMs = DateTime.now().millisecondsSinceEpoch;
    if (_dwellTargetId != target.id) {
      _dwellTargetId = target.id;
      _dwellStartMs = nowMs;
      _dwellProgress = 0;
      return;
    }

    final elapsed = nowMs - _dwellStartMs;
    _dwellProgress = (elapsed / 300.0).clamp(0.0, 1.0);
    if (_dwellProgress >= 1.0) {
      _dwellTargetId = null;
      _dwellProgress = 0;
      _captureShot(target);
    }
  }

  _TargetDot? _findNearestUncaptured(double maxDeg) {
    _TargetDot? best;
    double bestDist = double.infinity;
    for (final t in _activeTargets) {
      if (t.captured) continue;
      final dy = _normYaw(t.yawDeg - _yawDeg).abs();
      final dp = (t.pitchDeg - _pitchDeg).abs();
      final dist = math.sqrt(dy * dy + dp * dp);
      if (dist < maxDeg && dist < bestDist) {
        bestDist = dist;
        best = t;
      }
    }
    return best;
  }

  void _resetZeroHeading() {
    _orientation.resetZeroHeading();
    setState(() {
      _yawDeg = 0;
      _dwellTargetId = null;
      _dwellProgress = 0;
    });
  }

  Future<void> _toggleExposureLock(bool lock) async {
    final ctrl = _controller;
    if (ctrl == null || !ctrl.value.isInitialized) return;
    try {
      await ctrl.setExposureMode(lock ? ExposureMode.locked : ExposureMode.auto);
      await ctrl.setFocusMode(lock ? FocusMode.locked : FocusMode.auto);
      if (mounted) setState(() => _exposureLocked = lock);
    } catch (_) {}
  }

  Future<void> _captureShot(_TargetDot? target) async {
    final ctrl = _controller;
    if (ctrl == null || !ctrl.value.isInitialized || _takingPhoto || _stitching) return;

    setState(() => _takingPhoto = true);
    try {
      if (_shots.isEmpty && !_exposureLocked) {
        await _toggleExposureLock(true);
      }

      final snapYaw = _yawDeg;
      final snapPitch = _pitchDeg;
      final snapRoll = _rollDeg;
      final ring = target?.ring ?? (snapPitch > 20 ? 'upper' : (snapPitch < -20 ? 'lower' : 'horizon'));

      final xfile = await ctrl.takePicture();

      _shots.add(
        _CapturedShot(
          file: File(xfile.path),
          ring: ring,
          yaw: snapYaw,
          pitch: snapPitch,
          roll: snapRoll,
        ),
      );
      if (target != null) target.captured = true;

      final horizonDone = _targets.where((t) => t.ring == 'horizon').every((t) => t.captured);
      if (horizonDone && !_capsUnlocked) {
        _capsUnlocked = true;
      }

      if (mounted) {
        setState(() {
          _flashVisible = true;
          if (!_capsUnlocked) {
            final hc = _targets.where((t) => t.ring == 'horizon' && t.captured).length;
            _statusText = 'Tahap 1/2 · Bagus! Putar ke kanan mengikuti bulatan KUNING ($hc/12).';
          } else if (!_targets.every((t) => t.captured)) {
            _statusText = 'Tahap 2/2 · Dongak (8 BIRU plafon) & tunduk (8 UNGU lantai), atau tekan Jahit 4K sekarang.';
          } else {
            _statusText = '28 titik penuh lengkap! Menjahit 4K Full-Sphere...';
          }
        });
        Future.delayed(const Duration(milliseconds: 100), () {
          if (mounted) setState(() => _flashVisible = false);
        });
      }

      if (_targets.every((t) => t.captured)) {
        await _stitchOnServer();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Gagal memotret: $e')));
      }
    } finally {
      if (mounted) setState(() => _takingPhoto = false);
    }
  }

  Future<void> _stitchOnServer() async {
    final horizonCount = _shots.where((s) => s.ring == 'horizon').length;
    if (horizonCount < 3 || _stitching) return;

    setState(() {
      _stitching = true;
      _statusText = 'Mengirim ${_shots.length} foto HD ke Server OpenCV 4K...';
    });

    try {
      final result = await widget.api.stitchPinFrames(
        pinId: widget.pinId,
        phase: widget.phase,
        angleLabel: widget.angleLabel,
        frameFiles: _shots.map((s) => s.file).toList(),
        poses: _shots
            .map((s) => {'ring': s.ring, 'yaw': s.yaw, 'pitch': s.pitch, 'roll': s.roll})
            .toList(),
        previewOnly: true,
      );

      if (!mounted) return;
      final saved = await Navigator.of(context).push<bool>(
        MaterialPageRoute(
          builder: (_) => PanoramaPreviewScreen(
            api: widget.api,
            pinId: widget.pinId,
            phase: widget.phase,
            angleLabel: widget.angleLabel,
            imageUrl: result['preview_url'] as String,
            previewToken: result['preview_token'] as String,
            stitchEngine: (result['stitch_meta']?['engine'] ?? 'opencv_4k').toString(),
          ),
        ),
      );

      if (saved == true && mounted) {
        Navigator.of(context).pop(true);
      } else if (mounted) {
        setState(() {
          _stitching = false;
          _statusText = 'Anda bisa menambah foto plafon/lantai atau jahit ulang.';
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _stitching = false;
          _statusText = 'Gagal menjahit: ${e.toString().replaceFirst('Exception: ', '')}';
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceFirst('Exception: ', '')), backgroundColor: Colors.redAccent),
        );
      }
    }
  }

  double _normYaw(double deg) {
    return ((deg + 180.0) % 360.0 + 360.0) % 360.0 - 180.0;
  }

  @override
  void dispose() {
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    _orientSub?.cancel();
    _orientation.dispose();
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final hCount = _targets.where((t) => t.ring == 'horizon' && t.captured).length;
    final uCount = _targets.where((t) => t.ring == 'upper' && t.captured).length;
    final dCount = _targets.where((t) => t.ring == 'lower' && t.captured).length;

    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          fit: StackFit.expand,
          children: [
            if (_cameraReady && _controller != null)
              CameraPreview(_controller!)
            else
              const Center(child: CircularProgressIndicator(color: Color(0xFFC89D54))),

            IgnorePointer(
              child: CustomPaint(
                painter: _GuidedOverlayPainter(
                  targets: _activeTargets,
                  yawDeg: _yawDeg,
                  pitchDeg: _pitchDeg,
                  rollDeg: _rollDeg,
                  dwellProgress: _dwellProgress,
                ),
              ),
            ),

            if (_flashVisible) Container(color: Colors.white.withOpacity(0.55)),

            // Top HUD
            Positioned(
              top: 10,
              left: 12,
              right: 12,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.74),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.white12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            'Pin #${widget.pinNumber} · ${widget.pinTitle} (${widget.phase.toUpperCase()})',
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => _toggleExposureLock(!_exposureLocked),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: _exposureLocked ? Colors.green.shade700 : Colors.white12,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              _exposureLocked ? '🔒 AE/AF' : '🔓 AE/AF',
                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        GestureDetector(
                          onTap: () => Navigator.of(context).pop(false),
                          child: const Icon(Icons.close, color: Colors.white),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(_statusText, style: const TextStyle(color: Colors.white70, fontSize: 11)),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          _capsUnlocked
                              ? 'Tengah: $hCount/12 · Atas: $uCount/8 · Bawah: $dCount/8${_hardwareFused ? ' · 3D IMU' : ''}'
                              : 'Tengah (Kuning): $hCount/12 · 4K 3D${_hardwareFused ? ' · IMU' : ''}',
                          style: const TextStyle(color: Color(0xFFD4AD63), fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                        if (_shots.isEmpty)
                          GestureDetector(
                            onTap: _resetZeroHeading,
                            child: const Text('Reset 0°', style: TextStyle(color: Colors.lightBlueAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                          )
                        else if (!_capsUnlocked && hCount >= 6)
                          GestureDetector(
                            onTap: () => setState(() {
                              _capsUnlocked = true;
                              _statusText = 'Tahap 2/2 · Dongak (8 BIRU plafon) & tunduk (8 UNGU lantai).';
                            }),
                            child: const Text('+ Buka Atas/Bawah', style: TextStyle(color: Colors.lightBlueAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // Bottom Controls
            Positioned(
              bottom: 18,
              left: 14,
              right: 14,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlinedButton.icon(
                    onPressed: (_takingPhoto || _stitching) ? null : () => _captureShot(_findNearestUncaptured(22)),
                    icon: const Icon(Icons.camera, size: 18),
                    label: const Text('Tangkap'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: Colors.black54,
                      side: const BorderSide(color: Colors.white38),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                  if (_shots.where((s) => s.ring == 'horizon').length >= 3)
                    ElevatedButton.icon(
                      onPressed: _stitching ? null : _stitchOnServer,
                      icon: const Icon(Icons.auto_awesome, size: 18),
                      label: Text('Jahit 4K (${_shots.length} foto)'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        foregroundColor: const Color(0xFF090D16),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        textStyle: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                ],
              ),
            ),

            if (_stitching)
              Container(
                color: Colors.black.withOpacity(0.84),
                alignment: Alignment.center,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const CircularProgressIndicator(color: Color(0xFFC89D54)),
                    const SizedBox(height: 16),
                    Text(
                      'Menjahit ${_shots.length} foto HD ke Panorama 4K...',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'OpenCV 4K 3D Bundle Adjustment + GraphCut + Multi-Band',
                      style: TextStyle(color: Color(0xFFD4AD63), fontSize: 12),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _GuidedOverlayPainter extends CustomPainter {
  final List<_TargetDot> targets;
  final double yawDeg;
  final double pitchDeg;
  final double rollDeg;
  final double dwellProgress;

  _GuidedOverlayPainter({
    required this.targets,
    required this.yawDeg,
    required this.pitchDeg,
    required this.rollDeg,
    required this.dwellProgress,
  });

  double _normYaw(double deg) => ((deg + 180.0) % 360.0 + 360.0) % 360.0 - 180.0;

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;

    const fovX = 50.0;
    const fovY = 68.0;
    final horizonY = cy + (pitchDeg / fovY) * size.height;
    final isLevel = pitchDeg.abs() < 8 && rollDeg.abs() < 8;

    if (horizonY > 40 && horizonY < size.height - 40) {
      canvas.drawLine(
        Offset(size.width * 0.1, horizonY),
        Offset(size.width * 0.9, horizonY),
        Paint()
          ..color = isLevel ? Colors.greenAccent.withOpacity(0.65) : Colors.amber.withOpacity(0.4)
          ..strokeWidth = 2.0,
      );
    }

    for (final t in targets) {
      final dy = _normYaw(t.yawDeg - yawDeg);
      final dp = t.pitchDeg - pitchDeg;
      if (dy.abs() > fovX * 0.72 || dp.abs() > fovY * 0.72) continue;

      final sx = cx + (dy / fovX) * size.width;
      final sy = cy - (dp / fovY) * size.height;

      Color fill;
      Color stroke;
      if (t.captured) {
        fill = const Color(0xFF10B981).withOpacity(0.9);
        stroke = Colors.greenAccent;
      } else if (t.ring == 'horizon') {
        fill = Colors.amber.withOpacity(0.35);
        stroke = Colors.amberAccent;
      } else if (t.ring == 'upper') {
        fill = Colors.lightBlueAccent.withOpacity(0.35);
        stroke = Colors.lightBlueAccent;
      } else {
        fill = Colors.purpleAccent.withOpacity(0.35);
        stroke = Colors.purpleAccent;
      }

      final r = t.captured ? 12.0 : 18.0;
      canvas.drawCircle(Offset(sx, sy), r, Paint()..color = fill);
      canvas.drawCircle(
        Offset(sx, sy),
        r,
        Paint()
          ..color = stroke
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.5,
      );
    }

    canvas.drawCircle(
      Offset(cx, cy),
      24,
      Paint()
        ..color = dwellProgress > 0 ? Colors.greenAccent : Colors.white.withOpacity(0.92)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3,
    );

    if (dwellProgress > 0) {
      canvas.drawArc(
        Rect.fromCircle(center: Offset(cx, cy), radius: 24),
        -math.pi / 2,
        dwellProgress * math.pi * 2,
        false,
        Paint()
          ..color = Colors.amberAccent
          ..style = PaintingStyle.stroke
          ..strokeWidth = 4.5,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _GuidedOverlayPainter oldDelegate) => true;
}
