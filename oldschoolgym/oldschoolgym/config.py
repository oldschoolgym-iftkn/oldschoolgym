import os
from dotenv import load_dotenv

load_dotenv()
DB_ADDRESS = os.environ.get('DB_ADDRESS')
DB_PORT = os.environ.get('DB_PORT')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')
