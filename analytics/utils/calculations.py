# analytics/utils/calculations.py
import math

rep_to_percentage = {
    1: 100, 2: 97, 3: 94, 4: 92, 5: 89, 6: 86, 7: 83, 8: 81, 9: 78, 10: 75,
    11: 73, 12: 71, 13: 70, 14: 68, 15: 67, 16: 65, 17: 64, 18: 63, 19: 61, 20: 60,
    21: 59, 22: 58, 23: 57, 24: 56, 25: 55, 26: 54, 27: 53, 28: 52, 29: 51, 30: 50
}

def convert_units(weight, height, unit='metric'):
    """
    Converts weight and height to kilograms and meters if in imperial units.

    Args:
        weight (float): The weight in kilograms or pounds.
        height (float): The height in meters or inches.
        unit (str): The unit of measurement ('metric' or 'imperial').

    Returns:
        tuple: The weight in kilograms and height in meters.
    """
    if unit == 'imperial':
        weight *= 0.453592
        height *= 0.0254
    return weight, height

def calculate_1rm(reps, weight):
    """
    Calculates the one-rep max (1RM) based on the number of reps and weight lifted.
    Example usage:
        calculate_1rm(5, 100) -> returns the 1RM based on lifting 100kg for 5 reps

    Args:
        reps (int): The number of reps performed.
        weight (float): The weight lifted.

    Returns:
        float: The estimated one-rep max (1RM).
    """
    if not 1 <= reps <= 30:
        raise ValueError("Reps should be between 1 and 30.")
    percentage = rep_to_percentage.get(reps, 100) / 100.0  # Default to 100% if reps not in map
    return weight / percentage

def calculate_water_intake(weight_kg, activity_level='sedentary', climate='temperate'):
    """
    Calculates the recommended daily water intake based on weight, activity level, and climate.

    Args:
        weight_kg (float): The weight in kilograms.
        activity_level (str): The activity level ('sedentary', 'moderately active', 'active').
        climate (str): The climate ('temperate', 'hot').

    Returns:
        float: The recommended daily water intake in milliliters, adjusted for activity level and climate.
    """
    base_water_intake = weight_kg * 30
    if activity_level == 'moderately active':
        base_water_intake *= 1.2
    elif activity_level == 'active':
        base_water_intake *= 1.5

    if climate == 'hot':
        base_water_intake *= 1.2

    return base_water_intake

def calculate_waist_to_height_ratio(waist_cm, height_cm):
    """
    Calculates the Waist to Height Ratio (WHtR).

    Args:
        waist_cm (float): The waist circumference in centimeters.
        height_cm (float): The height in centimeters.

    Returns:
        float: The Waist to Height Ratio.
    """
    if height_cm <= 0:
        raise ValueError("Height must be greater than 0.")
    return waist_cm / height_cm
    
def calculate_bmi(weight, height):
    """
    Calculates the Body Mass Index (BMI) based on weight and height.

    Args:
        weight (float): The weight in kilograms.
        height (float): The height in meters.

    Returns:
        float: The calculated BMI.
    """
    bmi = weight / (height ** 2)
    return bmi

def calculate_bmr(weight, height, age, gender):
    """
    Calculates the Basal Metabolic Rate (BMR) based on weight, height, age, and gender.

    Args:
        weight (float): The weight in kilograms.
        height (float): The height in centimeters.
        age (int): The age in years.
        gender (str): The gender ('male' or 'female').

    Returns:
        float: The calculated BMR.
    """
    if gender == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    elif gender == 'female':
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    else:
        raise ValueError("Invalid gender. Please specify 'male' or 'female'.")
    return bmr

def calculate_tdee(bmr, activity_level):
    """
    Calculates the Total Daily Energy Expenditure (TDEE) based on Basal Metabolic Rate (BMR) and activity level.

    Args:
        bmr (float): The Basal Metabolic Rate (BMR) calculated using calculate_bmr function.
        activity_level (str): The activity level, which can be one of the following:
            Sedentary: little or no exercise
            Lightly active: light exercise/sports 1-3 days/week
            Moderately active: moderate exercise/sports 3-5 days/week
            Very active: hard exercise/sports 6-7 days a week
            Extra active: very hard exercise/sports & physical job or 2x training

    Returns:
        float: The calculated TDEE.
    """
    activity_multipliers = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9
    }

    activity_level = activity_level.lower()
    if activity_level not in activity_multipliers:
        raise ValueError("Invalid activity level. Please choose one of: sedentary, lightly active, moderately active, very active, extra active.")

    return bmr * activity_multipliers[activity_level]

