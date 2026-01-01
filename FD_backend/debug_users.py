from app.database.session import SessionLocal
from app.models.user import User

db = SessionLocal()
print("--- Existing Users ---")
users = db.query(User).all()
if not users:
    print("No users found.")
else:
    for u in users:
        print(f"ID: {u.user_id}, Email: {u.email}, Role: '{u.role}'")  # viewing role with quotes to see spaces/case
print("----------------------")
db.close()
