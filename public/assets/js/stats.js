// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}

function populateChart(data) {
  let days = dates(data);
  let durations = totalDuration(data);
  let pounds = calculateTotalWeight(data);
  let exerciseDurations = exDurations(data);
  let exerciseWeights = exWeights(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: days,
      datasets: [{
        label: "Workout Duration In Minutes",
        backgroundColor: "red",
        borderColor: "red",
        data: durations,
        fill: false
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: days,
      datasets: [{
        label: "Pounds",
        data: pounds,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [{
        label: "Excercises Performed",
        backgroundColor: colors,
        data: exerciseDurations
      }]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [{
        label: "Excercises Performed",
        backgroundColor: colors,
        data: exerciseWeights
      }]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

function dates(data) {
  let days = [];

  data.forEach(workout => {
    days.push(moment(workout.day).format("dddd MMM DD"));
  });

  return days;
}

function totalDuration(data) {
  let durations = [];

  data.forEach(workout => {
    durations.push(workout.totalDuration);
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    total.push(workout.totalWeight);
  });

  return total;
}

function exDurations(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(e => {
      durations.push(e.duration);
    });

  });

  return durations;
}

function exWeights(data) {
  let weight = [];

  data.forEach(workout => {
    workout.exercises.forEach(e => {
      weight.push(e.weight);
    });

  });

  return weight;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}