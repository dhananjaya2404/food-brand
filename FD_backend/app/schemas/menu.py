# from pydantic import BaseModel
# from typing import Optional

# class MenuCreate(BaseModel):
#     restaurant_id: int
#     name: str
#     price: float

# class MenuUpdate(BaseModel):
#     name: Optional[str] = None
#     price: Optional[float] = None
#     is_available: Optional[bool] = None
#     restaurant_id: Optional[int] = None

# MenuCreateSchema = MenuCreate
from pydantic import BaseModel, HttpUrl
from typing import Optional
from enum import Enum

class FoodTypeEnum(str, Enum):
    veg = "veg"
    nonveg = "nonveg"


class MenuCreate(BaseModel):
    restaurant_id: int
    name: str
    price: float
    food_type: FoodTypeEnum
    image_url: Optional[HttpUrl] = None
    description: Optional[str] = None


class MenuUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    is_available: Optional[bool] = None
    food_type: Optional[FoodTypeEnum] = None
    image_url: Optional[HttpUrl] = None
    description: Optional[str] = None


MenuCreateSchema = MenuCreate
