
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from src.models.base import Base


class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    comment = Column(String, nullable=False)
    query_id = Column(Integer, ForeignKey('queries.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    query = relationship("Query", backref="comments")
    user = relationship("User", backref="comments")
