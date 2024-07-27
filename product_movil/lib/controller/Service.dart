import 'package:product_movil/models/Session.dart';

import '../models/ResponseGeneric.dart';
import 'Connection.dart';

class Service {
  final Connection _con = Connection();
/*
  String getMedia() {
    return _con.URL_MEDIA;
  }
*/
  Future<ResponseGeneric> modifyAccount(Map<String, dynamic> data) async {
    ResponseGeneric rg = await _con.post("account/modify", data);
    return rg;
  }

  Future<Session> session(Map<String, dynamic> map) async {
    ResponseGeneric rg = await _con.post("sesion", map);
    Session s = Session();
    s.add(rg);
    if (rg.code == 200) {
      s.token = s.datos["token"];
      s.user = s.datos["user"];
      s.uid = s.datos["uid"];
    }
    return s;
  }

  Future<ResponseGeneric> getAccount(String uid) async {
    ResponseGeneric rg = await _con.get("account/get/$uid");
    return rg;
  }

  Future<ResponseGeneric> sucursales() async {
    ResponseGeneric rg = await _con.get("sucursales");

    return rg;
  }

  Future<bool> estadoProductos(String sucursalUid) async {
    print('Estoy en el método estadoProductos');

    ResponseGeneric rg = await _con.get("sucursal/verify/$sucursalUid");
    print('Datos recibidos: ${rg.datos}');

    if (rg.datos != null && rg.datos is Map) {
      final productosCaducados = rg.datos['productos_caducados'] ?? 0;
      print('Productos caducados: $productosCaducados');
      return productosCaducados > 0;
    }

    print('rg.datos no es un Map o es null');
    return false;
  }

  Future<ResponseGeneric> getProductsBySucursal(String sucursalUid) async {
    ResponseGeneric rg = await _con.get("sucursal/products/$sucursalUid");
    return rg;
  }
}
