from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.order import Order
from app.schemas.order import OrderCreate
from app.dependencies.roles import role_required

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/orders")
def get_user_orders(
    db: Session = Depends(get_db),
    current_user=Depends(role_required("CUSTOMER"))
):
    orders = db.query(Order).filter(Order.user_id == current_user["user_id"]).all()
    return {
        "message": "User orders fetched successfully",
        "orders": orders
    }

@router.post("/orders/place")
def place_user_order(
    data: OrderCreate,
    db: Session = Depends(get_db),
    current_user=Depends(role_required("CUSTOMER"))
):
    new_order = Order(
        user_id=current_user["user_id"],
        restaurant_id=data.restaurant_id,
        order_status="PLACED"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {
        "message": "Order placed successfully",
        "order": new_order
    }
