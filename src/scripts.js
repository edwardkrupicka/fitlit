// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import { getAllData, postData } from './api-calls';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
import { makeSingleChart, makeDoubleChart } from './charts.js';

// Global
let userId;
let sleepDataChart;
let hydrationDataChart;
let activityDataChart;

// let currentChart;
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
window.addEventListener('load', displayData);
sleepButton.addEventListener('click', checkForSleepInputs);
hydrationButton.addEventListener('click', checkForHydrationInputs);

// functions
function displayData() {
  const randomUserNum = Math.floor(Math.random() * 50);
  getAllData().then(data => {
    initializeData(data, randomUserNum);
  });
}

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
    console.log(data);
    sleepResponse.innerText = 'Your sleep data was successfully uploaded!';
    sleepResponse.classList.remove('hidden');
    sleepForm.classList.add('hidden');
    setTimeout(() => {
      hideResponse(sleepResponse, sleepForm);
    }, 2500);
  });

  getAllData().then(data => {
    const sleep = new Sleep(userId, data[1]);
    sleepDataChart.destroy();
    calculateSleep(sleep);
  });
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

  getAllData().then(data => {
    const hydration = new Hydration(userId, data[3]);
    hydrationDataChart.destroy();
    renderHydration(hydration);
  });
}

function hideResponse(element, form) {
  element.classList.add('hidden');
  form.classList.remove('hidden');
  form.reset();
}

function initializeData(data, idNumber) {
  const userRepo = new UserRepository(data[0]);
  const user = new User(userRepo.getUser(idNumber));
  renderUser(user, userRepo);
  const hydration = new Hydration(user.id, data[3]);
  renderHydration(hydration);
  const sleep = new Sleep(user.id, data[1]);
  calculateSleep(sleep);
  userId = user.id;
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

function calculateSleep(data) {
  const lastNightQuality = data.getDailySleepQuality(getTodaysDate());
  const lastNightDuration = data.getDailyHoursSlept(getTodaysDate());
  let lastWeekQuality = data.calculateSleepQualityWeek(getTodaysDate());
  const lastWeekDuration = data.calculateHoursSleptWeek(getTodaysDate());
  const averageQuality = data.getAverageSleepQuality();
  const averageDuration = data.getAverageHoursSlept();
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
  sleepDataChart = makeDoubleChart(sleepChart, 'Daily Hours Slept', 'Daily Sleep Quality out of 5', weekDates, weekQuantity, weekQuality);
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
  hydrationDataChart = makeSingleChart(hydrationChart, 'Daily Number of Ounces', weekDates, weekOunces);
}
