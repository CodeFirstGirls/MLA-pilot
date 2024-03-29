const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userprofile.model');

// GET: Retrieve all userprofiles 
router.get('/', async (req, res) => {
    try {
        const userprofiles = await UserProfile.find();
        res.json(userprofiles);
    } catch (error) {
        res.status(400).json({ error: 'Error: ' + error.message });
    }
});

// GET: Retrieve userprofiles for a user by username
router.get('/user/:username', async (req, res) => {
    try {
        const userprofiles = await UserProfile.find({ "username": req.params.username });
        res.json(userprofiles);
    } catch (error) {
        res.status(400).json({ error: 'Error:' + error.message });
    }
});

// GET: Retrieve userprofiles by id
router.get('/:id', async (req, res) => {
    try {
        const userprofiles = await UserProfile.findById(req.params.id);
        if (!userprofiles) {
            res.status(404).json({ error: 'User Profile not found.' });
            return;
        }
        res.json(userprofiles);
    } catch (error) {
        res.status(400).json({ error: 'Error:' + error.message });
    }
});

// POST: Add a new userprofile
router.post('/add', async (req, res) => {
    try {
        const { username, height, weight, dateMeasured } = req.body;
        const newUserProfile = new UserProfile({
            username, height, weight,
            dateMeasured: Date.parse(dateMeasured)
        });

        await newUserProfile.save();
        res.json({ message: 'Userprofile created!' });
    } catch (error) {
        res.status(400).json({ error: 'Error:' + error.message });
    }
});

// DELETE: Delete a userprofile
router.delete('/:id', async (req, res) => {
    try {
        const deletedUserProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!deletedUserProfile) {
            res.status(404).json({ error: 'User profile not found' });
            return;
        }
        res.json({ message: 'User Profile deleted.' });
    } catch (error) {
        res.status(400).json({ error: 'Error:' + error.message });
    }
});

// PUT: Update a userprofile by id
router.put('/update/:id', async (req, res) => {
    try {
        const { username, height, weight, dateMeasured } = req.body;


        if (!username || !height || !weight || !dateMeasured) {
            res.status(400).json({ error: 'All fields are required for an update.' });
            return;
        }
        const userprofile = await UserProfile.findById(req.params.id);
        if (!userprofile) {
            res.status(404).json({ error: 'User Profile not found.' });
            return;
        }

        userprofile.username = username;
        userprofile.height = height;
        userprofile.weight = weight;
        userprofile.dateMeasured = Date.parse(dateMeasured);

        await userprofile.save()
        res.json({ message: 'User profile updated', userprofile });
    } catch (error) {
        res.status(400).json({ error: 'Error:' + error.message });
    }
});

module.exports = router;