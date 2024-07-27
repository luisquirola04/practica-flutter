import 'ResponseGeneric.dart';

class Session extends ResponseGeneric {
  String token = '';
  String user = '';
  String uid = '';
  void add(ResponseGeneric rg) {
    code = rg.code;
    msg = rg.msg;
    datos = rg.datos;
  }
}
