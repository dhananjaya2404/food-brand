from sqlalchemy import Column, Integer, ForeignKey
from app.database.base import Base

class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    restaurant_id = Column(Integer)
    menu_id = Column(Integer)
    quantity = Column(Integer)
