from sqlalchemy import Column, Integer, Boolean, String
from app.database.base import Base

class DeliveryPartner(Base):
    __tablename__ = "delivery_partners"

    partner_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    is_available = Column(Boolean, default=True)
    current_location = Column(String)
