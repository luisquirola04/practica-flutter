from flask import Blueprint, jsonify, make_response, current_app, request
import jwt
from controllers.utils.errors import Errors
from functools import wraps
from models.account import Account




def token_required(f):
    @wraps(f)
    def decored(*args, **kwargs):
        token = None
        if 'X-Access-Token' in request.headers:
            token = request.headers['X-Access-Token']
        if not token:
            return make_response(
                jsonify({"msg" : "ERROR", "code" : 401, "datos" :{"error" : Errors.error[str(-14)]}}), 
                401
            )
        try:
            data = jwt.decode(token, algorithms = "HS512", verify = True, key = current_app.config['SECRET_KEY'])
            user = Account.query.filter_by(uid = data["uid"]).first()
            #print(data['uid'])
            if not user:
                return make_response(
                jsonify({"msg" : "ERROR", "code" : 401, "datos" :{"error" : Errors.error[str(-15)]}}), 
                401
            )
        except Exception :
            return make_response(
                jsonify({"msg" : "ERROR", "code" : 401, "datos" :{"error" : Errors.error[str(-15)]}}), 
                401
            )
        return f(*args, **kwargs)
    return decored
        



