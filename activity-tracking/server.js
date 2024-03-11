const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5300;
const uri = process.env.MONGODB_URI;
const mongoUri = config.mongoUri;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(mongoUri, { useNewUrlParser: true, dbName: "activitydb" })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

// Event listener for MongoDB connection errors
connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Routes
const exercisesRouter = require("./routes/exercises");
app.use("/exercises", exercisesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
