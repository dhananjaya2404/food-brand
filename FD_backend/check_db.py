from sqlalchemy import create_engine, inspect
import sys

DATABASE_URL = "mysql+pymysql://root:Gupta%401@localhost:3306/fd_db"

try:
    engine = create_engine(DATABASE_URL)
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Connection successful!")
    print(f"Tables found: {', '.join(tables)}")
    
    for table in tables:
        columns = inspector.get_columns(table)
        print(f"\nTable: {table}")
        for column in columns:
            print(f" - {column['name']} ({column['type']})")

except Exception as e:
    print(f"Connection failed: {e}")
    sys.exit(1)
