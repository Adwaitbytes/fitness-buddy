const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoals: [{ type: String, enum: ['lose weight', 'build muscle', 'improve endurance'] }],
  age: Number,
  gender: String,
  weight: Number,
  height: Number,
  badges: [{ type: String }],
});

module.exports = mongoose.model('User', UserSchema);