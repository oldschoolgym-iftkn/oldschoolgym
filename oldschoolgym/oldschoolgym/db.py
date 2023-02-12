import databases
from config import *

database = databases.Database(
    f"mysql://{DB_NAME}:{DB_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{DB_NAME}")