def calculate_max_heart_rate(age):
    """
    Calculates the maximum recommended heart rate based on age.

    Args:
        age (int): The age in years.

    Returns:
        int: The calculated maximum recommended heart rate.
    """
    return 220 - age

def calculate_heart_rate_zones(max_heart_rate):
    """
    Calculates the heart rate zones based on the maximum recommended heart rate.

    Args:
        max_heart_rate (int): The maximum recommended heart rate.

    Returns:
        dict: A dictionary containing heart rate zones with their percentage ranges.
    """
    zones = {
        "Zone 1": (0.5 * max_heart_rate, 0.6 * max_heart_rate),
        "Zone 2": (0.6 * max_heart_rate, 0.7 * max_heart_rate),
        "Zone 3": (0.7 * max_heart_rate, 0.8 * max_heart_rate),
        "Zone 4": (0.8 * max_heart_rate, 0.9 * max_heart_rate),
        "Zone 5": (0.9 * max_heart_rate, max_heart_rate)
    }
    return zones

def calculate_calories_burned(met_value, weight_kg, duration_minutes):
    """
    Calculates the calories burned during exercise based on MET value, weight, and duration.

    Args:
        met_value (float): The MET value of the activity.
        weight_kg (float): The weight in kilograms.
        duration_minutes (float): The duration of the activity in minutes.

    Returns:
        float: The estimated calories burned.
    """
    return met_value * weight_kg * duration_minutes / 60

def calculate_water_intake(weight_kg):
    """
    Calculates the recommended daily water intake based on weight.

    Args:
        weight_kg (float): The weight in kilograms.

    Returns:
        float: The recommended daily water intake in milliliters.
    """
    return weight_kg * 30

def calculate_protein_intake(weight_kg):
    """
    Calculates the recommended daily protein intake based on weight.

    Args:
        weight_kg (float): The weight in kilograms.

    Returns:
        float: The recommended daily protein intake in grams.
    """
    return weight_kg * 2

def calculate_fat_intake(weight_kg):
    """
    Calculates the recommended daily fat intake based on weight.

    Args:
        weight_kg (float): The weight in kilograms.

    Returns:
        float: The recommended daily fat intake in grams.
    """
    return weight_kg * 0.8

def calculate_carb_intake(tdee, protein_intake, fat_intake):
    """
    Calculates the recommended daily carbohydrate intake based on Total Daily Energy Expenditure (TDEE),
    protein intake, and fat intake.

    Args:
        tdee (float): The Total Daily Energy Expenditure (TDEE) calculated using calculate_tdee function.
        protein_intake (float): The recommended daily protein intake in grams.
        fat_intake (float): The recommended daily fat intake in grams.

    Returns:
        float: The recommended daily carbohydrate intake in grams.
    """
    carb_calories = tdee - (protein_intake * 4) - (fat_intake * 9)
    return carb_calories / 4

def calculate_macro_ratios(protein_intake, fat_intake, carb_intake):
    """
    Calculates the macronutrient ratios based on protein, fat, and carbohydrate intake.

    Args:
        protein_intake (float): The recommended daily protein intake in grams.
        fat_intake (float): The recommended daily fat intake in grams.
        carb_intake (float): The recommended daily carbohydrate intake in grams.

    Returns:
        dict: A dictionary containing the macronutrient ratios in percentage.
    """
    total_calories = (protein_intake * 4) + (fat_intake * 9) + (carb_intake * 4)
    protein_ratio = (protein_intake * 4) / total_calories * 100
    fat_ratio = (fat_intake * 9) / total_calories * 100
    carb_ratio = (carb_intake * 4) / total_calories * 100
    return {
        "Protein": protein_ratio,
        "Fat": fat_ratio,
        "Carbohydrate": carb_ratio
    }

def calculate_ideal_weight(height_cm):
    """
    Calculates the ideal weight based on height using the Devine formula.

    Args:
        height_cm (float): The height in centimeters.

    Returns:
        float: The calculated ideal weight in kilograms.
    """
    if height_cm < 152.4:
        return 45.5
    elif height_cm > 152.4:
        return 45.5 + ((height_cm - 152.4) * 0.91)
    else:
        return 0

