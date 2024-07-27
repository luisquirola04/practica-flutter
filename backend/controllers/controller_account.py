
from app import Base
import os
from models.person import Person
from models.account import Account
from flask import current_app
import uuid
from controllers.utils import verification
import jwt
from datetime import datetime, timedelta
import bcrypt
from .controller_product import ControllerProduct
from werkzeug.utils import secure_filename


class ControllerAccount:
    def list(self):
        return Account.query.all()
    
    def hash_password(self, password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed_password
    

    def getAccount(self,uid):
        return Account.query.filter_by(uid=uid).first()

    def save_account_person(self, data , form):
        account = Account.query.filter_by(email=form['email']).first()
        if account:
            return -2
        else:
            if verification.validate_email(form['email']):
                person = Person(
                    last_name=form['last_name'],
                    name=form['name'],
                    dni=form['dni'],
                    uid=str(uuid.uuid4())
                )
                Base.session.add(person)
                Base.session.commit()

                file = data['profile_image']
                img = secure_filename(file.filename)

                file_path = os.path.join(current_app.config['FLASK_MEDIA'], img)
                file.save(file_path)

                account = Account(
                    email=form['email'],
                    password=self.hash_password(form['password']),
                    status=True,
                    uid=str(uuid.uuid4()),
                    person_id=person.id,
                    profile_image=file_path  
                )
                Base.session.add(account)
                Base.session.commit()
                return account.id
            else:
                return -7



    def modify_account(self, data):
        account = Account.query.filter_by(uid=data['uid']).first()
        
        if account:
            updated_account = account.copy()
            
            new_email = data.get('new_email')
            if new_email:
                updated_account.email = new_email
            
            # Actualizar la contraseña si se proporciona una nueva
            new_password = data.get('new_password')
            if new_password:
                updated_account.password = self.hash_password(new_password)
            
            # Actualizar la base de datos
            Base.session.merge(updated_account)
            Base.session.commit()
            return updated_account.id
        
        else:
            return -22  # Indicar que la cuenta no fue encontrada

            
    def login(self, data):
        cuentaA = Account.query.filter_by(email=data["email"]).first()
        if cuentaA:
            # Verificar la contraseña
            if bcrypt.checkpw(data["password"].encode('utf-8'), cuentaA.password.encode('utf-8')):
                token = jwt.encode(
                    {
                        "uid": cuentaA.uid,
                        "exp": datetime.utcnow() + timedelta(minutes= 30)
                    },
                    key=current_app.config["SECRET_KEY"],
                    algorithm="HS512"
                )
                persona = Person.query.filter_by(id= cuentaA.person_id).first()
                info = {
                    "token": token,
                    "user":  persona.last_name + "   "+  persona.name,
                    "exp": datetime.now() + timedelta(days = 60),
                    "uid": cuentaA.uid
                }
                #SE ACTUALIZAN LOS ESTADOS CADA QUE EL USUARIO INICIA SESION
                controller_product = ControllerProduct()
                controller_product.updates_status()
                return info
            else:
                return -13  # Contraseña incorrecta
        else:
            return -7  # Usuario no encontrado
            
        

        
    