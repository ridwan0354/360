package id.ruang360.ruang360_kru

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import kotlin.math.asin
import kotlin.math.atan2

class MainActivity : FlutterActivity() {
    private val rotationChannelName = "id.ruang360/rotation_vector"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        EventChannel(flutterEngine.dartExecutor.binaryMessenger, rotationChannelName)
            .setStreamHandler(object : EventChannel.StreamHandler {
                private var sensorManager: SensorManager? = null
                private var listener: SensorEventListener? = null

                override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
                    val sm = getSystemService(Context.SENSOR_SERVICE) as SensorManager
                    sensorManager = sm
                    val rotSensor = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
                        ?: sm.getDefaultSensor(Sensor.TYPE_GAME_ROTATION_VECTOR)

                    if (rotSensor == null) {
                        events?.error("UNAVAILABLE", "Hardware rotation vector sensor not available", null)
                        return
                    }

                    val rotMat = FloatArray(9)
                    val sensorListener = object : SensorEventListener {
                        override fun onSensorChanged(event: SensorEvent) {
                            SensorManager.getRotationMatrixFromVector(rotMat, event.values)

                            // World ENU (+X=East, +Y=North, +Z=Up). Rear camera looks along phone -Z = -col2.
                            val fwdX = -rotMat[2].toDouble()
                            val fwdY = -rotMat[5].toDouble()
                            val fwdZ = -rotMat[8].toDouble()

                            // Gimbal-safe heading near zenith/nadir poles
                            val yawRad = when {
                                fwdZ > 0.94 -> atan2(-rotMat[1].toDouble(), -rotMat[4].toDouble())
                                fwdZ < -0.94 -> atan2(rotMat[1].toDouble(), rotMat[4].toDouble())
                                else -> atan2(fwdX, fwdY)
                            }
                            val pitchRad = asin(fwdZ.coerceIn(-1.0, 1.0))
                            // World-up expressed in phone coords is row 2: (rotMat[6], rotMat[7], rotMat[8])
                            val rollRad = atan2(rotMat[6].toDouble(), rotMat[7].toDouble())

                            events?.success(
                                listOf(
                                    Math.toDegrees(yawRad),
                                    Math.toDegrees(pitchRad),
                                    Math.toDegrees(rollRad),
                                    1.0
                                )
                            )
                        }

                        override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
                    }

                    listener = sensorListener
                    sm.registerListener(sensorListener, rotSensor, SensorManager.SENSOR_DELAY_GAME)
                }

                override fun onCancel(arguments: Any?) {
                    listener?.let { sensorManager?.unregisterListener(it) }
                    listener = null
                }
            })
    }
}
