const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: {
    type: Array
  },
  totalDuration: {
    type: Number
  },
  totalWeight: {
    type: Number
  }
});

WorkoutSchema.methods.setDate = function() {
  this.day = new Date().setDate(new Date.now());
  return this.day;
};

WorkoutSchema.methods.setTotalDuration = function() {
  let dur = 0;
  this.exercises.forEach(e => {
    console.log(e.duration);
    if (e.duration) {
      dur += e.duration;
    }
  });
  this.totalDuration = dur;

  return this.totalDuration;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;