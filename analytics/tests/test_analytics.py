from core import create_app
import json


def test_config():
    from config import TestConfig
    assert create_app(TestConfig).testing


def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200


def test_index_route_response_empty_data(client):
    response = client.get('/')
    data = json.loads(response.text)
    # check that the data recieved is empty as mongo fixture is not used
    assert len(data) == 0


def test_index_route_response_data(client, mongo):
    response = client.get('/')
    data = json.loads(response.text)
    # check there are 100 records in the response
    assert len(data) == 100


def test_stats_route(client):
    response = client.get('/stats')
    assert response.status_code == 200


def test_stats_route_respnse_empty_data(client):
    response = client.get('/stats')
    data = json.loads(response.text)
    # check that the `stats` data recieved is empty as mongo fixture is not used
    assert len(data['stats']) == 0


def test_stats_route_respnse_data(client, mongo):
    response = client.get('/stats')
    data = json.loads(response.text)
    # check that the `stats` data recieved is not empty
    assert len(data['stats']) > 0
