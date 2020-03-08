const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({


});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;