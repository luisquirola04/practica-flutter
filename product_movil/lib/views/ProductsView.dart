import 'package:flutter/material.dart';
import 'package:product_movil/controller/Service.dart';
import 'package:product_movil/models/ResponseGeneric.dart';

class ProductsScreen extends StatelessWidget {
  final String sucursalUid;
  final Service _service = Service();

  ProductsScreen({required this.sucursalUid});

  Future<ResponseGeneric> fetchProducts() async {
    return await _service.getProductsBySucursal(sucursalUid);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Productos'),
      ),
      body: FutureBuilder<ResponseGeneric>(
        future: fetchProducts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            if (snapshot.data!.code == '200') {
              // Asegúrate de comparar con el tipo correcto de código
              return ProductTable(products: snapshot.data!.datos);
            } else {
              return Center(child: Text('Error: ${snapshot.data!.msg}'));
            }
          } else {
            return Center(child: Text('No data found'));
          }
        },
      ),
    );
  }
}

class ProductTable extends StatelessWidget {
  final List<dynamic> products;

  ProductTable({required this.products});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: [
          DataColumn(label: Text('Nombre')),
          DataColumn(label: Text('Estado')),
          DataColumn(label: Text('Precio')),
        ],
        rows: products.map((product) {
          return DataRow(
            cells: [
              DataCell(Text(product['name'] ?? '')),
              DataCell(Text(product['status'] ?? '')),
              DataCell(Text(product['product_price'].toString() ?? '')),
            ],
          );
        }).toList(),
      ),
    );
  }
}
