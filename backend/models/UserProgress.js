const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  currentStep: {
    type: Number,
    default: 0
  },
  completedSteps: {
    type: [Number],
    default: []
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProgress', UserProgressSchema);
