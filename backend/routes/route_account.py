from flask import Blueprint, jsonify, make_response, request
from controllers.utils.errors import Errors
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
from controllers.controller_account import ControllerAccount
from .schemas.schemas_account import schema_save_account, schema_sesion
from controllers.controller_person import ControllerPerson
from controllers.authenticate import token_required
from flask_cors import CORS
from flask import current_app, send_from_directory, jsonify
import os

url_account = Blueprint('url_account', __name__)

personC= ControllerPerson()
accountC = ControllerAccount()
#Por temas de tiempo, se realiza el listado de personas aqui en el controlador de account
@url_account.route('/person/list')
@token_required
def listPerson():
    return make_response(
        jsonify({"msg" : "OK", "code" : 200, "datos" : ([i.serialize for i in personC.list()])}), 

        200
    )


@url_account.route('/account/get/<uid>')
#@token_required
def getPerson(uid):
    return make_response(
        jsonify({"msg" : "OK", "code" : 200, "datos" : ([accountC.getAccount(uid=uid).serialize])}), 

        200
    )


@url_account.route('/account/list')
@token_required
def listAccount():
    return make_response(
        jsonify({"msg" : "OK", "code" : 200, "datos" : ([i.serialize for i in accountC.list()])}), 

        200
    )

@url_account.route('/media/<path:filename>')
def media(filename):
    return send_from_directory(current_app.config['FLASK_MEDIA'], filename)

@url_account.route('/media', methods=['GET'])
def list_media():
    files = os.listdir(current_app.config['FLASK_MEDIA'])
    images = [file for file in files if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify({'files': images})
    
@url_account.route('/account/save', methods = ["POST"])
#@token_required
def save_account():

    data=request.files

    form = request.form
    
    print(form)

    c = accountC.save_account_person(data=data, form=form)

    if c >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": {"tag": "datos guardados"}}),
            200
        )
    else:
        return make_response(
            jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error.get(str(c))}}),
            400
        )



@url_account.route('/account/modify', methods = ["POST"])
#@token_required
def modify_account():
    data = request.json  
    #print(data['uid'])
    account = accountC.modify_account(data=data)


    if account :
        return make_response(
            jsonify({"msg": "ACTUALIZADO", "code": 200,"datos" : {"tag" : "datos guardados"}}),
            200
        )
    else:
        return make_response(
            jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error.get(str(account))}}),
            400
        )


@url_account.route('/sesion', methods = ["POST"])
@expects_json(schema_sesion)
def sesion():
    data = request.json  
    id = accountC.login(data = data)
    print("el id es : " +str(id)) #esto no va solo es para ver errores el trazado
    if type(id) == int:
        return make_response(
                jsonify({"msg" : "ERROR", "code" : 400, "datos" :{"error" : Errors.error[str(id)]}}), 
                400
        )
    else:
        return make_response(
                jsonify({"msg" : "OK", "code" : 200, "datos" : id}), 
                200
    )

@url_account.route('/validar/Token', methods=["GET"])
@token_required
def validarToken():
        return make_response(
                jsonify({"msg" : "OK", "code" : 200, "datos":"TRUE"}), 
                200
    )

