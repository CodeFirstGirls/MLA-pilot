import pytest
from core import create_app
from config import TestConfig
import json


@pytest.fixture
def app():
    app = create_app(TestConfig)
    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


@pytest.fixture()
def mongo(app):
    """
    Fixture to load data into the mongo db collection
    and clean up once done
    """
    from core.models import mongo
    # Loading the database data from json file to `exercises` collection
    with open('tests/db_init_data.json') as file:
        file_data = json.load(file)
    mongo.db.exercises.insert_many(file_data)
    yield mongo
    # clean up
    mongo.db.drop_collection('exercises')
