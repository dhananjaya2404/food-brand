from pydantic import BaseModel
from datetime import datetime


class CartSchema(BaseModel):
    restaurant_id: int
    item_id: int
    quantity: int
    price: float

# Schema for updating a cart item
class CartUpdateSchema(BaseModel):
    quantity: int

# Response schema including IDs and timestamps
class CartResponse(BaseModel):
    cart_id: int
    user_id: int
    restaurant_id: int
    item_id: int
    quantity: int
    price: float
    created_at: datetime

    class Config:
        from_attributes = True
