from pydantic import BaseModel

class RegisterSchema(BaseModel):
    name: str
    email: str
    mobile_number: int
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str
