import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'floorplan_screen.dart';
import 'login_screen.dart';

class EventsScreen extends StatefulWidget {
  final ApiService api;
  const EventsScreen({Key? key, required this.api}) : super(key: key);

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  List<Map<String, dynamic>> _events = [];
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
      final list = await widget.api.fetchEvents();
      setState(() => _events = list);
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _logout() async {
    await widget.api.logout();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => LoginScreen(api: widget.api)),
      (_) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final userName = widget.api.user?['name'] ?? 'Kru Lapangan';
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Event Ditugaskan', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text(userName.toString(), style: const TextStyle(fontSize: 11, color: Color(0xFFD4AD63))),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: _load),
          IconButton(icon: const Icon(Icons.logout), onPressed: _logout),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(_error!, textAlign: TextAlign.center, style: const TextStyle(color: Colors.red)),
                        const SizedBox(height: 12),
                        ElevatedButton(onPressed: _load, child: const Text('Coba Lagi')),
                      ],
                    ),
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _events.length,
                    itemBuilder: (context, idx) {
                      final ev = _events[idx];
                      final stats = (ev['stats'] as Map<String, dynamic>?) ?? {};
                      final pct = (stats['progress_percent'] ?? 0) as int;
                      final filled = stats['filled_pins'] ?? 0;
                      final total = stats['total_pins'] ?? 0;
                      final floorUrl = ev['floorplan_url'] as String?;

                      return Card(
                        margin: const EdgeInsets.only(bottom: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                        clipBehavior: Clip.antiAlias,
                        elevation: 2,
                        child: InkWell(
                          onTap: () async {
                            await Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => FloorplanScreen(api: widget.api, eventId: ev['id'] as int, eventTitle: ev['title'].toString()),
                              ),
                            );
                            _load();
                          },
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (floorUrl != null)
                                SizedBox(
                                  height: 150,
                                  width: double.infinity,
                                  child: Image.network(floorUrl, fit: BoxFit.cover),
                                ),
                              Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFF0F172A),
                                            borderRadius: BorderRadius.circular(20),
                                          ),
                                          child: Text(
                                            (ev['status'] ?? 'aktif').toString().toUpperCase(),
                                            style: const TextStyle(color: Color(0xFFD4AD63), fontSize: 10, fontWeight: FontWeight.bold),
                                          ),
                                        ),
                                        Text('$filled / $total Pin ($pct%)', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    Text(ev['title'].toString(), style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                                    const SizedBox(height: 2),
                                    Text(ev['venue_name'].toString(), style: const TextStyle(fontSize: 13, color: Colors.black54)),
                                    const SizedBox(height: 10),
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(6),
                                      child: LinearProgressIndicator(
                                        value: pct / 100.0,
                                        minHeight: 7,
                                        backgroundColor: Colors.grey.shade200,
                                        valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFC89D54)),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
