const moment = require('moment')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const weeklyTargetSchema = new Schema(
    {
        username: { type: String, required: true },
        runningTarget: { type: Number, default: 0 },
        cyclingTarget: { type: Number, default: 0 },
        swimmingTarget: { type: Number, default: 0 },
        gymTarget: { type: Number, default: 0 },
        walkingTarget: { type: Number, default: 0 },
        otherTarget: { type: Number, default: 0 },
        weekStartDate: {
            type: Date,
            required: true,
            default: () => moment().startOf('week').toDate()
        },
    },
    { timestamps: true }
);

weeklyTargetSchema.index(
    { username: 1, weekStartDate: 1 },
    { unique: true }
);

const WeeklyTarget = mongoose.model('WeeklyTarget', weeklyTargetSchema);

module.exports = WeeklyTarget;
