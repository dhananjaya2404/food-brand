from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.restaurant import Restaurant
from app.schemas.restaurant import RestaurantCreate, RestaurantUpdate
from app.dependencies.roles import role_required

router = APIRouter(prefix="/restaurant", tags=["Restaurant"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
def create_restaurant(
    data: RestaurantCreate,
    db: Session = Depends(get_db),
    user=Depends(role_required(["restaurant", "RESTAURANT"]))
):
    restaurant = Restaurant(
        owner_id=user["user_id"],
        name=data.name,
        address=data.address
    )
    db.add(restaurant)
    db.commit()
    return {"message": "Restaurant created"}

@router.get("/all")
def get_restaurants(db: Session = Depends(get_db)):
    return db.query(Restaurant).all()

@router.get("/{restaurant_id}")
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@router.put("/{restaurant_id}")
def update_restaurant(
    restaurant_id: int,
    data: RestaurantUpdate,
    db: Session = Depends(get_db),
    user=Depends(role_required(["restaurant", "RESTAURANT"]))
):
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Check ownership
    if restaurant.owner_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this restaurant")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(restaurant, key, value)
    
    db.commit()
    return {"message": "Restaurant updated"}

@router.delete("/{restaurant_id}")
def delete_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
    user=Depends(role_required(["restaurant", "RESTAURANT"]))
):
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Check ownership
    if restaurant.owner_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this restaurant")

    db.delete(restaurant)
    db.commit()
    return {"message": "Restaurant deleted"}

