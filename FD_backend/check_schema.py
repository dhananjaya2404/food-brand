from sqlalchemy import create_engine, inspect

DATABASE_URL = "mysql+pymysql://root:Gupta%401@localhost:3306/fd_db"

try:
    engine = create_engine(DATABASE_URL)
    inspector = inspect(engine)
    
    for table in ["restaurants", "menu_items", "cart", "users"]:
        try:
            columns = [c['name'] for c in inspector.get_columns(table)]
            print(f"Table {table} columns: {columns}")
        except Exception as e:
            print(f"Table {table} error: {e}")

except Exception as e:
    print(f"Error: {e}")
