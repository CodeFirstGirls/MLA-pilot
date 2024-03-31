from flask import current_app as app
from core.gql_schema import schema
from core.models import mongo
from flask import Blueprint, jsonify, request
from bson import json_util
import traceback
import logging
from datetime import datetime, timedelta

from ariadne.explorer import ExplorerGraphiQL
from ariadne import graphql_sync

from core.query import stats_query, stats_by_username_query, stats_by_week_start_end_dates_query

stats_page = Blueprint('stats_page', __name__)


@stats_page.route('/')
def index():
    exercises = mongo.db.exercises.find()
    exercises_list = list(exercises)
    return json_util.dumps(exercises_list)


@stats_page.route('/stats')
def stats():
    pipeline = stats_query()

    stats = list(mongo.db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)


@stats_page.route('/stats/<username>', methods=['GET'])
def user_stats(username):
    pipeline = stats_by_username_query(username=username)

    stats = list(mongo.db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)


@stats_page.route('/stats/weekly/', methods=['GET'])
def weekly_user_stats():
    username = request.args.get('user')
    start_date = request.args.get('start')
    end_date = request.args.get('end')

    pipeline = stats_by_week_start_end_dates_query(
        username, start_date, end_date
    )

    try:
        stats = list(mongo.db.exercises.aggregate(pipeline))
        return jsonify(stats=stats)
    except Exception as e:
        app.logger.error(
            f"An error occurred while querying MongoDB: {e}")
        traceback.print_exc()
        return jsonify(error="An internal error occurred"), 500


explorer_html = ExplorerGraphiQL().html(None)


@stats_page.route('/stats/graphql', methods=["GET"])
def graphql_explorer():
    return explorer_html, 200


@stats_page.route("/stats/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema, data, context_value={"request": request}, debug=app.debug
    )
    app.logger.info(f'data returned: {result}')
    status_code = 200 if success else 400
    return jsonify(result), status_code
