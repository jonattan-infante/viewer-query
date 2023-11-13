from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    fullname: Optional[str] = None

class UserCreate(BaseModel):
    username: str
    fullname: Optional[str] = None

class UserUpdate(BaseModel):
    username: Optional[str] = None
    fullname: Optional[str] = None