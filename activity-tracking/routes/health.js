const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET: Health
router.get('/', async (req, res) => {
    const health = {
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(health);
    } catch (error) {
        health.message = error;
        res.status(503).send();
    }
  });
  
// GET: Readiness
router.get('/ready', async (req, res) => {
    const health = {
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    };

    const dependencies = [];

    // Get connection status of mongoose
    dependencies.push({
        name: 'Mongoose',
        status: mongoose.STATES[mongoose.connection.readyState],
        connString: mongoose.connection.connString, 
    });
    const readiness = { ...health, dependencies };

    // See: https://mongoosejs.com/docs/api/connection.html#Connection.prototype.readyState
    if (mongoose.connection.readyState !== mongoose.STATES['connected']) {
        // If mongoose dependency does not work, return 424 (Dependency Failed) response code
        readiness.status = 'FAIL';
        res.status(424).send(readiness);
    }

    try {
        res.send(readiness);
    } catch (error) {
        readiness.message = error;
        res.status(503).send();
    }
});
  
module.exports = router;