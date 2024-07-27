
import uuid
from datetime import datetime
from sqlalchemy.sql import func
from app import Base

class Sucursal(Base.Model):
    __tablename__ = 'sucursal'
    
    # FIELDS OF THE CLASS
    id              =   Base.Column(Base.Integer, primary_key = True)
    uid             =   Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    created_at      =   Base.Column(Base.DateTime, default = datetime.now)
    updated_at      =   Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)    
    name            =   Base.Column(Base.String(50), nullable=False)
    contact        =   Base.Column(Base.String(10), nullable= False)
    direccion       = Base.Column(Base.String(100), nullable= False)
    latitude        =   Base.Column(Base.Float, nullable= False)
    longitude       =   Base.Column(Base.Float, nullable= False)



    product = Base.relationship("Product", back_populates="sucursal")

    @property
    def serialize(self):
        return {
            'uid': self.uid,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'name': self.name,
            'contact': self.contact,
            'latitude': self.latitude,
            'longitude': self.longitude,
            "direccion":self.direccion,
        }
    
    def copy(self):
        copy_sucursal = Sucursal(
            id= self.id,
            uid=str(uuid.uuid4()),
            created_at=self.created_at,
            updated_at=self.updated_at,
            name=self.name,
            contact=self.contact,
            latitude=self.latitude,
            longitude=self.longitude,
            direccion=self.direccion,
        )
        return copy_sucursal