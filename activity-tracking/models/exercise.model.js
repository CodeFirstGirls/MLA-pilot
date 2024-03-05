const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    exerciseType: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Gym', 'Other']
    },
    description: { type: String, required: false },
    duration: { 
        type: Number, 
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Duration should be an integer.'
        },
        min: [1, 'Duration should be positive.']
    },
    distance: { 
      type: Number, 
      required: true,
      validate: {
          validator: function(value) {
              return !isNaN(value);
          },
          message: 'Distance should be a number.'
        },
      min: [0, 'Distance should be positive or zero.']
    },
    levelOfEffort: { type: Number, required: true},
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
