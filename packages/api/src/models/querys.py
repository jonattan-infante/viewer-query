from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from src.models.base import Base

class Query(Base):
    __tablename__ = 'queries'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    comment = Column(String)
    query = Column(JSON, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", backref="queries")


