from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.rating import Rating
from app.schemas.rating import RatingCreateSchema
from app.dependencies.roles import role_required

router = APIRouter(prefix="/ratings", tags=["Ratings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
def create_rating(
    data: RatingCreateSchema,
    db: Session = Depends(get_db),
    user=Depends(role_required("CUSTOMER"))
):
    rating = Rating(
        order_id=data.order_id,
        customer_id=user["user_id"],
        restaurant_id=data.restaurant_id,
        delivery_partner_id=data.delivery_partner_id,
        restaurant_rating=data.restaurant_rating,
        delivery_rating=data.delivery_rating,
        feedback=data.feedback
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return {
        "message": "Rating submitted successfully",
        "rating_id": rating.rating_id
    }
