from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.menu import MenuItem, Menu
from app.models.restaurant import Restaurant
from app.schemas.menu import MenuCreate, MenuUpdate, MenuCreateSchema
from app.dependencies.roles import role_required
from app.dependencies.auth import get_current_user
from typing import List
router = APIRouter(prefix="/menu", tags=["Menu"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

# @router.post("/add")
# def add_menu_item(
#     data: MenuCreateSchema,
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
#     # 1️⃣ Find restaurant
#     restaurant = db.query(Restaurant).filter(
#         Restaurant.restaurant_id == data.restaurant_id
#     ).first()

#     if not restaurant:
#         raise HTTPException(status_code=404, detail="Restaurant not found")

#     # 2️⃣ Ownership check
#     if restaurant.owner_id != current_user.get("user_id"):
#         raise HTTPException(
#             status_code=403,
#             detail="Not authorized to add items to this restaurant"
#         )

#     # 3️⃣ Create menu item
#     menu = Menu(
#         restaurant_id=data.restaurant_id,
#         name=data.name,
#         price=data.price,
#         food_type=data.food_type,
#         image_url=data.image_url,
#         description=data.description
#     )

#     db.add(menu)
#     db.commit()
#     db.refresh(menu)

#     return {
#         "message": "Menu item added successfully",
#         "item_id": menu.item_id
#     }
@router.post("/add")
def add_menu_item(
    data: MenuCreateSchema,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    restaurant = db.query(Restaurant).filter(
        Restaurant.restaurant_id == data.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    if restaurant.owner_id != current_user.get("user_id"):
        raise HTTPException(
            status_code=403,
            detail="Not authorized to add items to this restaurant"
        )
    image_url = data.image_url or "http://127.0.0.1:8000/assest/upload/placeholder.png"

    menu = Menu(
        restaurant_id=data.restaurant_id,
        name=data.name,
        price=data.price,
        food_type=data.food_type,
        image_url=image_url,
        description=data.description
    )

    db.add(menu)
    db.commit()
    db.refresh(menu)

    return {
        "message": "Menu item added successfully",
        "item_id": menu.item_id,
        "image_url": menu.image_url 
    }

#image upload
from fastapi import UploadFile, File, APIRouter
import os, uuid

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "assest", "upload")

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    upload_dir = "assest/upload"
    os.makedirs(upload_dir, exist_ok=True)  # create folder if it doesn't exist

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as f:
        f.write(await file.read())

    return {
        "url": f"http://127.0.0.1:8000/assest/upload/{filename}"
    }

# @router.get("/upload")
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import os

BASE_URL = "http://127.0.0.1:8000/assest/upload/"

@router.get("/all")
def get_all_menu_items(db: Session = Depends(get_db)):
    items = db.query(MenuItem).all()
    if not items:
        raise HTTPException(status_code=404, detail="No menu items found")

    result = []
    for item in items:
        result.append({
            "item_id": item.item_id,
            "name": item.name,
            "price": item.price,
            "food_type": item.food_type,
            "description": item.description,
            "image_url": item.image_url or BASE_URL + "placeholder.png"  # fallback
        })
    return result

@router.get("/{restaurant_id}")
def view_menu(restaurant_id: int, db: Session = Depends(get_db)):
    return db.query(MenuItem).filter(
        MenuItem.restaurant_id == restaurant_id,
        MenuItem.is_available == True
    ).all()

@router.get("/item/{item_id}")
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item

@router.put("/{item_id}")
def update_menu_item(
    item_id: int,
    data: MenuUpdate,
    db: Session = Depends(get_db),
    user=Depends(role_required(["restaurant", "RESTAURANT"]))
):
    item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    # Verify restaurant ownership
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == item.restaurant_id).first()
    if not restaurant or restaurant.owner_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this menu item")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(item, key, value)
    
    db.commit()
    db.refresh(item)  # <-- refresh the item to get updated values

    # Return the updated item
    return item


@router.delete("/{item_id}")
def delete_menu_item(
    item_id: int,
    db: Session = Depends(get_db),
    user=Depends(role_required(["restaurant", "RESTAURANT"]))
):
    item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    # Verify restaurant ownership
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == item.restaurant_id).first()
    if not restaurant or restaurant.owner_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this menu item")

    db.delete(item)
    db.commit()
    return {"message": "Menu item deleted"}
