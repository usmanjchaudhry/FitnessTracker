const mongoose = require("mongoose");

const { Schema } = mongoose;

const schemaOptions = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      exerciseType: String,
      name: String,
      weight: Number,
      sets: Number,
      reps: Number,
      duration: Number,
    },
  ],
}, schemaOptions);

WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (let i=0; i<this.exercises.length; i++) {
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
});

WorkoutSchema.virtual("dayOfWeek").get(function () {
  const dayNames = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const dayOfWeek = this.day.getDay();
  return dayNames[dayOfWeek];
});

WorkoutSchema.virtual("totalWeight").get(function () {
  let totalWeight = 0;
  for (let i=0; i<this.exercises.length; i++) {
    if (typeof this.exercises[i].weight === "number") {
      totalWeight += (this.exercises[i].weight * this.exercises[i].reps * this.exercises[i].sets);
    }
  }
  return totalWeight;
 
})

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;