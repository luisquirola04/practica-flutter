import 'package:flutter/material.dart';
import 'package:product_movil/views/ProductsView.dart';
import 'package:product_movil/views/components/MenuView.dart';
import 'package:product_movil/controller/Service.dart';
import 'package:product_movil/models/ResponseGeneric.dart';

void main() {
  runApp(Dashboard());
}

class Dashboard extends StatelessWidget {
  final Service _service = Service();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Home',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Menú'),
        ),
        drawer: MenuView(),
        body: FutureBuilder<ResponseGeneric>(
          future: _service.sucursales(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData) {
              if (snapshot.data!.code == '200') {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Expanded(
                      child: SucursalesTable(data: snapshot.data!.datos),
                    ),
                  ],
                );
              } else {
                return Center(child: Text('Error: ${snapshot.data!.msg}'));
              }
            } else {
              return Center(child: Text('No data found'));
            }
          },
        ),
      ),
    );
  }
}

class SucursalesTable extends StatelessWidget {
  final List<dynamic> data;

  SucursalesTable({required this.data});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        showCheckboxColumn: false,
        columns: [
          DataColumn(label: Text('Nombre')),
          DataColumn(label: Text('Telefono Contacto')),
          DataColumn(label: Text('Direccion')),
        ],
        rows: data.map((item) {
          return DataRow(
            cells: [
              DataCell(Text(item['name'] ?? '')),
              DataCell(Text(item['contact'] ?? '')),
              DataCell(Text(item['direccion'] ?? '')),
            ],
            onSelectChanged: (selected) {
              if (selected != null && selected) {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        ProductsScreen(sucursalUid: item['uid']),
                  ),
                );
              }
            },
          );
        }).toList(),
      ),
    );
  }
}
