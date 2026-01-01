from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.roles import role_required
from app.database.session import get_db
from app.models.order import Order
from app.services.delivery_assignment import assign_delivery_partner

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/create")
def create_order(user=Depends(role_required("CUSTOMER")), db: Session = Depends(get_db)):
    order = Order(user_id=user["user_id"], restaurant_id=0)
    db.add(order)
    db.commit()
    db.refresh(order)

    partner = assign_delivery_partner(db)
    if partner:
        order.delivery_partner_id = partner.partner_id
        order.order_status = "ASSIGNED"
        db.commit()

    return {
        "message": "Order placed successfully",
        "status": order.order_status,
        "order_id": order.order_id,
        "delivery_partner_id": order.delivery_partner_id
    }

@router.get("/my-orders")
def my_orders(user=Depends(role_required("CUSTOMER"))):
    return {
        "orders": [],
        "user_id": user["user_id"]
    }
