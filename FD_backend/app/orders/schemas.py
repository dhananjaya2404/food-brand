from pydantic import BaseModel

class CreateOrderSchema(BaseModel):
    restaurant_id: int
