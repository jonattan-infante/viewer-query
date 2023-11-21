from typing import Optional
from pydantic import BaseModel
from .users import User


class Comment(BaseModel):
    id: int
    comment: str
    query_id: int
    user_id: int

class CommentWithUser(BaseModel):
    id: int
    comment: str
    query_id: int
    user_id: int
    user: User

class CommentCreate(BaseModel):
    comment: str
    query_id: int
    user_id: int

class CommentUpdate(BaseModel):
    comment: Optional[str] = None