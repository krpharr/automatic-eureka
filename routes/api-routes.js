const router = require("express").Router();
const mongojs = require("mongojs");
const db = require("../models");

// getLastWorkout()
router.get("/api/workouts", (req, res) => {
  db.Workout.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(dbWorkout => {
      let dur = 0;
      dbWorkout.exercises.forEach(e => {
        if (e.duration) dur += e.duration;
      });
      dbWorkout.totalDuration = dur;
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
// addExercise(data)
router.put("/api/workouts/:id", (req, res) => {
  // db.Workout.find({_id: mongojs.ObjectId(req.params.id)})
  //   let wd = req.body;
  console.log("req.body", req.body);
  db.Workout.updateOne({
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
  console.log(req.body);
  console.log(typeof req.body);
  let newWorkout = new db.Workout(req.body);
  //   newWorkout.setDate();
  console.log(newWorkout);
  db.Workout.create(newWorkout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  //   newWorkout.save((error, data) => {
  //     if (error) {
  //       res.status(400).json(error);
  //     } else {
  //       res.json(data);
  //     }
  //   });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      // let dur = 0;
      // dbWorkout.exercises.forEach(e => {
      //   if (e.duration) dur += e.duration;
      // });
      // dbWorkout.totalDuration = dur;
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;