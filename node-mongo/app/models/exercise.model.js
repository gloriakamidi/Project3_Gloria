const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  day: String,
  text: String,
  note: String,
  done: String
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
