from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.models.order import Order
from app.models.restaurant import Restaurant

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/peak-hours")
def peak_hours(db: Session = Depends(get_db)):
    """
    Shows peak ordering hours
    """
    result = (
        db.query(
            func.hour(Order.order_time).label("hour"),
            func.count(Order.order_id).label("orders")
        )
        .group_by("hour")
        .order_by(func.count(Order.order_id).desc())
        .all()
    )

    return result


@router.get("/avg-delivery-time")
def avg_delivery_time(db: Session = Depends(get_db)):
    """
    Average delivery time per restaurant (in seconds)
    """
    result = (
        db.query(
            Restaurant.name,
            func.avg(
                func.timestampdiff(
                    func.SECOND,
                    Order.order_time,
                    Order.delivered_time
                )
            ).label("avg_seconds")
        )
        .join(Order)
        .group_by(Restaurant.name)
        .all()
    )

    return result
