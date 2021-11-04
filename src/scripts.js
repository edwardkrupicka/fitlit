// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import Chart from 'chart.js/auto';
import { getAllData, postData } from './api-calls';
// allPromise.then(data => initializeData(data));
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';

// Global
let userId;
const userGreeting = document.querySelector('#userGreeting');
const userFullName = document.querySelector('#userFullName');
const userEmail = document.querySelector('#userEmail');
const userAddress = document.querySelector('#userAddress');
const userStride = document.querySelector('#userStride');
const userFriends = document.querySelector('#userFriends');
const userStepGoal = document.querySelector('#userStepGoal');
const averageStepGoal = document.querySelector('#averageStepGoal');
const dailyHydration = document.querySelector('#dailyHydration');
const weeklyHydration = document.querySelector('#weeklyHydration');
const lastNightSleep = document.querySelector('#lastNightSleep');
const lastWeekSleep = document.querySelector('#lastWeekSleep');
const averageSleep = document.querySelector('#averageSleep');
const hydrationChart = document.querySelector('#hydrationChart');
const sleepChart = document.querySelector('#sleepChart');
const sleepButton = document.querySelector('#sleepButton');
const sleepQuality = document.querySelector('#sleepQuality');
const sleepQuantity = document.querySelector('#sleepQuantity');
const sleepDate = document.querySelector('#sleepDate');
const sleepResponse = document.querySelector('#sleepResponse');
const sleepForm = document.querySelector('#sleepForm');
const hydrationButton = document.querySelector('#hydrationButton');
const hydrationOunces = document.querySelector('#hydrationOunces');
const hydrationDate = document.querySelector('#hydrationDate');
const hydrationResponse = document.querySelector('#hydrationResponse');
const hydrationForm = document.querySelector('#hydrationForm');

// event listeners
sleepButton.addEventListener('click', checkForSleepInputs);
hydrationButton.addEventListener('click', checkForHydrationInputs);

// functions
function checkForSleepInputs(event) {
  event.preventDefault();
  if (!sleepQuality.value || !sleepQuantity.value || !sleepDate.value) {
    sleepResponse.innerText = `Please fill in the form correctly`;
    sleepResponse.classList.remove('hidden');
    setTimeout(() => {
      hideResponse(sleepResponse, sleepForm);
    }, 1500);
  } else {
    addSleepData();
  }
}


function addSleepData() {
  const sleepQual = parseFloat(sleepQuality.value);
  const sleepQuan = parseFloat(sleepQuantity.value);
  const date = sleepDate.value.split('-').join('/');

  const userInput = { userID: userId, date , hoursSlept: sleepQuan , sleepQuality: sleepQual };

  const postedData = postData('http://localhost:3001/api/v1/sleep', userInput);
  postedData.then((data) => {
    // console.log(data);
    sleepResponse.innerText = 'Your sleep data was successfully uploaded!';
    sleepResponse.classList.remove('hidden');
    sleepForm.classList.add('hidden');
    setTimeout(() => {
      hideResponse(sleepResponse, sleepForm);
    }, 2500);
  });
  // fix indentation
  // console.log(postedData);
}

function checkForHydrationInputs(event) {
  event.preventDefault();
  if (!hydrationOunces.value || !hydrationDate.value) {
    hydrationResponse.innerText = `Please fill in the form correctly`;
    hydrationResponse.classList.remove('hidden');
    setTimeout(() => {
      hideResponse(hydrationResponse, hydrationForm);
    }, 1500);
  } else {
    addHydrationData();
  }
}


function addHydrationData() {
  const numOunces = parseFloat(hydrationOunces.value);
  const date = hydrationDate.value.split('-').join('/');

  const userInput = { userID: userId, date, numOunces };

  const postedData = postData('http://localhost:3001/api/v1/hydration', userInput);
  postedData.then((data) => {
    console.log(data);
    hydrationResponse.innerText = 'Your hydration data was successfully uploaded!';
    hydrationResponse.classList.remove('hidden');
    hydrationForm.classList.add('hidden');
    setTimeout(() => {
      hideResponse(hydrationResponse, hydrationForm);
    }, 2500);
  });
  console.log(postedData);
}

