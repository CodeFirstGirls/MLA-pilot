const { Given, When, Then } = require("@cucumber/cucumber");

let exercises = [];

const addExercise = (name, duration) => {
    const existingExercise = exercises.find(exercise => exercise.name === name);
    if (existingExercise) {
        return { success: false, message: 'Exercise already exists' };
    }
    exercises.push({ name, duration });
    return { success: true };
}

const getExercises = () => {
    return exercises;
}

Given('I have an exercise', function () {
    exercises = [{ name: "Running", duration: 30 }];
});

When('I get all exercises', function () {
    this.exercises = getExercises();
});

Then('I should see my exercise in the list', function () {
    if (this.exercises.length !== 1) {
        throw new Error("Exercise list should have one exercise");
    }
});

Given('I have no exercises', function () {
    exercises = [];
});

When('I add an exercise', function () {
    this.addResult = addExercise("Running", 30);
});

Then('the exercise should be added to my list', function () {
    if (!this.addResult.success) {
        throw new Error("Exercise was not added successfully");
    }
    if (exercises.length !== 1) {
        throw new Error("Exercise list should have one exercise");
    }
});