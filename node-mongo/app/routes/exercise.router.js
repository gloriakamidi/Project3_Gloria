module.exports = function(app) {

    var exercises = require('../controllers/exercise.controller.js');

    app.post('/api/exercise', exercises.createExercise);
    app.get('/api/exercise/:id', exercises.getExercise);
    app.get('/api/exercises', exercises.exercises);
    app.put('/api/exercise', exercises.updateExercise);
    app.delete('/api/exercise/:id', exercises.deleteExercise)
}