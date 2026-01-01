from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderCreate(BaseModel):
    restaurant_id: int

class OrderResponse(BaseModel):
    order_id: int
    user_id: int
    restaurant_id: int
    order_status: str
    order_time: datetime

    class Config:
        from_attributes = True
