from flask import Flask
from core.views import stats_page
from core.models import mongo
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics


def create_app(config):
    # create and configure app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)

    mongo.init_app(app)

    if not app.testing:
        # collect metrics when not in testing
        metrics = PrometheusMetrics(app)
        metrics.info('app_info', 'Application Info', version='1.2')

    CORS(app, resources={r"/*": {"origins": "*"}},
         methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    app.register_blueprint(stats_page)

    return app
