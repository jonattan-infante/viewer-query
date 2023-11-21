from src.datasourse.db import session
from src.models.users import User


def create(data):
    new_comment = User(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    return session.query(User).all()


def read_by_username(username):
    return session.query(User).filter_by(username=username).first()

