from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database.base import Base

class Restaurant(Base):
    __tablename__ = "restaurants"

    restaurant_id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey("users.user_id"))
    name = Column(String(100))
    address = Column(String)
    is_open = Column(Boolean, default=True)
