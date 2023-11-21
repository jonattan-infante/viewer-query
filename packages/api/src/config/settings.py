from dotenv import load_dotenv
import os

load_dotenv()

BIG_QUERY_PROJECT_ID = os.getenv("BIG_QUERY_PROJECT_ID")
BIG_QUERY_DATASET_ID = os.getenv("BIG_QUERY_DATASET_ID")
POSTGRES_USER=os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD=os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB=os.getenv('POSTGRES_DB')