def calculate_lean_body_mass(weight_kg, body_fat_percentage):
    """
    Calculates the lean body mass based on weight and body fat percentage.

    Args:
        weight_kg (float): The weight in kilograms.
        body_fat_percentage (float): The body fat percentage.

    Returns:
        float: The calculated lean body mass in kilograms.
    """
    return weight_kg * (1 - body_fat_percentage / 100)

def calculate_fat_mass(weight_kg, lean_body_mass):
    """
    Calculates the fat mass based on weight and lean body mass.

    Args:
        weight_kg (float): The weight in kilograms.
        lean_body_mass (float): The lean body mass in kilograms.

    Returns:
        float: The calculated fat mass in kilograms.
    """
    return weight_kg - lean_body_mass

def calculate_heart_rate_recovery(heart_rate_before, heart_rate_after, time_minutes):
    """
    Calculates the heart rate recovery (HRR) based on heart rate before and after exercise.

    Args:
        heart_rate_before (int): The heart rate before exercise.
        heart_rate_after (int): The heart rate after exercise.
        time_minutes (int): The time elapsed in minutes.

    Returns:
        int: The calculated heart rate recovery in beats per minute.
    """
    return heart_rate_before - heart_rate_after / time_minutes

def calculate_vo2_max(distance_km, time_minutes):
    """
    Calculates the VO2 max based on distance covered and time taken.

    Args:
        distance_km (float): The distance covered in kilometers.
        time_minutes (float): The time taken in minutes.

    Returns:
        float: The calculated VO2 max in milliliters of oxygen per kilogram of body weight per minute (ml/kg/min).
    """
    vo2_max = 15 * (distance_km / time_minutes) + 3.5
    return vo2_max

def calculate_wilks_score(body_weight_kg, total_weight_lifted_kg):
    """
    Calculates the Wilks score based on body weight and total weight lifted.

    Args:
        body_weight_kg (float): The body weight in kilograms.
        total_weight_lifted_kg (float): The total weight lifted in kilograms.

    Returns:
        float: The calculated Wilks score.
    """
    a = -216.0475144
    b = 16.2606339
    c = -0.002388645
    d = -0.00113732
    e = 7.01863E-06
    f = -1.291E-08

    wilks_score = total_weight_lifted_kg * 500 / (a + b * body_weight_kg + c * body_weight_kg ** 2 + d * body_weight_kg ** 3 + e * body_weight_kg ** 4 + f * body_weight_kg ** 5)
    return wilks_score

def calculate_ipf_points(body_weight_kg, total_lifted_kg, gender):
    """
    Calculates the IPF (International Powerlifting Federation) points.

    Args:
        body_weight_kg (float): The body weight of the lifter in kilograms.
        total_lifted_kg (float): The total weight lifted in kilograms (the sum of the best squat, bench press, and deadlift).
        gender (str): The gender of the lifter ('male' or 'female').

    Returns:
        float: The calculated IPF points.
    """
    if gender.lower() == 'male':
        # Coefficients for men
        a, b, c, d, e, f = -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08
    elif gender.lower() == 'female':
        # Coefficients for women
        a, b, c, d, e, f = 594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582E-05, -9.054E-08
    else:
        raise ValueError("Invalid gender. Please specify 'male' or 'female'.")

    ipf_score = 500 / (a + b * body_weight_kg + c * pow(body_weight_kg, 2) + d * pow(body_weight_kg, 3) + e * pow(body_weight_kg, 4) + f * pow(body_weight_kg, 5)) * total_lifted_kg
    return ipf_score

def calculate_body_fat_percentage(weight_kg, waist_cm, height_cm, hip_cm, neck_cm):
    """
    Calculates the body fat percentage based on weight, waist circumference, hip circumference, and neck circumference.

    Args:
        weight_kg (float): The weight in kilograms.
        waist_cm (float): The waist circumference in centimeters.
        hip_cm (float): The hip circumference in centimeters.
        neck_cm (float): The neck circumference in centimeters.

    Returns:
        float: The calculated body fat percentage.
    """
    waist_hip_ratio = waist_cm / hip_cm
    body_fat_percentage = 495 / (1.0324 - 0.19077 * math.log10(waist_cm - neck_cm) + 0.15456 * math.log10(height_cm)) - 450
    return body_fat_percentage