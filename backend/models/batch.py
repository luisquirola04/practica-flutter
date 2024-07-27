import uuid
from datetime import datetime
from models.product import Product
from sqlalchemy.sql import func
from app import Base

class Batch(Base.Model):
    __tablename__ = 'batch'
    
    # FIELDS OF THE CLASS
    id              =   Base.Column(Base.Integer, primary_key = True)
    uid             =   Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    created_at      =   Base.Column(Base.DateTime, default = datetime.now)
    updated_at      =   Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)    
    maker           =   Base.Column(Base.String(60))
    price_batch     =   Base.Column(Base.Float)
    arrive_date=         Base.Column(Base.DateTime)

    product = Base.relationship("Product", back_populates="batch")

    @property
    def serialize(self):
        return {
            'uid':self.uid,
            'maker': self.maker,
            'price_batch': self.price_batch,
            'arrive_date': self.arrive_date
        }
    
    def copy(self):
        copy_batch = Batch(
            id= self.id,
            uid=self.uid,
            maker=self.maker,
            price_batch=self.price_batch,
            arrive_date= self.arrive_date,
        )
        return copy_batch