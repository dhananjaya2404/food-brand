from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.base import Base

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.restaurant_id"))
    delivery_partner_id = Column(Integer, ForeignKey("delivery_partners.partner_id"), nullable=True)
    order_status = Column(String, default="PLACED")
    order_time = Column(DateTime, server_default=func.now())
    delivered_time = Column(DateTime, nullable=True)
