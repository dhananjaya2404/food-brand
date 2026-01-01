from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.cart.models import Cart
from app.models.menu import Menu
from app.schemas.cart import CartSchema, CartUpdateSchema
from app.dependencies.roles import role_required

router = APIRouter(prefix="/cart", tags=["Cart"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ➕ ADD TO CART
@router.post("/add")
def add_to_cart(
    data: CartSchema,
    user=Depends(role_required("customer")),
    db: Session = Depends(get_db)
):
    # 1. Check if item exists in cart
    cart = db.query(Cart).filter(
        Cart.user_id == user["user_id"],
        Cart.restaurant_id == data.restaurant_id,
        Cart.menu_id == data.menu_id
    ).first()

    if cart:
        # Update quantity
        cart.quantity += data.quantity
        db.commit()
        return {"message": "Cart item updated"}

    # 2. Add new item
    cart = Cart(
        user_id=user["user_id"],
        restaurant_id=data.restaurant_id,
        menu_id=data.menu_id,
        quantity=data.quantity
    )
    db.add(cart)
    db.commit()
    return {"message": "Item added to cart"}


# 📥 GET CART (USER WISE)
@router.get("/get")
def get_cart(
    user=Depends(role_required("customer")),
    db: Session = Depends(get_db)
):
    items = db.query(Cart).filter(Cart.user_id == user["user_id"]).all()
    return items

# ✏️ UPDATE CART ITEM (QUANTITY)
@router.put("/update/{cart_id}")
def update_cart(
    cart_id: int,
    data: CartUpdateSchema,
    user=Depends(role_required("customer")),
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(
        Cart.cart_id == cart_id,
        Cart.user_id == user["user_id"]
    ).first()

    if not cart:
        raise HTTPException(status_code=404, detail="Cart item not found")

    cart.quantity = data.quantity
    db.commit()
    return {"message": "Cart updated successfully"}

# ❌ DELETE CART ITEM
@router.delete("/delete/{cart_id}")
def delete_cart(
    cart_id: int,
    user=Depends(role_required("customer")),
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(
        Cart.cart_id == cart_id,
        Cart.user_id == user["user_id"]
    ).first()

    if not cart:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart)
    db.commit()
    return {"message": "Cart item deleted"}
