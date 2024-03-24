from flask import Flask
from core.views import stats_page
from core.models import mongo
from flask_cors import CORS


def create_app(config):
    # create and configure app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)

    mongo.init_app(app)

    CORS(app, resources={r"/*": {"origins": "*"}},
         methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    app.register_blueprint(stats_page)

    return app
