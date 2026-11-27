import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String defaultServerUrl = 'https://360.galipatsistem.com';
  static const String localServerUrl = 'http://192.168.1.38:8010';
  static const String _keyServerUrl = 'server_url';
  static const String _keyToken = 'auth_token';
  static const String _keyUser = 'auth_user';

  String baseUrl = defaultServerUrl;
  String? token;
  Map<String, dynamic>? user;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    baseUrl = prefs.getString(_keyServerUrl) ?? defaultServerUrl;
    token = prefs.getString(_keyToken);
    final userRaw = prefs.getString(_keyUser);
    if (userRaw != null && userRaw.isNotEmpty) {
      try {
        user = jsonDecode(userRaw) as Map<String, dynamic>;
      } catch (_) {
        user = null;
      }
    }
  }

  Future<void> saveServerUrl(String url) async {
    final cleaned = url.trim().replaceAll(RegExp(r'/+$'), '');
    baseUrl = cleaned.isEmpty ? defaultServerUrl : cleaned;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyServerUrl, baseUrl);
  }

  Map<String, String> _headers({bool jsonContent = true}) {
    return {
      'Accept': 'application/json',
      if (jsonContent) 'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final uri = Uri.parse('$baseUrl/api/login');
    final resp = await http
        .post(
          uri,
          headers: _headers(),
          body: jsonEncode({
            'email': email.trim(),
            'password': password,
            'device_name': 'ruang360-flutter-kru',
          }),
        )
        .timeout(const Duration(seconds: 15));

    final data = _decodeJson(resp);
    if (resp.statusCode != 200 || data['token'] == null) {
      throw Exception(data['message'] ?? 'Login gagal (${resp.statusCode}).');
    }

    token = data['token'] as String;
    user = data['user'] as Map<String, dynamic>;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyToken, token!);
    await prefs.setString(_keyUser, jsonEncode(user));
    return data;
  }

  Future<void> logout() async {
    try {
      if (token != null) {
        await http
            .post(Uri.parse('$baseUrl/api/logout'), headers: _headers())
            .timeout(const Duration(seconds: 5));
      }
    } catch (_) {}
    token = null;
    user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_keyToken);
    await prefs.remove(_keyUser);
  }

  Future<List<Map<String, dynamic>>> fetchEvents() async {
    final resp = await http
        .get(Uri.parse('$baseUrl/api/events'), headers: _headers())
        .timeout(const Duration(seconds: 15));
    final data = _decodeJson(resp);
    if (resp.statusCode != 200) {
      throw Exception(data['message'] ?? 'Gagal memuat daftar event.');
    }
    return List<Map<String, dynamic>>.from(data['events'] ?? []);
  }

  Future<Map<String, dynamic>> fetchEventDetail(int eventId) async {
    final resp = await http
        .get(Uri.parse('$baseUrl/api/events/$eventId'), headers: _headers())
        .timeout(const Duration(seconds: 15));
    final data = _decodeJson(resp);
    if (resp.statusCode != 200) {
      throw Exception(data['message'] ?? 'Gagal memuat detail denah event.');
    }
    return data;
  }

  Future<Map<String, dynamic>> stitchPinFrames({
    required int pinId,
    required String phase,
    required String angleLabel,
    required List<File> frameFiles,
    required List<Map<String, dynamic>> poses,
    bool previewOnly = true,
  }) async {
    final uri = Uri.parse('$baseUrl/api/pins/$pinId/stitch');
    final request = http.MultipartRequest('POST', uri);
    request.headers.addAll(_headers(jsonContent: false));
    request.fields['phase'] = phase;
    request.fields['angle_label'] = angleLabel;
    request.fields['preview_only'] = previewOnly ? '1' : '0';
    request.fields['poses_json'] = jsonEncode(poses);

    for (var i = 0; i < frameFiles.length; i++) {
      final f = frameFiles[i];
      request.files.add(
        await http.MultipartFile.fromPath(
          'frames[]',
          f.path,
          filename: 'frame_${i.toString().padLeft(3, '0')}.jpg',
        ),
      );
    }

    final streamed = await request.send().timeout(const Duration(seconds: 120));
    final resp = await http.Response.fromStream(streamed);
    final data = _decodeJson(resp);
    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      throw Exception(data['message'] ?? 'Server OpenCV gagal menjahit panorama (${resp.statusCode}).');
    }
    return data;
  }

  Future<Map<String, dynamic>> confirmSavePreview({
    required int pinId,
    required String phase,
    required String angleLabel,
    required String previewToken,
  }) async {
    final resp = await http
        .post(
          Uri.parse('$baseUrl/api/pins/$pinId/photos'),
          headers: _headers(),
          body: jsonEncode({
            'phase': phase,
            'angle_label': angleLabel,
            'preview_token': previewToken,
          }),
        )
        .timeout(const Duration(seconds: 30));
    final data = _decodeJson(resp);
    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      throw Exception(data['message'] ?? 'Gagal menyimpan panorama.');
    }
    return data;
  }

  Future<Map<String, dynamic>> uploadSinglePanorama({
    required int pinId,
    required String phase,
    required String angleLabel,
    required String filePath,
  }) async {
    final uri = Uri.parse('$baseUrl/api/pins/$pinId/photos');
    final request = http.MultipartRequest('POST', uri);
    request.headers.addAll(_headers(jsonContent: false));
    request.fields['phase'] = phase;
    request.fields['angle_label'] = angleLabel;
    request.files.add(await http.MultipartFile.fromPath('photo', filePath));

    final streamed = await request.send().timeout(const Duration(seconds: 60));
    final resp = await http.Response.fromStream(streamed);
    final data = _decodeJson(resp);
    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      throw Exception(data['message'] ?? 'Gagal mengunggah foto.');
    }
    return data;
  }

  Future<void> deletePhoto(int photoId) async {
    final resp = await http
        .delete(Uri.parse('$baseUrl/api/photos/$photoId'), headers: _headers())
        .timeout(const Duration(seconds: 15));
    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      final data = _decodeJson(resp);
      throw Exception(data['message'] ?? 'Gagal menghapus foto.');
    }
  }

  Map<String, dynamic> _decodeJson(http.Response resp) {
    try {
      final parsed = jsonDecode(resp.body);
      if (parsed is Map<String, dynamic>) return parsed;
      return {'message': resp.body};
    } catch (_) {
      return {'message': 'Respon server tidak valid (${resp.statusCode}).'};
    }
  }
}
