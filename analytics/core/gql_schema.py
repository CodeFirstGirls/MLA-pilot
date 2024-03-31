from ariadne import gql, make_executable_schema, QueryType
from core.models import mongo
from core.query import stats_query, stats_by_username_query, stats_by_week_start_end_dates_query

type_defs = gql("""
    type Query {
        stats: [Stats]
        statsByUsername(username: String): [Stats]
        statsAggregatedByWeek(username:String, startdate: String, enddate: String): [Exercise]
    }

    type Stats {
        username: String!
        exercises: [Exercise!]      
    }

    type Exercise {
        exerciseType: ExerciseType!
        totalDuration: Int!
        totalDistance: Float
        averagePace: Float
        averageSpeed: Float
        topSpeed: Float
    }

    enum ExerciseType {
        Running
        Cycling
        Swimming
        Gym
        Walking
        Other
    }
    
""")

query = QueryType()


@query.field("stats")
def stats_resolver(*_):
    pipeline = stats_query()

    stats = list(mongo.db.exercises.aggregate(pipeline))
    return stats


@query.field("statsByUsername")
def stats_by_username_resolver(*_, username=None):
    pipeline = stats_by_username_query(username)

    stats = list(mongo.db.exercises.aggregate(pipeline))
    return stats


@query.field("statsAggregatedByWeek")
def stats_by_week_start_end_dates_resolver(*_, username=None, startdate=None, enddate=None):
    pipeline = stats_by_week_start_end_dates_query(
        username=username,
        start_date=startdate,
        end_date=enddate
    )

    stats = list(mongo.db.exercises.aggregate(pipeline))
    return stats


schema = make_executable_schema(type_defs, query)
