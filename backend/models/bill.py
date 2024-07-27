import uuid
from datetime import datetime
from sqlalchemy.sql import func
from app import Base
from models.person import Person
from models.detail import Detail

class Bill(Base.Model):
    __tablename__ = 'bill'
    
    # FIELDS OF THE CLASS
    id              =   Base.Column(Base.Integer, primary_key = True)
    uid             =   Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    created_at      =   Base.Column(Base.DateTime, default = datetime.now)
    updated_at      =   Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)    
    person_id       =   Base.Column(Base.Integer, Base.ForeignKey('person.id'), nullable = False)
    date_bill       =   Base.Column(Base.DateTime)
    
    
        #RELATIONSHIPS

    person  =    Base.relationship("Person", foreign_keys=[person_id])
    
    detail  =    Base.relationship("Detail", back_populates= "bill") 

    @property
    def serialize(self):
        return {
            'person_id': self.person_id,
            'date_bill': self.date_bill
        }
    
    def copy(self):
        copy_bill = Bill(
            uid=self.uid,
            person_id=self.person_id,
            date_bill = self.date_bill
        )
        return copy_bill