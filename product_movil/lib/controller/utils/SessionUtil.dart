import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SessionUtil {
  final storage = FlutterSecureStorage();

  Future<void> add(String key, String value) async {
    await storage.write(key: key, value: value);
  }

  Future<void> removeItem(String key) async {
    await storage.delete(key: key);
  }

  Future<void> removeAll() async {
    await storage.deleteAll();
  }

  Future<String?> getValue(String key) async {
    return storage.read(key: key);
  }
}
