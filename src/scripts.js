// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import Chart from 'chart.js/auto';
import { allPromise } from './api-calls';
allPromise.then(data => initializeData(data));
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';

// Global

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

function initializeData(data) {
  const userRepo = new UserRepository(data[0]);
  const randomUserNum = Math.floor(Math.random() * 50);
  const user = new User(userRepo.getUser(randomUserNum));
  renderUser(user, userRepo);
  const hydration = new Hydration(user.id, data[3]);
  renderHydration(hydration);
  calculateSleep(user, data[1]);
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
  console.log(weekDates)
  const weekQuality = sleepWeekQuality.map(day => day.quality);
  console.log(weekQuality)
  const weekQuantity = sleepWeekDuration.map(day => day.hours);
  console.log(weekQuantity)
  makeDoubleChart(sleepChart, 'Daily Hours Slept', 'Daily Sleep Quality', weekDates, weekQuantity, weekQuality);
  // lastWeekSleep.innerHTML = sleepWeekQuality.reduce((allDays, day, index) => {
  //   return allDays += `<li class="sleep-week-item">${day.quality}/5 quality and ${sleepWeekDuration[index].hours} hours on ${day.date}</li>`;
  // }, "");

}

function getTodaysDate() {
  return new Date().toISOString().slice(0, 10).replaceAll("-", "/").replaceAll("2021", "2019");
}

function addFriends(user, userRepo) {
  let friendsList = user.friends;
  return friendsList.reduce((finalString, friend) => {
    return finalString += `<li class="user-friend">
    <img class="friend-img" src="https://www.abbeysurestart.com/wp-content/uploads/2021/03/blank-profile.png">
    ${userRepo.getUser(friend).name}: Step Goal ${userRepo.getUser(friend).dailyStepGoal}</li>`
  }, "");
}

function renderHydration(data) {
  let dailyOunces = data.findDailyHydration(getTodaysDate());
  let weeklyOunces = data.findWeeklyHydration(getTodaysDate());
  // const reducedOunces = weeklyOunces.reduce((finalString, day) => {
  //   return finalString += `<li class="weekly-hydration">
  //   ${day.date}: ${day.numOunces} oz</li>`
  // }, "");
  dailyHydration.innerText = dailyOunces;
  // weeklyHydration.innerHTML = reducedOunces;
  const weekOunces = weeklyOunces.map(day => day.numOunces);
  const weekDates = weeklyOunces.map(day => day.date);
  makeChart(hydrationChart, 'Daily Number of Ounces', weekDates, weekOunces);
}

function makeChart(htmlElement, chartName, xLabels, data) {
var myChart = new Chart(htmlElement, {
    type: 'bar',
    data: {
        labels: xLabels,
        datasets: [{
            label: chartName,
            data: data,
            backgroundColor: '#ced1ed',
            borderColor: '#6875ed',
            borderWidth: 2
        }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "black",
          }
        }
      },
        scales: {
            y: {
              ticks: {
                color: "black",
              },
              beginAtZero: true
            },
            x: {
              ticks: {
                color: "black",
              }
            }
        }
    }
});
}

function makeDoubleChart(htmlElement, quantityLabel, qualityLabel, xLabels, quantityData, qualityData) {
var otherChart = new Chart(htmlElement, {
    // type: 'scatter',
    data: {
        datasets: [{
            type: 'line',
            label: qualityLabel,
            data: qualityData,
            fill: false,
            borderColor: '#6875ed',
          }, {
            type: 'bar',
            label: quantityLabel,
            data: quantityData,
            backgroundColor: '#ced1ed',
            borderColor: '#6875ed',
            borderWidth: 1
        }],
        labels: xLabels
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "black",
          }
        }
      },
        scales: {
            y: {
              ticks: {
                color: "black",
              },
              beginAtZero: true
            },
            x: {
              ticks: {
                color: "black",
              }
            }
        }
    }
});
}
