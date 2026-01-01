from app.database.session import SessionLocal
from app.models.user import User

db = SessionLocal()
try:
    # Fix 'resturant'
    users_bad_spell_1 = db.query(User).filter(User.role == "resturant").all()
    for u in users_bad_spell_1:
        u.role = "restaurant"
        print(f"Updated {u.email} role from 'resturant' to 'restaurant'")

    # Fix 'resturent'
    users_bad_spell_2 = db.query(User).filter(User.role == "resturent").all()
    for u in users_bad_spell_2:
        u.role = "restaurant"
        print(f"Updated {u.email} role from 'resturent' to 'restaurant'")
    
    db.commit()
    print("User roles updated successfully.")
except Exception as e:
    print(f"Error updating roles: {e}")
    db.rollback()
finally:
    db.close()
