const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

exports.createExercise = (req, res) => {
    const exercise = new Exercise({
      exercisename: req.body.exercisename,
      minutes: req.body.minutes,
      priority: req.body.priority,
    });

    //Save a new Exercise in MongoDB

    exercise.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

exports.getExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .select("-__v")
    .then(exercise => {
      res.status(200).json(exercise);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Exercise not found with id" + req.params.id,
          error: err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Exercise with id" + req.params.id,
        error: err,
      });
    });
};

exports.exercises = (req, res) => {
  Exercise.find()
    .select("-__v")
    .then((exerciseInfos) => {
      res.status(200).json(exerciseInfos);
    })
    .catch(error => {
      //log on console
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error,
      });
    });
};

exports.deleteExercise = (req, res) => {
  Exercise.findByIdAndRemove(req.params.id)
    .select("-__v-_id")
    .then(exercise => {
      if (!exercise) {
        res.status(404).json({
          message: "No exercise found with id = " + req.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error -> Can't delete exercise with id = " + req.params.id,
        error: err.message,
      });
    });
};

exports.updateExercise = (req, res) => {
  //Find exercise and update it
  Exercise.findByIdAndUpdate(
    req.body._id,
    {
      exercisename: req.body.exercisename,
      minutes: req.body.minutes,
      priority: req.body.priority,
    },
    { new: false }
  ).select('-__v')
  .then(exercise => {
      if(!exercise) {
        return res.status(404).send({
          message:
            "Error -> Can't update an exercise with id = " + req.params.id,
          error: "Not Found!",
        });
      }
      res.status(200).json(exercise);
    }).catch(err => {
      return res.status(500).send({
        message: "Error -> Can't update an exercise with id = " + req.params.id,
        error: err.message,
      });
    });
};
