# from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean
# from app.database.base import Base

# class MenuItem(Base):
#     __tablename__ = "menu_items"

#     item_id = Column(Integer, primary_key=True)
#     restaurant_id = Column(Integer, ForeignKey("restaurants.restaurant_id"))
#     name = Column(String(100))
#     price = Column(Float)
#     is_available = Column(Boolean, default=True)


# Menu = MenuItem
from sqlalchemy import (
    Column, Integer, String, ForeignKey,
    Float, Boolean, DateTime, Enum, Text
)
from app.database.base import Base
from datetime import datetime
import enum

# Enum for food type
class FoodType(enum.Enum):
    veg = "veg"
    nonveg = "nonveg"


class MenuItem(Base):
    __tablename__ = "menu_items"

    item_id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.restaurant_id"),
        nullable=False
    )

    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)

    is_available = Column(Boolean, default=True)
    food_type = Column(Enum(FoodType), nullable=False)

    image_url = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)


Menu = MenuItem
