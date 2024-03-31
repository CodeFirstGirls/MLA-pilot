import os
from dotenv import load_dotenv

load_dotenv()


class RunConfig:
    DEBUG = True
    MONGO_HOST_URI = os.getenv('MONGO_URI')
    MONGO_DB = os.getenv('MONGO_DB')
    MONGO_URI = f"{MONGO_HOST_URI}/{MONGO_DB}?authSource=admin"


class TestConfig:
    TESTING = True
    MONGO_HOST_URI = os.getenv('MONGO_URI')
    MONGO_DB = 'test'
    MONGO_URI = f"{MONGO_HOST_URI}/{MONGO_DB}?authSource=admin"
