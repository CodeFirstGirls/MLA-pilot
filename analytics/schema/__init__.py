import graphene

from .schema import (
    UserExerciseStats,
    Exercise,
    Preference,
    PreferenceInput,
    ExerciseQuery,
    PreferenceQuery,
    UpdatePreferences,
    Mutation,
    Query,
)

__all__ = [
    "UserExerciseStats",
    "Exercise",
    "Preference",
    "PreferenceInput",
    "ExerciseQuery",
    "PreferenceQuery",
    "UpdatePreferences",
    "Mutation",
    "Query",
]

schema = graphene.Schema(query=Query, mutation=Mutation)
