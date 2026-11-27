import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../services/api_service.dart';
import 'guided_camera_screen.dart';
import 'panorama_preview_screen.dart';

class PinCaptureScreen extends StatefulWidget {
  final ApiService api;
  final String eventTitle;
  final Map<String, dynamic> pin;

  const PinCaptureScreen({
    Key? key,
    required this.api,
    required this.eventTitle,
    required this.pin,
  }) : super(key: key);

  @override
  State<PinCaptureScreen> createState() => _PinCaptureScreenState();
}

class _PinCaptureScreenState extends State<PinCaptureScreen> {
  String _phase = 'sebelum';
  final _angleCtrl = TextEditingController();
  late List<Map<String, dynamic>> _sebelum;
  late List<Map<String, dynamic>> _sesudah;
  bool _uploading = false;

  @override
  void initState() {
    super.initState();
    _sebelum = List<Map<String, dynamic>>.from(widget.pin['sebelum'] ?? []);
    _sesudah = List<Map<String, dynamic>>.from(widget.pin['sesudah'] ?? []);
  }

  @override
  void dispose() {
    _angleCtrl.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _currentList => _phase == 'sebelum' ? _sebelum : _sesudah;

  Future<void> _openNativeCamera360() async {
    final saved = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => GuidedCameraScreen(
          api: widget.api,
          pinId: widget.pin['id'] as int,
          pinNumber: widget.pin['pin_number'] as int,
          pinTitle: widget.pin['title'].toString(),
          phase: _phase,
          angleLabel: _angleCtrl.text.trim(),
        ),
      ),
    );
    if (saved == true && mounted) {
      Navigator.of(context).pop();
    }
  }

  Future<void> _pickFromGallery() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.gallery, imageQuality: 92);
    if (picked == null) return;

    setState(() => _uploading = true);
    try {
      final res = await widget.api.uploadSinglePanorama(
        pinId: widget.pin['id'] as int,
        phase: _phase,
        angleLabel: _angleCtrl.text.trim(),
        filePath: picked.path,
      );
      final photo = res['photo'] as Map<String, dynamic>;
      setState(() {
        _currentList.add(photo);
        _angleCtrl.clear();
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Foto panorama berhasil diunggah!'), backgroundColor: Colors.green),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$e'), backgroundColor: Colors.redAccent));
      }
    } finally {
      if (mounted) setState(() => _uploading = false);
    }
  }

  Future<void> _deletePhoto(Map<String, dynamic> ph) async {
    try {
      await widget.api.deletePhoto(ph['id'] as int);
      setState(() => _currentList.removeWhere((x) => x['id'] == ph['id']));
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$e'), backgroundColor: Colors.redAccent));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Pin #${widget.pin['pin_number']} · ${widget.pin['title']}', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            Text(widget.eventTitle, style: const TextStyle(fontSize: 11, color: Color(0xFFD4AD63))),
          ],
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Phase Toggle
          Container(
            padding: const EdgeInsets.all(5),
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                _phaseTab('sebelum', 'Fase Sebelum (${_sebelum.length})'),
                _phaseTab('sesudah', 'Fase Sesudah (${_sesudah.length})'),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Capture Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.black12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text('Rekam Panorama 360° Native', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                const Text(
                  'Kamera native mengunci exposure & fokus lalu mengirim frame mentah ke Server OpenCV 3D agar sambungan rapi & mulus.',
                  style: TextStyle(fontSize: 12, color: Colors.black54),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _angleCtrl,
                  decoration: InputDecoration(
                    labelText: 'Label Sudut Pandang (Opsional)',
                    hintText: 'Contoh: Tampak Depan / Tengah Ruangan',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    isDense: true,
                  ),
                ),
                const SizedBox(height: 14),
                ElevatedButton.icon(
                  onPressed: _uploading ? null : _openNativeCamera360,
                  icon: const Icon(Icons.threesixty_rounded),
                  label: const Text('Buka Kamera 360° Native (OpenCV 3D)', style: TextStyle(fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF0F172A),
                    foregroundColor: const Color(0xFFD4AD63),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),
                const SizedBox(height: 10),
                OutlinedButton.icon(
                  onPressed: _uploading ? null : _pickFromGallery,
                  icon: const Icon(Icons.photo_library_outlined, size: 18),
                  label: Text(_uploading ? 'Mengunggah...' : 'Unggah Panorama dari Galeri'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF0F172A),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),

          Text('Foto Tersimpan — Fase ${_phase.toUpperCase()}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          if (_currentList.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 28),
              child: Center(child: Text('Belum ada foto 360° pada fase ini.', style: TextStyle(color: Colors.black45))),
            )
          else
            ..._currentList.map((ph) {
              return Card(
                margin: const EdgeInsets.only(bottom: 10),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                clipBehavior: Clip.antiAlias,
                child: Column(
                  children: [
                    Image.network(ph['thumb_url'].toString(), height: 130, width: double.infinity, fit: BoxFit.cover),
                    ListTile(
                      dense: true,
                      title: Text(ph['angle_label'].toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (_) => PanoramaPreviewScreen(
                                    api: widget.api,
                                    pinId: widget.pin['id'] as int,
                                    phase: _phase,
                                    angleLabel: ph['angle_label'].toString(),
                                    imageUrl: ph['image_url'].toString(),
                                  ),
                                ),
                              );
                            },
                            child: const Text('Lihat 360°'),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 20),
                            onPressed: () => _deletePhoto(ph),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
        ],
      ),
    );
  }

  Widget _phaseTab(String key, String label) {
    final active = _phase == key;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _phase = key),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 11),
          decoration: BoxDecoration(
            color: active ? (key == 'sebelum' ? const Color(0xFF0F172A) : const Color(0xFFC89D54)) : Colors.transparent,
            borderRadius: BorderRadius.circular(11),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 13,
              color: active ? (key == 'sebelum' ? Colors.white : const Color(0xFF090D16)) : Colors.black54,
            ),
          ),
        ),
      ),
    );
  }
}
