from typing import Optional, List
from pydantic import BaseModel, validator
from .users import User
from src.datasourse.bigquery import config


class SchemaQuery(BaseModel):
    select: List[str]
    from_: str
    where: Optional[str] = None
    limit: Optional[int] = 100

    @validator('select', each_item=True)
    def validate_select(cls, v):
        if v not in config['available_columns']:
            raise ValueError(f'Column {v} not available')
        return v

    @validator('from_')
    def validate_from(cls, v):
        if v != config['available_table']:
            raise ValueError(f'Table {v} not available')
        return v


class Query(BaseModel):
    id: int
    name: str
    comment: Optional[str] = None
    query: SchemaQuery
    user_id: int


class QueryCreate(BaseModel):
    name: str
    comment: Optional[str] = None
    query: SchemaQuery
    user_id: int


class QueryWithUser(BaseModel):
    id: int
    name: str
    comment: Optional[str] = None
    query: SchemaQuery
    user_id: int
    user: User
