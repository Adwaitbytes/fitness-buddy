const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
  exercises: [{ name: String, sets: Number, reps: Number, weight: Number }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);