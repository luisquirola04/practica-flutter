import uuid
from datetime import datetime
from sqlalchemy.sql import func
from app import Base
#from models.bill import Bill
from models.product import Product

class Detail(Base.Model):
    __tablename__ = 'detail'
    
    # FIELDS OF THE CLASS
    id              =       Base.Column(Base.Integer, primary_key = True)
    uid             =       Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    created_at      =       Base.Column(Base.DateTime, default = datetime.now)
    updated_at      =       Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)    
    cant            =       Base.Column(Base.Integer)
    final_price     =       Base.Column(Base.Float)
    first_price     =       Base.Column(Base.Float)
    iva             =       Base.Column(Base.Float)
    bill_id         =       Base.Column(Base.Integer, Base.ForeignKey('bill.id'), nullable = False)
    product_id        =       Base.Column(Base.Integer, Base.ForeignKey('product.id'), nullable = False)


    #RELATIONSHIPS
    bill        = Base.relationship("Bill", back_populates="detail")
    product    = Base.relationship("Product", back_populates="detail")

    @property
    def serialize(self):
        return {


            'cant': self.cant,
            'final_price': self.final_price,
            'first_price': self.first_price,
            'iva': self.iva,

        }
    
    def copy(self):
        copy_detail = Detail(
            uid=self.uid,
            created_at=self.created_at,
            updated_at=self.updated_at,
            cant=self.cant,
            final_price=self.final_price,
            first_price=self.first_price,
            iva=self.iva,
            bill_id=self.bill_id,
            products=self.product
        )
        return copy_detail