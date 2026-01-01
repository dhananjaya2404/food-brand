from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.order import Order
from app.services.delivery_assignment import assign_delivery_partner

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/place")
def place_order(user_id: int, restaurant_id: int, db: Session = Depends(get_db)):
    order = Order(user_id=user_id, restaurant_id=restaurant_id)
    db.add(order)
    db.commit()
    db.refresh(order)

    partner = assign_delivery_partner(db)

    if not partner:
        raise HTTPException(status_code=404, detail="No delivery partner available")

    order.delivery_partner_id = partner.partner_id
    order.order_status = "ASSIGNED"
    db.commit()

    return {
        "order_id": order.order_id,
        "delivery_partner_id": partner.partner_id,
        "status": "Order assigned successfully"
    }
