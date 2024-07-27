
from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname('__file__'))
load_dotenv(path.join(base_dir, 'config/.env'))


class Config:
    #configuracion general
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')
    FLASK_MEDIA = environ.get('MEDIA_UPLOAD')

    #configuracion BD
    user = environ.get("MYSQL_USER")
    password = environ.get("MYSQL_PASSWORD")
    host = environ.get("MYSQL_HOST")
    db = environ.get("MYSQL_DATABASE")
    #config SQLALCHEMY
    SQLALCHEMY_DATABASE_URI = f'mysql://{user}:{password}@{host}/{db}'
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_RECORS_QUERIES =True
    SQLALCHEMY_TRACK_MODIFICATIONS = 'enable'
