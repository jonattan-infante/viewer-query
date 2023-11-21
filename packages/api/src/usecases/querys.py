from src.datasourse.db import session
from src.datasourse.bigquery import session_bigquery
from src.models.querys import Query
from src.models.users import User
from src.config.settings import BIG_QUERY_DATASET_ID


def create(data):
    new_comment = Query(**data)
    session.add(new_comment)
    session.commit()
    return new_comment


def read_all():
    querys = session.query(Query).join(User, Query.user_id == User.id).all()
    return [{
        "id": query.id,
        "name": query.name,
        "comment": query.comment,
        "name": query.name,
        "query": query.query,
        "user_id": query.user_id,
        "user": {
            "id": query.user.id,
            "username": query.user.username,
            "fullname": query.user.fullname
        }
    } for query in querys]


def read_by_id(id):
    return session.query(Query).filter_by(id=id).first()


def read_dataset_by_query(query):

    session = session_bigquery()

    string_query = f" SELECT {','.join(query.select)} FROM {BIG_QUERY_DATASET_ID}.{query.from_} LIMIT {query.limit}"
    print(string_query)
    result = session.query(string_query)
    df_result = result.to_dataframe()

    return df_result.to_dict('records')
