import 'package:flutter/material.dart';
import 'screens/events_screen.dart';
import 'screens/login_screen.dart';
import 'services/api_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final api = ApiService();
  await api.init();
  runApp(Ruang360KruApp(api: api));
}

class Ruang360KruApp extends StatelessWidget {
  final ApiService api;
  const Ruang360KruApp({Key? key, required this.api}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ruang360° Kru',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF0F172A),
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFC89D54)),
      ),
      home: api.token != null ? EventsScreen(api: api) : LoginScreen(api: api),
    );
  }
}
