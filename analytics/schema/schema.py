import graphene
from graphene import ObjectType, String, Int, List, Field, Mutation, InputObjectType

# Define your types here
class UserExerciseStats(ObjectType):
    exercise_type = String(required=True)
    subcategory = String()
    total_duration = Int(required=True)
    total_sets = Int()
    total_reps = Int()
    average_weight_lifted = graphene.Float()

class Exercise(ObjectType):
    exercise_type = String(required=True)
    subcategory = String()
    total_duration = Int(required=True)
    total_sets = Int()
    total_reps = Int()
    average_weight_lifted = graphene.Float()

class Preference(ObjectType):
    username = String(required=True)
    goal = String()
    fitness_level = String()
    available_time = Int()
    workout_schedule = List(String)
    equipment = List(String)
    limitations = List(String)
    feedback = String()
    routine = String()

class PreferenceInput(InputObjectType):
    username = String(required=True)
    goal = String()
    fitness_level = String()
    available_time = Int()
    workout_schedule = List(String)
    equipment = List(String)
    limitations = List(String)
    feedback = String()
    routine = String()

# Queries
class ExerciseQuery(ObjectType):
    all_exercise_stats = List(UserExerciseStats)
    def resolve_all_exercise_stats(root, info):
        # Dummy data for the sake of example
        return [
            UserExerciseStats(
                exercise_type="Running",
                subcategory="Cardio",
                total_duration=120,
                total_sets=None,
                total_reps=None,
                average_weight_lifted=None
            )
        ]

class PreferenceQuery(ObjectType):
    all_preferences = List(Preference)
    def resolve_all_preferences(root, info):
        # Dummy data for the sake of example
        return [
            Preference(
                username="user1",
                goal="Weight Loss",
                fitness_level="Beginner",
                available_time=60,
                workout_schedule=["Monday", "Wednesday", "Friday"],
                equipment=["Dumbbells"],
                limitations=[],
                feedback="Need more cardio",
                routine="Custom routine 1"
            )
        ]

# Mutations
class UpdatePreferences(Mutation):
    class Arguments:
        input = PreferenceInput(required=True)

    preference = Field(Preference)

    def mutate(root, info, input):
        # Dummy implementation
        return UpdatePreferences(
            preference=Preference(
                username=input.username,
                goal=input.goal,
                fitness_level=input.fitness_level,
                available_time=input.available_time,
                workout_schedule=input.workout_schedule,
                equipment=input.equipment,
                limitations=input.limitations,
                feedback=input.feedback,
                routine=input.routine
            )
        )

class Mutation(ObjectType):
    update_preferences = UpdatePreferences.Field()

# Schema definition
class Query(ExerciseQuery, PreferenceQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)