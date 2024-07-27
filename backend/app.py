from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()
import init_tables

from flask_cors import CORS

Base = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    CORS(app)
    #TODO
    
    app.config.from_object('config.config.Config')
    
    Base.init_app(app)
    
    with app.app_context():
        # import routes

        
        # add routes

        # add routes
        from routes.route_account import url_account
        from routes.route_sucursal import url_sucursal

        from routes.route_product import url_product
        from routes.route_batch import url_batch
        app.register_blueprint(url_product)
        app.register_blueprint(url_sucursal)

        app.register_blueprint(url_batch)
        app.register_blueprint(url_account)


        # import all models
        init_tables.init()    
        # import all models
        
        # create all tables
        Base.create_all()
    
    return app