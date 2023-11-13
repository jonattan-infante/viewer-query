from src.datasourse.db import session
from src.models.users import User


def create(data):
    new_comment = User(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    return session.query(User).all()


def read_by_id(id):
    return session.query(User).filter_by(id=id).first()


def update(id, data):
    comment = session.query(User).filter_by(id=id).first()
    for key, value in data.items():
        setattr(comment, key, value)
    session.commit()
    return comment


def delete(id):
    comment = session.query(User).filter_by(id=id).first()
    session.delete(comment)
    session.commit()
