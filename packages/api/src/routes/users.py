from fastapi import APIRouter
from src.usecases.users import create, read_all, read_by_id, update
from src.dto.users import UserCreate, UserUpdate, User

router_user = APIRouter(tags=['Users'])

@router_user.post("/users/")
def create_user(user: UserCreate) -> User:
    return create(user.dict())

@router_user.get("/users/")
def get_all_user() -> list[User]:
    return read_all()

@router_user.get("/users/{user_id}")
def get_user_by_id(user_id: int) -> User:
    return read_by_id(user_id)

@router_user.put("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate) -> User:
    return update(user_id, user.dict())