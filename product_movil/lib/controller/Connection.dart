import 'dart:convert';
import 'package:product_movil/models/ResponseGeneric.dart';
import 'package:http/http.dart' as http;

class Connection {
  final String URL = "http://192.168.1.25:5000/";
  static String URL_MEDIA = "http://10.20.136.110:5000/media";

  Future<ResponseGeneric> get(String recurso) async {
    //se crea la url con el recurso
    final String _url = URL + recurso;
    //se crea una instancia de respuesta generica
    Map<String, String> headers = {
      "Content-type": "application/json",
      //"Accept": "application/json",
    };
    //se crea la url con el recurso
    final uri = Uri.parse(_url);
    //se hace la peticion get
    final respuesta = await http.get(uri, headers: headers);
    //se mapea la respuesta
    Map<dynamic, dynamic> _body = jsonDecode(respuesta.body);
    //se retorna la respuesta generica
    return _respuesta(_body["code"].toString(), _body["msg"], _body["datos"]);
  }

  //metodo asincrono para hacer peticiones post
  Future<ResponseGeneric> post(
      String recurso, Map<dynamic, dynamic> mapa) async {
    //se crea la url con el recurso
    final String _url = URL + recurso;
    //se crea una instancia de respuesta generica
    Map<String, String> headers = {
      "Content-type": "application/json",
      //"Accept": "application/json",
    };
    //se crea la url con el recurso
    final uri = Uri.parse(_url);
    //se hace la peticion post
    final respuesta =
        await http.post(uri, headers: headers, body: jsonEncode(mapa));

    //se mapea la respuesta
    Map<dynamic, dynamic> _body = jsonDecode(respuesta.body);
    //se retorna la respuesta generica
    return _respuesta(_body["code"].toString(), _body["msg"], _body["datos"]);
  }

  //metodo para convertir la respuesta en un objeto de respuesta generica
  ResponseGeneric _respuesta(String code, String msg, dynamic datos) {
    var respuesta = ResponseGeneric();
    respuesta.code = code;
    respuesta.msg = msg;
    respuesta.datos = datos;
    return respuesta;
  }
}
