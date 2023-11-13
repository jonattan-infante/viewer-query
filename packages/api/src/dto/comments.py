from typing import Optional
from pydantic import BaseModel


class Comment(BaseModel):
    id: int
    comment: str
    query_id: int
    user_id: int

class CommentCreate(BaseModel):
    comment: str
    query_id: int
    user_id: int

class CommentUpdate(BaseModel):
    comment: Optional[str] = None