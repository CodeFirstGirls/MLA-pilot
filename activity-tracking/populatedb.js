#! /usr/bin/env node

// source : https://raw.githubusercontent.com/mdn/express-locallibrary-tutorial/main/populatedb.js
console.log(
    'This script populates some test exercises and targets to the database. e.g.: node populatedb'
);

const Exercise = require('./models/exercise.model')
const WeeklyTarget = require('./models/weeklytarget.model')
const UserProfile = require('./models/userprofile.model');
const moment = require('moment')

const config = require('./config.json');
require('dotenv').config();

const baseUri = process.env.MONGO_URI || config.mongoUri;
const database = process.env.MONGO_DB || config.mongoDb;
const mongoDB = `${baseUri}/${database}?authsource=admin`;

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));


async function main() {
    await mongoose.connect(mongoDB)

    await createExercises();
    await createWeeklyTargets();
    await createUserProfiles();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}


async function createExercises() {
    // add exercises instances for a user
}

async function createWeeklyTargets() {
    await Promise.all([
        weeklyTargetInstanceCreate('user1', 10, 10, 10, 10, 10, moment().startOf('week').toDate()),
        weeklyTargetInstanceCreate('user1', 100, 0, 0, 0, 0, moment().subtract(1, 'weeks').startOf('week').toDate()),
        weeklyTargetInstanceCreate('user1', 0, 0, 0, 50, 45, moment().subtract(2, 'weeks').startOf('week').toDate()),
        weeklyTargetInstanceCreate('user1', 20, 30, 45, 0, 0, moment().subtract(3, 'weeks').startOf('week').toDate()),
        weeklyTargetInstanceCreate('testuser', 0, 10, 10, 10, 100, moment().startOf('week').toDate()),
        weeklyTargetInstanceCreate('testuser', 10, 0, 30, 30, 0, moment().subtract(1, 'weeks').startOf('week').toDate()),
        weeklyTargetInstanceCreate('testuser', 100, 0, 0, 0, 45, moment().subtract(2, 'weeks').startOf('week').toDate()),
        weeklyTargetInstanceCreate('testuser', 35, 0, 45, 60, 0, moment().subtract(3, 'weeks').startOf('week').toDate()),
    ])
}

async function weeklyTargetInstanceCreate(username, runningTarget, cyclingTarget, swimmingTarget, gymTarget, otherTarget, weekStartDate) {

    const new_targets = new WeeklyTarget({
        username: username,
        runningTarget: runningTarget,
        cyclingTarget: cyclingTarget,
        swimmingTarget: swimmingTarget,
        gymTarget: gymTarget,
        otherTarget: otherTarget,
        weekStartDate: weekStartDate,
    })
    await new_targets.save();
    console.log(`Added new targets for ${username} for week ${weekStartDate}`);
}

async function createUserProfiles() {
    var today = new Date();
    var todayMinusTwelveWeeks = new Date();
    todayMinusTwelveWeeks.setDate(todayMinusTwelveWeeks.getDate() - 84);

    await Promise.all([
        userProfileInstanceCreate('user1', 160, 60, today),
        userProfileInstanceCreate('user1', 160, 65, todayMinusTwelveWeeks),
        userProfileInstanceCreate('testuser', 180, 70, today),
        userProfileInstanceCreate('testuser', 180, 75, todayMinusTwelveWeeks),
    ])
}

async function userProfileInstanceCreate(username, height, weight, dateMeasured) {

    const new_user_profiles = new UserProfile({
        username: username,
        height: height,
        weight: weight,
        dateMeasured: dateMeasured,
    })
    await new_user_profiles.save();
    console.log(`Added new profiles for ${username} for date ${dateMeasured}`);
}