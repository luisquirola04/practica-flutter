import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:product_movil/controller/Service.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:developer';
import 'package:product_movil/views/dashboard.dart'; // Importa la vista de Dashboard

class ModifyAccountScreen extends StatefulWidget {
  @override
  _ModifyAccountScreenState createState() => _ModifyAccountScreenState();
}

class _ModifyAccountScreenState extends State<ModifyAccountScreen> {
  final _formKey = GlobalKey<FormState>();
  final _service = Service();
  String _email = '';
  String _newPassword = '';
  String _confirmPassword = '';
  bool _isLoading = false;
  String? _uid;

  @override
  void initState() {
    super.initState();
    _loadUid();
  }

  Future<void> _loadUid() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _uid = prefs.getString('uid');
    });
  }

  void _modifyAccount() {
    FToast ftoast = FToast();
    ftoast.init(context);

    if (_formKey.currentState?.validate() ?? false) {
      setState(() {
        _isLoading = true;
      });

      Map<String, String> data = {
        'uid': _uid ?? '', // Usa el uid recuperado de SharedPreferences
        'new_email': _email,
        'new_password': _newPassword,
      };

      log(data.toString());

      _service.modifyAccount(data).then((response) {
        setState(() {
          _isLoading = false;
        });

        if (response.code == 200) {
          ftoast.showToast(
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25.0),
                color: Colors.green,
              ),
              child: const Text(
                'Cuenta actualizada con éxito',
                style: TextStyle(color: Colors.white),
              ),
            ),
            gravity: ToastGravity.CENTER,
            toastDuration: const Duration(seconds: 3),
          );

          // Redirigir a la pantalla de Dashboard después de mostrar el mensaje
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
              child: Text(response.msg ?? 'Error desconocido'),
            ),
            gravity: ToastGravity.CENTER,
            toastDuration: const Duration(seconds: 3),
          );

          // Redirigir a la pantalla de Dashboard después de mostrar el mensaje
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => Dashboard()),
          );
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Modificar Cuenta'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                initialValue: _email,
                decoration: const InputDecoration(
                    labelText: 'Nuevo Correo Electrónico'),
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa un correo electrónico';
                  }
                  return null;
                },
                onChanged: (value) {
                  _email = value;
                },
              ),
              TextFormField(
                decoration:
                    const InputDecoration(labelText: 'Nueva Contraseña'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa una contraseña';
                  }
                  return null;
                },
                onChanged: (value) {
                  _newPassword = value;
                },
              ),
              TextFormField(
                decoration:
                    const InputDecoration(labelText: 'Confirmar Contraseña'),
                obscureText: true,
                validator: (value) {
                  if (value != _newPassword) {
                    return 'Las contraseñas no coinciden';
                  }
                  return null;
                },
                onChanged: (value) {
                  _confirmPassword = value;
                },
              ),
              const SizedBox(height: 20),
              _isLoading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: _modifyAccount,
                      child: const Text('Guardar Cambios'),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
