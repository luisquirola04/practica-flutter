from flask import Blueprint, jsonify, make_response, request
from controllers.utils.errors import Errors
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
from controllers.controller_product import ControllerProduct
from .schemas.schemas_product import schema_save_product
from .schemas.schemas_product import schemaModidyProduct

from controllers.authenticate import token_required

url_product = Blueprint('url_product', __name__)


productC = ControllerProduct()

@url_product.route('/product/list')
@token_required
def listPorudct():
    return make_response(
        jsonify({"msg" : "OK", "code" : 200, "datos" : ([i.serialize for i in productC.list()])}), 

        200
    )


@url_product.route('/product/save', methods = ["POST"])
@expects_json(schema_save_product)
@token_required
def saveProduct():
    data = request.json  
    p = productC.save_product(data)
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

@url_product.route('/searchStock/<stock>') #Se envia 1 o 0, 1 en stock o 0 bajado de stock por caducacion
def search_by_stock(stock):
    products = productC.search_products_inStock(stock)
    
    if products:  
        serialized_products = [product.serialize for product in products]
        return jsonify({"msg" : "OK", "code" : 200, "datos" : serialized_products}), 200
    else: 
        return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": "NO HAY PRODUCTOS BAJADOS DE STOCK"}}), 400
    
@url_product.route('/searchStatus/<status>') #SE ENVIA SIN COMILLAS NI NADA, AlmostExpired, Expired o Good
def search_by_status(status):
    products = productC.search_products_status(status)
    
    if products:  
        serialized_products = [product.serialize for product in products] 
        return jsonify({"msg" : "OK", "code" : 200, "datos" : serialized_products}), 200    
    else: 
        return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": "NO HAY PRODUCTOS EN ESTE ESTADO"}}), 400


@token_required
@expects_json(schemaModidyProduct)
@url_product.route('/product/modify', methods = ["POST"])
def  modify_product():
    data = request.json  
    #print(data['uid'])
    product = productC.modify_product(data=data)


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
@url_product.route('/product/<uid>')
@token_required
def search_product(uid):
    search= productC.searching(uid=uid)

    return make_response(
        #jsonify({"msg" : "OK", "code" : 200, "datos":personaC.buscarExternal(external).serialize}), 
        jsonify({"msg" : "OK", "code" : 200, "datos":[] if search == None else search.serialize}), 

        200
    )