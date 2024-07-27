import uuid
from datetime import datetime
from sqlalchemy.sql import func
from app import Base
from .status import Status


class Product(Base.Model):
    __tablename__ = 'product'
    
    # FIELDS OF THE CLASS
    id              =       Base.Column(Base.Integer, primary_key = True)
    uid             =       Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    name             =       Base.Column(Base.String(60))
    created_at      =       Base.Column(Base.DateTime, default = datetime.now)
    updated_at      =       Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)   
    product_price   =       Base.Column(Base.Float)
    batch_id        =       Base.Column(Base.Integer, Base.ForeignKey('batch.id'), nullable = False)
    sucursal_id        =       Base.Column(Base.Integer, Base.ForeignKey('sucursal.id'), nullable = False)

    status          =       Base.Column(Base.Enum(Status), nullable = False)
    elaborate_date=         Base.Column(Base.DateTime)
    expired_date=           Base.Column(Base.DateTime)
    stock=                  Base.Column(Base.Boolean, default= True)
    quantity =              Base.Column(Base.Integer)
    #RELATIONSHIPS
    detail = Base.relationship("Detail", back_populates="product")
    batch   =   Base.relationship("Batch", back_populates="product")
    sucursal = Base.relationship("Sucursal", back_populates="product")

    @property
    def serialize(self):
        return {

            'product_price': self.product_price,
            'name': self.name,
            'elaborate_date': self.elaborate_date,
            'expired_date': self.expired_date,
            'quantity': self.quantity,
            'status': str(self.status.name),
            'uid':self.uid,

        }
    
    def copy(self):
        copy_product = Product(
            id=self.id,
            uid=self.uid,
            product_price= self.product_price,
            batch_id=self.batch_id,
            name=   self.name,
            expired_date= self.expired_date,
            elaborate_date= self.elaborate_date,
            quantity= self.quantity,
        )
        return copy_product