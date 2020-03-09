const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    required: "Must enter date for exercise."
  },
  exercises: {
    type: Array
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;