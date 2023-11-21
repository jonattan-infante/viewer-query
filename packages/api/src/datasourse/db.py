from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.config.settings import POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

sqlalchemy_url = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres/{POSTGRES_DB}'
engine = create_engine(sqlalchemy_url)
Session = sessionmaker(bind=engine)
session = Session()