function hideResponse(element, form) {
  element.classList.add('hidden');
  form.classList.remove('hidden');
  form.reset();
}

function initializeData(data) {
  const userRepo = new UserRepository(data[0]);
  const randomUserNum = Math.floor(Math.random() * 50);
  const user = new User(userRepo.getUser(randomUserNum));
  renderUser(user, userRepo);
  const hydration = new Hydration(user.id, data[3]);
  renderHydration(hydration);
  calculateSleep(user, data[1]);
  userId = user.id;
  // console.log('id', userId); // NEED TO REMOVE THIS!!
}

function renderUser(user, userRepo) {
  userGreeting.innerText = user.returnFirstName();
  userFullName.innerText = user.name;
  userEmail.innerText = user.email;
  userAddress.innerText = user.address;
  userStride.innerText = user.strideLength;
  userStepGoal.innerText = user.dailyStepGoal;
  averageStepGoal.innerText = userRepo.averageStepGoal();
  userFriends.innerHTML = addFriends(user, userRepo);
}

function calculateSleep(user, sleepData) {
  const sleepInfo = new Sleep(sleepData);
  const lastNightQuality = sleepInfo.getDailySleepQuality(user.id, getTodaysDate());
  const lastNightDuration = sleepInfo.getDailyHoursSlept(user.id, getTodaysDate());
  const lastWeekQuality = sleepInfo.calculateSleepQualityWeek(user.id, getTodaysDate());
  const lastWeekDuration = sleepInfo.calculateHoursSleptWeek(user.id, getTodaysDate());
  const averageQuality = sleepInfo.getAverageSleepQuality(user.id);
  const averageDuration = sleepInfo.getAverageHoursSlept(user.id);
  renderSleep(lastNightQuality, lastNightDuration, averageQuality, averageDuration);
  renderWeekSleep(lastWeekQuality, lastWeekDuration)
}

function renderSleep(lastNightQuality, lastNightDuration, averageQuality, averageDuration) {
  lastNightSleep.innerText = `${lastNightQuality}/5 quality & ${lastNightDuration} hours`;
  averageSleep.innerText = `${averageQuality}/5 quality & ${averageDuration} hours`;
}

function renderWeekSleep(sleepWeekQuality, sleepWeekDuration) {
  const weekDates = sleepWeekQuality.map(day => day.date);
  const weekQuality = sleepWeekQuality.map(day => day.quality);
  const weekQuantity = sleepWeekDuration.map(day => day.hours);
  makeDoubleChart(sleepChart, 'Daily Hours Slept', 'Daily Sleep Quality out of 5', weekDates, weekQuantity, weekQuality);
}

function getTodaysDate() {
  return new Date().toISOString().slice(0, 10).replaceAll("-", "/").replaceAll("2021", "2019");
}

function addFriends(user, userRepo) {
  let friendsList = user.friends;
  return friendsList.reduce((finalString, friend) => {
    return finalString += `<li class="user-friend">
    <img class="friend-img" src="https://www.abbeysurestart.com/wp-content/uploads/2021/03/blank-profile.png" alt="User Image">
    ${userRepo.getUser(friend).name}: Step Goal ${userRepo.getUser(friend).dailyStepGoal}</li>`
  }, "");
}

function renderHydration(data) {
  const dailyOunces = data.findDailyHydration(getTodaysDate());
  const weeklyOunces = data.findWeeklyHydration(getTodaysDate());
  dailyHydration.innerText = dailyOunces;
  const weekOunces = weeklyOunces.map(day => day.numOunces);
  const weekDates = weeklyOunces.map(day => day.date);
  makeSingleChart(hydrationChart, 'Daily Number of Ounces', weekDates, weekOunces);
}

function makeSingleChart(htmlElement, chartName, xLabels, data) {
var myChart = new Chart(htmlElement, {
    type: 'bar',
    data: {
        labels: xLabels,
        datasets: [{
            label: chartName,
            data: data,
            backgroundColor: 'rgb(187, 92, 255)',
            borderColor: 'rgb(232, 232, 232)',
            borderWidth: 2
        }]
    },
    options: {
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
}
