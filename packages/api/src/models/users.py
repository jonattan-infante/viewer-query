
from sqlalchemy import Column, Integer, String
from src.models.base import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    fullname = Column(String)
