from flask import Blueprint, jsonify, make_response, request
from controllers.utils.errors import Errors
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
from controllers.controller_sucursal import ControllerSucursal
from .schemas.schemas_product import schema_save_product
from .schemas.schemas_product import schemaModidyProduct

from controllers.authenticate import token_required

url_sucursal = Blueprint('url_sucursal', __name__)


productC = ControllerSucursal()

@url_sucursal.route('/sucursales')
#@token_required
def listSucursal():
    return make_response(
        jsonify({"msg" : "OK", "code" : 200, "datos" : ([i.serialize for i in productC.list()])}), 

        200
    )


@url_sucursal.route('/sucursal/save', methods = ["POST"])
@token_required
def saveSucursal():
    data = request.json  
    p = productC.save(data)
    if p >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": {"tag": "datos guardados"}}),
            200
        )
    else:
        return make_response(
            jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error.get(str(p))}}),
            400
        )



@url_sucursal.route('/sucursal/verify/<uid>', methods = ["GET"])
def estado_productos(uid):
    productos_caducados, error = productC.verificar_productos_caducados(uid=uid)
    
    if error:
        return jsonify({
            'code': '404',
            'msg': 'Error al verificar productos',
            'datos': None
        }), 404
    
    sucursal_id, error = productC.obtener_sucursal_id(uid=uid)
    if error:
        return jsonify({
            'code': '404',
            'msg': 'Error al obtener sucursal',
            'datos': None
        }), 404
    
    return jsonify({
        'code': '200',
        'msg': 'Solicitud exitosa',
        'datos': {
            'sucursal_id': sucursal_id,
            'productos_caducados': productos_caducados
        }
    })



@url_sucursal.route('/sucursal/products/<sucursal_uid>', methods = ["GET"])
def get_products_by_sucursal(sucursal_uid):
    response = productC.get_products(sucursal_uid=sucursal_uid)
    return jsonify(response)


@token_required
@url_sucursal.route('/sucursal/modify', methods = ["POST"])
def  modify_sucursal():
    data = request.json  
    #print(data['uid'])
    product = productC.modify(data=data)


    if product :
        return make_response(
            jsonify({"msg": "OK", "code": 200,"datos" : {"tag" : "datos guardados"}}),
            200
        )
    else:
        return make_response(
            jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error.get(str(product))}}),
            400
        )









        '''
@url_product.route('/product/<uid>')
@token_required
def search_product(uid):
    search= productC.searching(uid=uid)

    return make_response(
        #jsonify({"msg" : "OK", "code" : 200, "datos":personaC.buscarExternal(external).serialize}), 
        jsonify({"msg" : "OK", "code" : 200, "datos":[] if search == None else search.serialize}), 

        200
    )
    '''