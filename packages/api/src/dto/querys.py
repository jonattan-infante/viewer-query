from typing import Optional
from pydantic import BaseModel

class Query(BaseModel):
    id: int
    name: str
    comment: Optional[str] = None
    query: str
    user_id: int

class QueryCreate(BaseModel):
    name: str
    comment: Optional[str] = None
    query: str
    user_id: int

class QueryUpdate(BaseModel):
    name: Optional[str] = None
    comment: Optional[str] = None
    query: Optional[str] = None