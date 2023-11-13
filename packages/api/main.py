from fastapi import FastAPI
from src.routes.users import router_user
from src.routes.comments import router_comment
from src.routes.querys import router_query

app = FastAPI()
app.include_router(router_user)
app.include_router(router_comment)
app.include_router(router_query)
