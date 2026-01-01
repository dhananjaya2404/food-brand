from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.user import User
from app.schemas.user import RegisterSchema, LoginSchema
from app.core.security import hash_password, verify_password, create_token
from app.models.login import LoginHistory
router = APIRouter(prefix="/auth", tags=["Auth"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- REGISTER (POST) ----------------
@router.post("/register")
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    user = User(
        name=data.name,
        email=data.email,
        mobile_number=data.mobile_number,
        password=hash_password(data.password),
        role=data.role
    )
    db.add(user)
    db.commit()
    return {"message": "User registered"}
@router.get("/register")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"name": u.name, "email": u.email, "mobile_number": u.mobile_number, "role": u.role} for u in users]
@router.post("/login_history")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    existing_history = db.query(LoginHistory).filter(LoginHistory.user_id == user.user_id).first()
    if not existing_history:
        db.add(LoginHistory(user_id=user.user_id))
        db.commit()
    token = create_token({
        "user_id": user.user_id,
        "role": user.role
    })

    return {
        "access_token": token,
        "role": user.role
    }
# ---------------- REGISTER (GET) ----------------
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login")
def login_post(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"user_id": user.user_id, "role": user.role})
    return {"access_token": token}

from fastapi.security import OAuth2PasswordRequestForm
@router.get("/login")
def login_get(
    email: str = Query(...),
    password: str = Query(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"user_id": user.user_id, "role": user.role})
    return {"access_token": token}
