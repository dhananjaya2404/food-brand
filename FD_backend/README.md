# FD_Brands Backend

Welcome to the **FD_Brands Backend** repository. This project is a robust and scalable backend service built with **FastAPI** (Python), designed to handle authentication, user management, and core business logic for the FD_Brands platform.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

- **High Performance**: Built on top of Starlette and Pydantic.
- **Secure Authentication**: JWT-based authentication flow (Register/Login).
- **Database Integration**: SQLAlchemy ORM for efficient database interactions.
- **Easy Deployment**: Docker-friendly and lightweight.

## 🛠 Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Database**: MySQL / SQLite (via SQLAlchemy)
- **Authentication**: OAuth2 with Password (and Hashing via Bcrypt)
- **Server**: Uvicorn (ASGI)

## ⚙️ Prerequisites

Ensure you have the following installed on your system:
- **Python 3.10** or higher
- **pip** (Python Package Installer)
- **Git** (version control)

## 🚀 Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/FD_Brands.git
    cd FD_Brands/FD_backend
    ```

2.  **Create a Virtual Environment** (Optional but Recommended)
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

## ▶️ Running the Application

To start the development server with live reloading, run:

```bash
uvicorn app.main:app --reload
```

- The server will start at `http://127.0.0.1:8000`.

## 📖 API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test endpoints interactively.
- **ReDoc**: Visit [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) for alternative documentation.

## 📂 Project Structure

          FD_backend/
│
├── app/
│   ├── main.py
│   │
│   ├── database/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── __init__.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── restaurant.py
│   │   ├── menu.py
│   │   ├── cart.py
│   │   ├── order.py
│   │   └── delivery_partner.py
│   │
│   ├── schemas/
│   │   ├── user.py
│   │   ├── restaurant.py
│   │   ├── menu.py
│   │   ├── cart.py
│   │   └── order.py
│   │
│   ├── routers/
│   │   ├── auth_routes.py
│   │   ├── restaurant_routes.py
│   │   ├── menu_routes.py
│   │   ├── cart_routes.py
│   │   ├── order_routes.py
│   │   └── analytics.py
│   │
│   ├── services/
│   │   └── delivery_assignment.py
│   │
│   ├── dependencies/
│   │   ├── auth.py
│   │   └── roles.py
│   │
│   └── core/
│       └── security.py
│
├── requirements.txt
└── README.md


## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
*Created for FD_Brands.*
# Food Delivery System (FastAPI)

## Tech Stack
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Swagger UI

## Authentication Flow
1. Register user
2. Login → get JWT token
3. Swagger/Postman automatically sends token
4. Role-based access enforced

## Roles
- CUSTOMER → place orders
- RESTAURANT → manage menu
- DELIVERY → delivery handling

## Security Rules
- JWT token required
- Role validation
- Restaurant ownership check

## Common Errors
### 403 Forbidden
Reason:
- Wrong role
- Restaurant ownership mismatch

Fix:
- Login as correct restaurant owner
- Use correct restaurant_id

### 1054 SQL Error
Reason:
- Wrong column name

Fix:
- Use actual column name from table schema
