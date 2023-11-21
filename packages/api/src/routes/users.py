from fastapi import APIRouter, HTTPException
from src.usecases.users import create, read_all, read_by_username
from src.dto.users import UserCreate, User

router_user = APIRouter(tags=['Users'])

@router_user.post("/users/")
def create_user(user: UserCreate) -> User:
    return create(user.dict())

@router_user.get("/users/")
def get_all_user() -> list[User]:
    return read_all()

@router_user.get("/users/{username}")
def get_user_by_username(username: str) -> User:
    res = read_by_username(username)
    if res is None:
        raise HTTPException(status_code=404, detail="User not found")
    return res