import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/services.dart';
import 'package:sensors_plus/sensors_plus.dart';

class OrientationSample {
  final double yawDeg;
  final double pitchDeg;
  final double rollDeg;
  final bool hardwareFused;

  const OrientationSample({
    required this.yawDeg,
    required this.pitchDeg,
    required this.rollDeg,
    required this.hardwareFused,
  });
}

/// Hardware-fused 3D orientation service backed by Android's TYPE_ROTATION_VECTOR
/// (same chip-level IMU fusion used by Google Camera Photo Sphere), with automatic
/// fallback to gravity-projected gyroscope+accelerometer fusion when unavailable.
class OrientationService {
  static const EventChannel _rotationChannel = EventChannel('id.ruang360/rotation_vector');

  final StreamController<OrientationSample> _controller = StreamController<OrientationSample>.broadcast();
  Stream<OrientationSample> get stream => _controller.stream;

  StreamSubscription<dynamic>? _nativeSub;
  StreamSubscription<GyroscopeEvent>? _gyroSub;
  StreamSubscription<AccelerometerEvent>? _accelSub;

  double? _zeroYawOffset;
  double _lastRawYaw = 0.0;
  double _yawDeg = 0.0;
  double _pitchDeg = 0.0;
  double _rollDeg = 0.0;

  double _gHatX = 0.0;
  double _gHatY = 1.0;
  double _gHatZ = 0.0;
  bool _accelInit = false;
  int _lastGyroMicros = 0;
  bool _usingFallback = false;

  void start() {
    try {
      _nativeSub = _rotationChannel.receiveBroadcastStream().listen(
        (dynamic event) {
          if (event is List && event.length >= 3) {
            final rawYaw = (event[0] as num).toDouble();
            final pitch = (event[1] as num).toDouble().clamp(-82.0, 82.0);
            final roll = (event[2] as num).toDouble().clamp(-45.0, 45.0);

            _lastRawYaw = rawYaw;
            _zeroYawOffset ??= rawYaw;

            _yawDeg = _normYaw(rawYaw - _zeroYawOffset!);
            _pitchDeg = pitch;
            _rollDeg = roll;

            if (!_controller.isClosed) {
              _controller.add(
                OrientationSample(
                  yawDeg: _yawDeg,
                  pitchDeg: _pitchDeg,
                  rollDeg: _rollDeg,
                  hardwareFused: true,
                ),
              );
            }
          }
        },
        onError: (_) => _startFallbackImu(),
        cancelOnError: true,
      );
    } catch (_) {
      _startFallbackImu();
    }
  }

  void resetZeroHeading() {
    if (!_usingFallback) {
      _zeroYawOffset = _lastRawYaw;
      _yawDeg = 0.0;
    } else {
      _yawDeg = 0.0;
    }
  }

  void _startFallbackImu() {
    if (_usingFallback) return;
    _usingFallback = true;
    _nativeSub?.cancel();
    _nativeSub = null;

    _accelSub = accelerometerEvents.listen((event) {
      final norm = math.sqrt(event.x * event.x + event.y * event.y + event.z * event.z);
      if (norm < 1.0) return;
      final nx = event.x / norm;
      final ny = event.y / norm;
      final nz = event.z / norm;

      if (!_accelInit) {
        _gHatX = nx;
        _gHatY = ny;
        _gHatZ = nz;
        _accelInit = true;
      } else {
        _gHatX = _gHatX * 0.85 + nx * 0.15;
        _gHatY = _gHatY * 0.85 + ny * 0.15;
        _gHatZ = _gHatZ * 0.85 + nz * 0.15;
      }

      final pitchAcc = math.atan2(-_gHatZ, math.sqrt(_gHatX * _gHatX + _gHatY * _gHatY)) * 180.0 / math.pi;
      final rollAcc = math.atan2(_gHatX, _gHatY) * 180.0 / math.pi;
      _pitchDeg = _pitchDeg * 0.88 + pitchAcc.clamp(-80.0, 80.0) * 0.12;
      _rollDeg = _rollDeg * 0.85 + rollAcc.clamp(-45.0, 45.0) * 0.15;
    });

    _gyroSub = gyroscopeEvents.listen((event) {
      final nowMicros = DateTime.now().microsecondsSinceEpoch;
      if (_lastGyroMicros == 0) {
        _lastGyroMicros = nowMicros;
        return;
      }
      final dt = (nowMicros - _lastGyroMicros) / 1e6;
      _lastGyroMicros = nowMicros;
      if (dt <= 0 || dt > 0.25) return;

      final gx = event.x.abs() < 0.015 ? 0.0 : event.x;
      final gy = event.y.abs() < 0.015 ? 0.0 : event.y;
      final gz = event.z.abs() < 0.015 ? 0.0 : event.z;

      final worldYawRadPerSec = -(gx * _gHatX + gy * _gHatY + gz * _gHatZ);
      _yawDeg = _normYaw(_yawDeg + worldYawRadPerSec * (180.0 / math.pi) * dt);
      _pitchDeg = (_pitchDeg + gx * (180.0 / math.pi) * dt).clamp(-80.0, 80.0);

      if (!_controller.isClosed) {
        _controller.add(
          OrientationSample(
            yawDeg: _yawDeg,
            pitchDeg: _pitchDeg,
            rollDeg: _rollDeg,
            hardwareFused: false,
          ),
        );
      }
    });
  }

  double _normYaw(double deg) => ((deg + 180.0) % 360.0 + 360.0) % 360.0 - 180.0;

  void dispose() {
    _nativeSub?.cancel();
    _gyroSub?.cancel();
    _accelSub?.cancel();
    _controller.close();
  }
}
