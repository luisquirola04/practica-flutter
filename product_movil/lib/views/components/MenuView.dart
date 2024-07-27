import 'package:flutter/material.dart';
import 'package:product_movil/models/Session.dart';
import 'package:product_movil/views/dashboard.dart';
import 'package:product_movil/views/loginView.dart';
import 'package:product_movil/views/navbar/ConfiguracionView.dart';
import 'package:product_movil/views/navbar/MapView.dart';

class MenuView extends StatelessWidget {
  final Session? session;

  MenuView({Key? key, this.session}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Menú',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          _buildListTile(
            icon: Icons.map,
            title: 'Sucursales-Mapa',
            context: context,
            targetView: MapView(session: session),
          ),
          _buildListTile(
            icon: Icons.view_list_outlined,
            title: 'Sucursales-lista',
            context: context,
            targetView: Dashboard(),
          ),
          _buildListTile(
            icon: Icons.account_circle,
            title: 'Cambiar correo y contraseña',
            context: context,
            targetView: ModifyAccountScreen(),
          ),
          _buildListTile(
            icon: Icons.exit_to_app,
            title: 'Cerrar Sesión',
            color: Colors.red,
            textColor: Colors.red,
            context: context,
            targetView: LoginView(),
            isReplacement: true,
          ),
        ],
      ),
    );
  }

  ListTile _buildListTile({
    required IconData icon,
    required String title,
    required BuildContext context,
    required Widget targetView,
    Color color = Colors.black,
    Color textColor = Colors.black,
    bool isReplacement = false,
  }) {
    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(title, style: TextStyle(color: textColor)),
      onTap: () {
        if (isReplacement) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => targetView),
          );
        } else {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => targetView),
          );
        }
      },
    );
  }
}
