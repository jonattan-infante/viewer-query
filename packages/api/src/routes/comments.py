from fastapi import APIRouter
from src.usecases.comments import create, read_all, read_by_id_query
from src.dto.comments import CommentCreate, Comment, CommentWithUser

router_comment = APIRouter(tags=['Comments'])

@router_comment.post("/comments/")
def create_comment(comment: CommentCreate) -> Comment:
    return create(comment.dict())

@router_comment.get("/comments/")
def get_all_comment() -> list[Comment]:
    return read_all()

@router_comment.get("/comments/{query_id}")
def get_comment_by_id_query(query_id: int) -> list[CommentWithUser]:
    return read_by_id_query(query_id)
