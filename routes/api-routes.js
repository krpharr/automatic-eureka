const router = require("express").Router();
const db = require("../models");

// getLastWorkout()
router.get("/api/workouts", (req, res) => {

  db.Workout.findAndModify({
      query: {},
      update: [{ $set: { "totalDuration": { $sum: "$exercises.duration" } } }],
      new: true
    }).then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });

  //   db.Workout.findOne({}, {}, { sort: { 'created_at': -1 } })
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.status(400).json(err);
  //     });

  //   db.Workout.find({})
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.status(400).json(err);
  //     });
});
// addExercise(data)
router.post("/api/workouts/:id", (req, res) => {
  db.Workout.update({
      _id: mongojs.ObjectId(req.params.id)
    }, {
      $push: {
        exercises: req.body
      }
    },
    (error, data) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.json(data);
      }
    }
  );
});
// createWorkout(data = {})
router.post("/api/workouts", (req, res) => {
  let newWorkout = new db.Workout(JSON.parse(req.body));
  newWorkout.save((error, data) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;