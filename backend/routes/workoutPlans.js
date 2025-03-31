const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  exercises: [{ name: String, sets: Number, reps: Number, weight: Number }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);