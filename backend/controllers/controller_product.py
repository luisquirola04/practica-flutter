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
class ControllerProduct:
    def list(self):
        return Product.query.all()
    
    def return_status(self, expired_date_str):
        current_date = datetime.now().date()
        future_date = current_date + timedelta(days=5)
        ahora= datetime.now()
        expired_datetime = datetime.strptime(expired_date_str, "%Y-%m-%d")
        
        expired_date = expired_datetime.date()
        
        if  ahora== expired_date:
            return "Expired"
        elif future_date == expired_date:
            return "AlmostExpired"
        else:
            return "Good"
            
            
    def return_status_boolean(self, expired_date_str, creation_date_str):
        expired_datetime = datetime.strptime(expired_date_str, "%Y-%m-%d")
        creation_datetime = datetime.strptime(creation_date_str, "%Y-%m-%d")
        
        expired_date = expired_datetime.date()
        creation_date = creation_datetime.date()
        
        if expired_date >= (creation_date + timedelta(days=5)):
            return True
        else:
            return False
        
        
    def save_product(self,data):
        product = Product.query.filter_by(name=data["name"]).first()
        batch= Batch.query.filter_by(uid= data["batch_uid"]).first()
        sucursal = Sucursal.query.filter_by(uid= data["sucursal_uid"]).first()
        if product or not batch or not sucursal:
            return -3
        else:
            product = Product()
            batch = batch.copy()
            product.sucursal_id = sucursal.id
            product.name= data["name"]
            product.product_price= data["product_price"]
            product.batch_id= batch.id
            product.status= True
            
            product.elaborate_date= data["elaborate_date"]
            product.expired_date= data["expired_date"]
            product.quantity= data["quantity"]

            product.status = self.return_status(product.expired_date)
            product.uid= uuid.uuid4()
            if self.return_status_boolean(product.expired_date, product.elaborate_date):
                Base.session.add(product)
                Base.session.commit()
                return product.id
            else:
                return -5

    def modify_product(self, data):
            product = Product.query.filter_by(uid=data['uid']).first()

            if  product:
                new_product = product.copy()
                new_product.name = data.get('name', new_product.name)
                new_product.product_price = data.get('product_price', new_product.product_price)
                new_product.elaborate_date = data.get('elaborate_date', new_product.elaborate_date)
                new_product.expired_date = data.get('expired_date', new_product.expired_date)
                new_product.quantity = data.get('quantity', new_product.quantity)
                new_product.sucursal_id = product.sucursal
                new_product.status = self.return_status(new_product.expired_date)

                if self.return_status_boolean(new_product.expired_date, new_product.elaborate_date):
                    Base.session.merge(new_product)
                    Base.session.commit()
                    return new_product.id 

                else:
                    return -5  
            else:
                return None  


    def search_products_inStock(self, status):
        products = Product.query.filter_by(stock=status).all()
        return products

    def search_products_status(self, statusP):
        products = Product.query.filter_by(status=statusP).all()
        return products
    
    def updates_status(self):
        products = Product.query.all()
        for product in products:
            if product.expired_date < datetime.utcnow():  
                product.status = Status.Expired
                product.stock = False
            elif product.expired_date < datetime.utcnow() + timedelta(days=5):  
                product.status = Status.AlmostExpired
                product.stock= True

            else:
                product.status = Status.Good
                product.stock= True

            Base.session.merge(product)

        Base.session.commit()

        
    def searching(self,uid):
        return Product.query.filter_by(uid=uid).first()