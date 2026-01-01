from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ===============================
    # APPLICATION
    # ===============================
    APP_NAME: str = "Food Delivery System"
    DEBUG: bool = True

    # ===============================
    # DATABASE
    # ===============================
    # SQLite (default for dev)
    DATABASE_URL: str = "sqlite:///./food_delivery.db"

    # MySQL example (uncomment when needed)
    # DATABASE_URL: str = "mysql+pymysql://user:password@localhost:3306/food_delivery"

    # ===============================
    # JWT AUTHENTICATION
    # ===============================
    SECRET_KEY: str = "CHANGE_THIS_SECRET_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    # ===============================
    # PASSWORD HASHING
    # ===============================
    PASSWORD_HASH_SCHEME: str = "bcrypt"

    # ===============================
    # CORS (Frontend Integration)
    # ===============================
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",   # React frontend
        "http://127.0.0.1:3000"
    ]

    class Config:
        env_file = ".env"   # Allows environment-based config


# Single settings object used across the app
settings = Settings()
