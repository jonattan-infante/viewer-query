from fastapi import APIRouter
from src.usecases.querys import create, read_all, read_by_id, update
from src.dto.querys import QueryCreate, QueryUpdate, Query

router_query = APIRouter(tags=['Querys'])

@router_query.post("/querys/")
def create_query(query: QueryCreate) -> Query:
    return create(query.dict())

@router_query.get("/querys/")
def get_all_query() -> list[Query]:
    return read_all()

@router_query.get("/querys/{query_id}")
def get_query_by_id(query_id: int) -> Query:
    return read_by_id(query_id)

@router_query.put("/querys/{query_id}")
def update_query(query_id: int, query: QueryUpdate) -> Query:
    return update(query_id, query.dict())