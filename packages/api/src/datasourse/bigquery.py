from google.cloud import bigquery
from google.oauth2 import service_account
from src.config.settings import BIG_QUERY_PROJECT_ID

def session_bigquery():
    credentials = service_account.Credentials.from_service_account_file('credentials.json')
    cliente = bigquery.Client(
        project=BIG_QUERY_PROJECT_ID, credentials=credentials)
    return cliente


config = {
    "available_table": "tree",
    "available_columns": [
        "total_height", "unique_tree", "total_age",
        "cause_death_agent_code_name", "current_diameter", 
        "tree_status_code_name", "species_common_name"
    ]
}
