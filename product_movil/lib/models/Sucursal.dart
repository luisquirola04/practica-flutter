import 'ResponseGeneric.dart';

class Sucursal extends ResponseGeneric {
  int productosCadu = 0;

  void add(ResponseGeneric rg) {
    code = rg.code;
    msg = rg.msg;
    datos = rg.datos;
  }
}
