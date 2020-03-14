const router = require("express").Router();
const ObjectId = require('mongoose').Types.ObjectId;
const db = require("../models");

// getLastWorkout()
router.get("/api/workouts", (req, res) => {
  db.Workout.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(dbWorkout => {
      let dur = 0;
      let wgt = 0;
      dbWorkout.exercises.forEach(e => {
        if (e.duration) dur += e.duration;
        if (e.weight) wgt += e.weight;
      });
      dbWorkout.totalDuration = dur;
      dbWorkout.totalWeight = wgt;
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
// addExercise(data)
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne({
      _id: ObjectId(req.params.id)
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
  let newWorkout = new db.Workout(req.body);
  db.Workout.create(newWorkout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      dbWorkout.forEach(wo => {
        let dur = 0;
        let wgt = 0;
        wo.exercises.forEach(e => {
          if (e.duration) dur += e.duration;
          if (e.weight) wgt += e.weight;
        });
        wo.totalDuration = dur;
        wo.totalWeight = wgt;
      });
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;