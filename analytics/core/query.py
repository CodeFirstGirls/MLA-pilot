from datetime import datetime, timedelta


def stats_query():
    return [
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"},
                "totalDistance": {"$sum": "$distance"},
                "averagePace": {"$avg": "$pace"},
                "averageSpeed": {"$avg": "$speed"},
                "topSpeed": {"$max": "$speed"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration",
                        "totalDistance": "$totalDistance",
                        "averagePace": "$averagePace",
                        "averageSpeed": "$averageSpeed",
                        "topSpeed": "$topSpeed"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]


def stats_by_username_query(username):
    return [
        {
            "$match": {"username": username}
        },
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"},
                "totalDistance": {"$sum": "$distance"},
                "averagePace": {"$avg": "$pace"},
                "averageSpeed": {"$avg": "$speed"},
                "topSpeed": {"$max": "$speed"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration",
                        "totalDistance": "$totalDistance",
                        "averagePace": "$averagePace",
                        "averageSpeed": "$averageSpeed",
                        "topSpeed": "$topSpeed"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]


def stats_by_week_start_end_dates_query(username, start_date, end_date):
    # format the string dates to a form accepted by mongodb
    date_format = "%Y-%m-%d"
    start_date = datetime.strptime(start_date, date_format)
    # Include the whole end day
    end_date = datetime.strptime(end_date, date_format) + timedelta(days=1)

    return [
        {
            "$match": {
                "username": username,
                "date": {
                    "$gte": start_date,
                    "$lt": end_date
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"},
                "totalDistance": {"$sum": "$distance"},
                "averagePace": {"$avg": "$pace"},
                "averageSpeed": {"$avg": "$speed"},
                "topSpeed": {"$max": "$speed"}
            }
        },
        {
            "$project": {
                "exerciseType": "$_id.exerciseType",
                "totalDuration": 1,
                "totalDistance": 1,
                "averagePace": 1,
                "averageSpeed": 1,
                "topSpeed": 1,
                "_id": 0
            }
        }
    ]
