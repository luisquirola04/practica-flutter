import uuid
from app import Base
from models.product import Product
import jwt
from models.batch import Batch
import datetime
from datetime import datetime, timedelta
from models.sucursal import Sucursal
import uuid
from models.status import Status
from sqlalchemy.orm import joinedload

class ControllerSucursal:
    def list(self):
        return Sucursal.query.all()
    
    def save(self, data):
            sucursal = Sucursal.query.filter_by(name=data["name"]).first()
            if sucursal:
                return -20 # Sucursal already exists
            else:
                new_sucursal = Sucursal(
                    name=data["name"],
                    contact=data["contact"],
                    latitude=data["latitude"],
                    longitude=data["longitude"],
                    direccion=data["direccion"]

                )
                Base.session.add(new_sucursal)
                Base.session.commit()
                return new_sucursal.id


    def modify(self, data):

            sucursal = Sucursal.query.filter_by(uid=data['uid']).first()

            if sucursal:
                new = sucursal.copy()
                new.name = data.get('name', sucursal.name)
                new.contact = data.get('contact', sucursal.contact)
                new.latitude = data.get('latitude', sucursal.latitude)
                new.longitude = data.get('longitude', sucursal.longitude)
                new.direccion = data.get("direccion", sucursal.direccion)
                new.updated_at = datetime.now()
                Base.session.merge(new)
                Base.session.commit()
                return new.id
            else:
                return -21


    def obtener_sucursal_id(self,uid):
        sucursal = Sucursal.query.filter_by(uid=uid).first()
        if sucursal:
            return sucursal.id, None
        return None, "Sucursal no encontrada"

    def verificar_productos_caducados(self,uid):
        sucursal_id, error =self.obtener_sucursal_id(uid=uid)
        if error:
            return None, error

        productos_caducados = Product.query.filter_by(sucursal_id=sucursal_id, status='Expired').count()
        return productos_caducados, None


    def get_products(self,sucursal_uid):
        try:
            # Obtener la sucursal por uid
            sucursal = Sucursal.query.filter_by(uid=sucursal_uid).first()
            
            if not sucursal:
                return {
                    'code': 404,
                    'msg': 'Sucursal not found',
                    'datos': []
                }
            
            products = Product.query.filter_by(sucursal_id=sucursal.id).all()
            
            serialized_products = [product.serialize for product in products]
            
            return {
                'code': 200,
                'msg': 'Products fetched successfully',
                'datos': serialized_products
            }
        except Exception as e:
            # Manejar errores
            return {
                'code': 500,
                'msg': str(e),
                'datos': []
            }