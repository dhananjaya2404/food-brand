from sqlalchemy import Column, Integer, Text, ForeignKey
from app.database.base import Base

class Rating(Base):
    __tablename__ = "ratings"

    rating_id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"))
    customer_id = Column(Integer, ForeignKey("users.user_id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.restaurant_id"))
    delivery_partner_id = Column(Integer, ForeignKey("delivery_partners.partner_id"))
    restaurant_rating = Column(Integer)
    delivery_rating = Column(Integer)
    feedback = Column(Text)
