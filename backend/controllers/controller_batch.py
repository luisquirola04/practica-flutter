import uuid
from app import Base
#from models.batch import Batch
from models.batch import Batch
import uuid

class ControllerBatch:
    def list(self):
        return Batch.query.all()
    
    def save( self,data):
        batch = Batch()
        batch.uid = uuid.uuid4()
        batch.maker = data['maker']
        batch.price_batch = data['price_batch']
        batch.arrive_date= data['arrive_date']
        Base.session.add(batch)
        Base.session.commit()
        return batch.id



    def modify_batch(self, data):
        batch = Batch.query.filter_by(uid=data['uid']).first()

        if  batch:
            new_batch = batch.copy()
            new_batch.maker = data.get('maker', new_batch.maker)
            new_batch.price_batch = data.get('price_batch', new_batch.price_batch)
            new_batch.arrive_date = data.get('arrive_date', new_batch.arrive_date)
            Base.session.merge(new_batch)
            Base.session.commit()
            return new_batch.id 

        else:
            return -19  


    def searching(self,uid):
        return Batch.query.filter_by(uid=uid).first()