from src.datasourse.db import session
from src.models.querys import Query


def create(data):
    new_comment = Query(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    return session.query(Query).all()


def read_by_id(id):
    return session.query(Query).filter_by(id=id).first()


def update(id, data):
    comment = session.query(Query).filter_by(id=id).first()
    for key, value in data.items():
        setattr(comment, key, value)
    session.commit()
    return comment


def delete(id):
    comment = session.query(Query).filter_by(id=id).first()
    session.delete(comment)
    session.commit()
