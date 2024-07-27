import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:product_movil/controller/Service.dart';
import 'package:product_movil/models/ResponseGeneric.dart';
import 'package:product_movil/models/Session.dart';
import 'package:product_movil/views/components/MenuView.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mapa de Sucursales',
      theme: ThemeData.light(useMaterial3: true),
      home: const MapView(),
    );
  }
}

class MapView extends StatelessWidget {
  final Session? session;

  const MapView({Key? key, this.session}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mapa de Sucursales'),
      ),
      drawer: MenuView(session: session),
      body: FutureBuilder<ResponseGeneric>(
        future: Service().sucursales(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            return SucursalesMap(data: snapshot.data!.datos, session: session);
          } else {
            return Center(child: Text('No data found'));
          }
        },
      ),
    );
  }
}

class SucursalesMap extends StatelessWidget {
  final List<dynamic> data;
  final Session? session;

  const SucursalesMap({Key? key, required this.data, this.session})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FlutterMap(
      options: MapOptions(
        center: LatLng(-3.9752, -79.2540), // Centro de Ecuador
        zoom: 13, // Ajusta el nivel de zoom para ver la región de cerca
        minZoom: 1, // Nivel mínimo de zoom
        maxZoom: 20, // Nivel máximo de zoom
      ),
      children: [
        TileLayer(
          urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ['a', 'b', 'c'],
        ),
        MarkerLayer(
          markers: data.map((item) {
            return Marker(
              width: 80.0,
              height: 80.0,
              point: LatLng(item['latitude'], item['longitude']),
              builder: (ctx) => GestureDetector(
                onTap: () async {
                  final sucursalUid = item['uid'];
                  final tieneProductosCaducados =
                      await Service().estadoProductos(sucursalUid);

                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Estado de Productos'),
                        content: Text(tieneProductosCaducados
                            ? 'La sucursal tiene productos caducados.'
                            : 'La sucursal no tiene productos caducados.'),
                        actions: [
                          TextButton(
                            child: Text('OK'),
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
                child: Icon(
                  Icons.location_on,
                  color: Colors.red,
                  size: 40.0,
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
