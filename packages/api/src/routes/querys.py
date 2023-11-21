from fastapi import APIRouter
from src.usecases.querys import create, read_all, read_by_id, read_dataset_by_query
from src.dto.querys import QueryCreate, Query, QueryWithUser, SchemaQuery
from src.datasourse.bigquery import config

router_query = APIRouter(tags=['Querys'])


@router_query.post("/querys/")
def create_query(query: QueryCreate) -> Query:
    return create(query.dict())


@router_query.get("/querys/")
def get_all_query() -> list[QueryWithUser]:
    return read_all()


@router_query.post("/querys/dataset")
def get_data_by_query(query: SchemaQuery) -> list:
    return read_dataset_by_query(query)


@router_query.get("/querys/avaliable")
def get_available_filters() -> object:
    return config


@router_query.get("/querys/{query_id}")
def get_query_by_id(query_id: int) -> Query:
    return read_by_id(query_id)
