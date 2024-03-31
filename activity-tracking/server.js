const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json');
const promClient = require('prom-client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5300;
const baseUri = process.env.MONGO_URI || config.mongoUri;
const database = process.env.MONGO_DB || config.mongoDb;
const mongoUri = `${baseUri}/${database}?authsource=admin`;


// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

// Event listener for MongoDB connection errors
connection.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

// Create a registry to register the metrics
const register = new promClient.Registry();

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Add a route for metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    // Retrieve metrics from registry
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

// Routes
const exercisesRouter = require('./routes/exercises');
app.use('/exercises', exercisesRouter);

const weeklyTargetsRouter = require('./routes/weeklytargets');
app.use('/targets', weeklyTargetsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = { app, server };  