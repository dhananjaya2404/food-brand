from pydantic import BaseModel

class AddToCartSchema(BaseModel):
    restaurant_id: int
    menu_id: int
    quantity: int
