from fastapi import APIRouter
from src.usecases.comments import create, read_all, read_by_id, update
from src.dto.comments import CommentCreate, CommentUpdate, Comment

router_comment = APIRouter(tags=['Comments'])

@router_comment.post("/comments/")
def create_comment(comment: CommentCreate) -> Comment:
    return create(comment.dict())

@router_comment.get("/comments/")
def get_all_comment() -> list[Comment]:
    return read_all()

@router_comment.get("/comments/{comment_id}")
def get_comment_by_id(comment_id: int) -> Comment:
    return read_by_id(comment_id)

@router_comment.put("/comments/{comment_id}")
def update_comment(comment_id: int, comment: CommentUpdate) -> Comment:
    return update(comment_id, comment.dict())