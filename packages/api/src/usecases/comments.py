from src.datasourse.db import session
from src.models.comments import Comment


def create(data):
    new_comment = Comment(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    return session.query(Comment).all()


def read_by_id(id):
    return session.query(Comment).filter_by(id=id).first()


def update(id, data):
    comment = session.query(Comment).filter_by(id=id).first()
    for key, value in data.items():
        setattr(comment, key, value)
    session.commit()
    return comment


def delete(id):
    comment = session.query(Comment).filter_by(id=id).first()
    session.delete(comment)
    session.commit()
