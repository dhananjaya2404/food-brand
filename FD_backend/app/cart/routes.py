from fastapi import APIRouter, Depends
from app.dependencies.roles import role_required

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/add")
def add_to_cart(data: dict, user=Depends(role_required("CUSTOMER"))):
    return {
        "message": "Item added to cart",
        "user_id": user["user_id"]
    }
