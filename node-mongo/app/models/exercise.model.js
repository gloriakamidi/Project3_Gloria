const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exercisename: String,
  minutes: Number,
  priority: String
  
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
