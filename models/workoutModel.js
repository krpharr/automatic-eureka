const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    required: "Must enter date for exercise."
  },
  exercises: {
    type: Array
  },
  totalDuration: {
    type: Number
  }
});

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