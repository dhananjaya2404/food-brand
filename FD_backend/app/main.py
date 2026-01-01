from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.session import engine
from app.database.base import Base
from app.auth.routes import router as auth_router
from app.routers.user_routes import router as user_router
from app.routers.restaurant_routes import router as restaurant_router
from app.routers.menu_routes import router as menu_router
from app.routers.cart_routes import router as cart_router
from app.orders.routes import router as order_router

app = FastAPI(title="Food Delivery System")
# ✅ CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        " http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(restaurant_router)
app.include_router(menu_router)
app.include_router(cart_router)
app.include_router(order_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FD_Brands", "details": "Food Delivery System"}

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
from app.routers.rating_routes import router as rating_router

app.include_router(rating_router)

from app.routers.analytics import router as analytics_router

app.include_router(analytics_router)

from fastapi.staticfiles import StaticFiles
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

ASSET_DIR = os.path.join(PROJECT_ROOT, "assest")
os.makedirs(ASSET_DIR, exist_ok=True)  # ensures folder exists

app.mount("/assest", StaticFiles(directory=ASSET_DIR), name="assest")
