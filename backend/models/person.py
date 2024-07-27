import uuid
from datetime import datetime
from sqlalchemy.sql import func
#from models.bill import Bill
from app import Base
class Person(Base.Model):
    __tablename__ = 'person'
    
    # FIELDS OF THE CLASS
    id         =    Base.Column(Base.Integer, primary_key = True)
    uid        =    Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    name       =    Base.Column(Base.String(60))
    last_name  =    Base.Column(Base.String(60))
    dni        =    Base.Column(Base.Integer, unique= True)
    detail_id  =    Base.Column(Base.Integer, Base.ForeignKey('detail.id'), nullable = True)
    bill_id    =    Base.Column(Base.Integer, Base.ForeignKey('bill.id'), nullable = True)

    
    #detail y factura foreing key hacer
    
    
    #RELATIONSHIPS
    #detail= Base.relationship("Bill", back_populates="person")
    detail = Base.relationship("Detail", foreign_keys=[detail_id])
    bill    =  Base.relationship("Bill", foreign_keys=[bill_id])
    account= Base.relationship("Account", back_populates= "person")

    
    # CREATION AND UPDATE DATES
    created_at  =     Base.Column(Base.DateTime, default = func.now())
    updated_at  =     Base.Column(Base.DateTime, default = func.now(), onupdate = func.now())

    @property
    def serialize(self):
        return {
            'uid':self.uid,
            'name': self.name,
            'last_name': self.last_name,
            'dni': self.dni,
        }
    
    def copy(self):
        copy_person = Person(
            uid=self.uid,
            id=self.id,
            name=self.name,
            last_name=self.last_name,
            dni=self.dni,
            detail_id=self.detail_id,
            bill_id=self.bill_id
            
        )
        return copy_person
    
    
