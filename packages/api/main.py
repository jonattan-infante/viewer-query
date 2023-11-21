from fastapi import FastAPI
from src.routes.users import router_user
from src.routes.comments import router_comment
from src.routes.querys import router_query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:9000"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(router_user)
app.include_router(router_comment)
app.include_router(router_query)
