import Chart from 'chart.js/auto';

function makeSingleChart(htmlElement, chartName, xLabels, data) {
var myChart = new Chart(htmlElement, {
    type: 'bar',
    data: {
        labels: xLabels,
        datasets: [{
            label: chartName,
            data,
            backgroundColor: 'rgb(187, 92, 255)',
            borderColor: 'rgb(232, 232, 232)',
            borderWidth: 2
        }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "rgb(232, 232, 232)",
          }
        }
      },
        scales: {
            y: {
              ticks: {
                color: "rgb(232, 232, 232)",
              },
              beginAtZero: true
            },
            x: {
              ticks: {
                color: "rgb(232, 232, 232)",
              }
            }
        }
    }
});
  return myChart;
}

function makeDoubleChart(htmlElement, quantityLabel, qualityLabel, xLabels, quantityData, qualityData) {
var otherChart = new Chart(htmlElement, {
    data: {
        datasets: [{
            type: 'bar',
            label: qualityLabel,
            data: qualityData,
            backgroundColor: 'rgb(255, 87, 27)',
            borderColor: 'rgb(232, 232, 232)',
            borderWidth: 2,
            yAxisID: 'y1'

          }, {
            type: 'bar',
            label: quantityLabel,
            data: quantityData,
            backgroundColor: 'rgb(187, 92, 255)',
            borderColor: 'rgb(232, 232, 232)',
            borderWidth: 2,
            yAxisID: 'y2'
        }],
        labels: xLabels
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "rgb(232, 232, 232)",
          }
        }
      },
        scales: {
            y1: {
              ticks: {
                color: "rgb(255, 129, 83)",
              },
              beginAtZero: true,
              type: 'linear',
              position: 'left',
              title: {text: 'Sleep Quality',
              display: true, color: 'rgb(232, 232, 232)'}
            },
            y2: {
              ticks: {
                color: "rgb(254, 138, 254)",
              },
              beginAtZero: true,
              type: 'linear',
              position: 'right',
              title: {text: 'Hours Slept',
              display: true, color: 'rgb(232, 232, 232)'}
            },
            x: {
              ticks: {
                color: "rgb(232, 232, 232)",
              },
              title: {text: 'Recent Week',
              display: true, color: 'rgb(232, 232, 232)'}
            }
        }
    }
});
  return otherChart;
}

export { makeSingleChart, makeDoubleChart }
