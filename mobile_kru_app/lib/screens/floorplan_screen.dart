import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'pin_capture_screen.dart';

class FloorplanScreen extends StatefulWidget {
  final ApiService api;
  final int eventId;
  final String eventTitle;

  const FloorplanScreen({
    Key? key,
    required this.api,
    required this.eventId,
    required this.eventTitle,
  }) : super(key: key);

  @override
  State<FloorplanScreen> createState() => _FloorplanScreenState();
}

class _FloorplanScreenState extends State<FloorplanScreen> {
  Map<String, dynamic>? _event;
  List<Map<String, dynamic>> _pins = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await widget.api.fetchEventDetail(widget.eventId);
      setState(() {
        _event = data['event'] as Map<String, dynamic>;
        _pins = List<Map<String, dynamic>>.from(data['pins'] ?? []);
      });
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _openPin(Map<String, dynamic> pin) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PinCaptureScreen(
          api: widget.api,
          eventTitle: widget.eventTitle,
          pin: pin,
        ),
      ),
    );
    _load();
  }

  @override
  Widget build(BuildContext context) {
    final floorUrl = _event?['floorplan_url'] as String?;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        title: Text(widget.eventTitle, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        actions: [IconButton(icon: const Icon(Icons.refresh), onPressed: _load)],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
              : ListView(
                  padding: const EdgeInsets.all(14),
                  children: [
                    if (floorUrl != null)
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.black12),
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: Column(
                          children: [
                            InteractiveViewer(
                              minScale: 1.0,
                              maxScale: 4.0,
                              child: LayoutBuilder(
                                builder: (context, constraints) {
                                  return Stack(
                                    children: [
                                      Image.network(floorUrl, width: constraints.maxWidth, fit: BoxFit.fitWidth),
                                      Positioned.fill(
                                        child: LayoutBuilder(
                                          builder: (ctx, box) {
                                            return Stack(
                                              children: _pins.map((pin) {
                                                final px = ((pin['pos_x'] as num).toDouble() / 100.0) * box.maxWidth;
                                                final py = ((pin['pos_y'] as num).toDouble() / 100.0) * box.maxHeight;
                                                final seb = (pin['sebelum_count'] ?? 0) as int;
                                                final ses = (pin['sesudah_count'] ?? 0) as int;
                                                final bg = (seb > 0 && ses > 0)
                                                    ? Colors.green.shade700
                                                    : ((seb > 0 || ses > 0) ? const Color(0xFFC89D54) : Colors.red.shade700);
                                                return Positioned(
                                                  left: px - 14,
                                                  top: py - 14,
                                                  child: GestureDetector(
                                                    onTap: () => _openPin(pin),
                                                    child: Container(
                                                      width: 28,
                                                      height: 28,
                                                      decoration: BoxDecoration(
                                                        color: bg,
                                                        shape: BoxShape.circle,
                                                        border: Border.all(color: Colors.white, width: 2),
                                                        boxShadow: const [BoxShadow(color: Colors.black38, blurRadius: 4)],
                                                      ),
                                                      alignment: Alignment.center,
                                                      child: Text(
                                                        '${pin['pin_number']}',
                                                        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                                      ),
                                                    ),
                                                  ),
                                                );
                                              }).toList(),
                                            );
                                          },
                                        ),
                                      ),
                                    ],
                                  );
                                },
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: Text(
                                'Cubit untuk zoom denah · Ketuk nomor pin untuk ambil foto 360°',
                                style: TextStyle(color: Colors.grey.shade700, fontSize: 11),
                              ),
                            ),
                          ],
                        ),
                      ),
                    const SizedBox(height: 16),
                    const Text('Daftar Titik Pin Lokasi', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    ..._pins.map((pin) {
                      final seb = pin['sebelum_count'] ?? 0;
                      final ses = pin['sesudah_count'] ?? 0;
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        child: ListTile(
                          onTap: () => _openPin(pin),
                          leading: CircleAvatar(
                            backgroundColor: const Color(0xFF0F172A),
                            foregroundColor: const Color(0xFFD4AD63),
                            child: Text('${pin['pin_number']}', style: const TextStyle(fontWeight: FontWeight.bold)),
                          ),
                          title: Text(pin['title'].toString(), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          subtitle: Text('Sebelum: $seb · Sesudah: $ses', style: const TextStyle(fontSize: 12)),
                          trailing: const Icon(Icons.camera_alt_rounded, color: Color(0xFFC89D54)),
                        ),
                      );
                    }).toList(),
                  ],
                ),
    );
  }
}
