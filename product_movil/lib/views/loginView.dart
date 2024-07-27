import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:product_movil/controller/Service.dart';
import 'package:product_movil/views/dashboard.dart';

class LoginView extends StatefulWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final TextEditingController correoControl = TextEditingController();
  final TextEditingController claveControl = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  void inicio() {
    FToast ftoast = FToast();
    ftoast.init(context);
    setState(() {
      if (_formKey.currentState!.validate()) {
        Map<String, String> data = {
          "email": correoControl.text,
          "password": claveControl.text
        };
        log(data.toString());
        Service c = Service();

        c.session(data).then((value) async {
          log(value.toString());
          if (value.code == '200') {
            // Guardar el UID en SharedPreferences
            SharedPreferences prefs = await SharedPreferences.getInstance();
            await prefs.setString('uid', value.datos['uid']);

            ftoast.showToast(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(25.0),
                  color: Colors.green,
                ),
                child: Text(
                  'Inicio de sesión exitoso: ${value.datos['user']}',
                  style: const TextStyle(color: Colors.white),
                ),
              ),
              gravity: ToastGravity.CENTER,
              toastDuration: const Duration(seconds: 3),
            );

            // Redirigir a la pantalla de Dashboard
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => Dashboard()),
            );
          } else {
            ftoast.showToast(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(25.0),
                  color: Colors.amber.shade400,
                ),
                child: Text(value.datos['error'] ?? 'Error desconocido'),
              ),
              gravity: ToastGravity.CENTER,
              toastDuration: const Duration(seconds: 3),
            );
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Scaffold(
        body: ListView(
          padding: const EdgeInsets.all(40), // tamaño de bordes
          children: <Widget>[
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.all(10),
              child: const Text(
                "Monitoreo de Sucursales",
                style: TextStyle(
                  color: Color.fromARGB(255, 0, 0, 0),
                  fontWeight: FontWeight.bold,
                  fontSize: 32,
                ),
              ),
            ),
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.all(10),
              child: const Text(
                "Inicio de Sesion",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextFormField(
                controller: correoControl,
                decoration: const InputDecoration(
                  labelText: 'Correo',
                  suffixIcon: Icon(Icons.alternate_email),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese su correo';
                  }
                  return null;
                },
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextFormField(
                controller: claveControl,
                obscureText: true,
                obscuringCharacter: "*",
                decoration: const InputDecoration(
                  labelText: 'Contraseña',
                  suffixIcon: Icon(Icons.key),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese su contraseña';
                  }
                  return null;
                },
              ),
            ),
            Container(
              height: 50,
              padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
              child: ElevatedButton(
                onPressed: inicio,
                child: const Text("Inicio"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
