const router = require("express").Router();
const db = require("../models");

// getLastWorkout()
router.get("/api/workouts", (req, res) => {
  db.Workout.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(dbWorkout => {
      console.log(dbWorkout);
      let dur = 0;
      dbWorkout.exercises.forEach(e => {
        console.log(e.duration);
        if (e.duration) dur += e.duration;
      });
      console.log(dur);
      dbWorkout.totalDuration = dur;
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
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