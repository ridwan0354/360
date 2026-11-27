import 'package:flutter_test/flutter_test.dart';
import 'package:ruang360_kru/main.dart';
import 'package:ruang360_kru/services/api_service.dart';

void main() {
  testWidgets('Ruang360 Kru renders login screen', (WidgetTester tester) async {
    final api = ApiService();
    await tester.pumpWidget(Ruang360KruApp(api: api));
    expect(find.text('Ruang360° Kru'), findsOneWidget);
  });
}
