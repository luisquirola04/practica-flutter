from flask import current_app
from models.person import Person

import uuid
from app import Base
import jwt
from datetime import datetime, timedelta

class ControllerPerson:

    def list(self):
        return Person.query.all()
    #SE REALIZARA EN CASO DE SER NECESARIO FACTURAR
