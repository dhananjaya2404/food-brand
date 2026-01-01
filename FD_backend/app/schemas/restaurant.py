from pydantic import BaseModel
from typing import Optional

class RestaurantCreate(BaseModel):
    name: str
    address: str

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    is_open: Optional[bool] = None
