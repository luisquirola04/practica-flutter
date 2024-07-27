import uuid
from datetime import datetime
from sqlalchemy.sql import func
from app import Base
from models.person import Person
class Account(Base.Model):
    __tablename__ = 'account'
    
    # FIELDS OF THE CLASS
    id           =        Base.Column(Base.Integer, primary_key = True)
    uid          =        Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    email        =        Base.Column(Base.String(60))
    password     =        Base.Column(Base.String(60))
    status       =        Base.Column(Base.Boolean())
    created_at   =        Base.Column(Base.DateTime, default = func.now())
    updated_at   =        Base.Column(Base.DateTime, default = func.now(), onupdate = func.now())
    person_id    =        Base.Column(Base.Integer, Base.ForeignKey('person.id'), nullable = False, unique= True)
    profile_image =       Base.Column(Base.String(255))  

    
   # person_id   = Base.Column(Base.Integer, Base.ForeignKey('person.id'), nullable=False, unique=True)


    
    
    #RELATIONSHIPS
    person = Base.relationship("Person", back_populates="account")
    @property
    def serialize(self):
            return {


                'email': self.email,
                'status': self.status,
                'created_at': self.created_at,
                    
            }
    def copy(self):
        copy_account = Account(
            uid=self.uid,
            id= self.id,
            email = self.email,
            password= self.password,
        )
        return copy_account