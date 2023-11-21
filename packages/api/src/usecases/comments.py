from src.datasourse.db import session
from src.models.comments import Comment
from src.models.users import User

def create(data):
    new_comment = Comment(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    return session.query(Comment).all()


def read_by_id_query(id):

    comments = session.query(Comment).join(User, Comment.user_id == User.id).filter_by(id=id).all()
    return [{
        "id": comment.id,
        "comment": comment.comment,
        "query_id": comment.query_id,
        "user_id": comment.user_id,
        "user": {
            "id": comment.user.id,
            "username": comment.user.username,
            "fullname": comment.user.fullname    
        }
    } for comment in comments]

