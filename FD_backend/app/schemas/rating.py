from pydantic import BaseModel
from typing import Optional

class RatingCreateSchema(BaseModel):
    order_id: int
    restaurant_id: int
    delivery_partner_id: Optional[int]

    restaurant_rating: int
    delivery_rating: int
    feedback: Optional[str]
