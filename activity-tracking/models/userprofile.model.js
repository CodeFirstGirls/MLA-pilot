const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema(
    {
        username: { type: String, required: true },
        age: {
            type: Number,
            min: [12, 'Age must be at least 12 years old, got {VALUE}'],
            max: [150, 'Age must be no more than 150, got {VALUE}']
        },
        height: {
            type: Number,
            min: [100, 'Height must be at least 100cm, got {VALUE}'],
            max: [300, 'Height must be no more than 300cm, got {VALUE}']
        },
        weight: {
            type: Number,
            min: [0, 'Weight should be positive'],
        },
        dateMeasured: { type: Date },
    },
    { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
