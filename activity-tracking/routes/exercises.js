const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

// GET: Retrieve all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ date: 'desc' });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// GET: Retrieve all exercises for a user
router.get('/user/:username', async (req, res) => {
  try {
    const exercises = await Exercise.find({ "username": req.params.username }).sort({ date: 'desc' });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// POST: Add a new exercise
router.post('/add', async (req, res) => {
  try {
    const { username, exerciseType, description, duration, date, distance, speed, pace } = req.body;

    const newExercise = new Exercise({
      username,
      exerciseType,
      description,
      duration: Number(duration),
      date: new Date(date),
      distance: Number(distance),
      speed: Number(speed),
      pace: Number(pace)
    });

    await newExercise.save();
    res.json({ message: 'Exercise added!', data: newExercise });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// PUT: Update an exercise by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { username, exerciseType, description, duration, date, distance, speed, pace } = req.body;

    if (!username || !exerciseType || !duration || !date) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const updatedFields = {
      username,
      exerciseType,
      description,
      duration: Number(duration),
      date: new Date(date),
      distance: Number(distance),
      speed: Number(speed),
      pace: Number(pace)
    };

    const exercise = await Exercise.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    res.json({ message: 'Exercise updated!', exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the exercise' });
  }
});

// GET: Retrieve an exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// DELETE: Delete an exercise by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json({ message: 'Exercise deleted.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

module.exports = router;