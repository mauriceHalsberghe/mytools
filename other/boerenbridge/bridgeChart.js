const linesAmount = JSON.parse(localStorage.getItem("players")) || [];
let playersScore = JSON.parse(localStorage.getItem("score"));
const currentRound = parseInt(localStorage.getItem("currentRound")) || 1;

const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];

const barColors = ["red", "green","dodgerblue","yellow","lime","deeppink","darkcyan","orange"];

if (scoreHistory.length > 1) {
  createDatasets(scoreHistory)
}

function createDatasets(scores) {
  const loop = scores.length / linesAmount.length;
  let datasets = [];
  
  for (let i = 0; i < linesAmount.length; i++) {
    str = ''
    let set = []
    for (let j = 0; j < loop; j++) {
      set.push(scores[i + (j*3)])
    }
    
    datasets.push({
        data: set,
        borderColor: barColors[i],
        fill: false,
    })
  }

  const xValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ];

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: datasets
    },
    options: {
      legend: { display: false },
    },
  });
}