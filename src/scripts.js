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
import Activity from './Activity';
import domUpdates from './domUpdates'

// Global
let userId;
let sleepDataChart;
let hydrationDataChart;
let activityDataChart;

const weeklyHydration = document.querySelector('#weeklyHydration');
const lastWeekSleep = document.querySelector('#lastWeekSleep');
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
const swivelButton = document.querySelectorAll('.swivel-button');

// event listeners
window.addEventListener('load', displayData);
sleepButton.addEventListener('click', checkForSleepInputs);
hydrationButton.addEventListener('click', checkForHydrationInputs);
swivelButton.forEach(button => button.addEventListener('click', domUpdates.toggleSwivel));

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
      domUpdates.hideResponse(sleepResponse, sleepForm);
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
      domUpdates.hideResponse(sleepResponse, sleepForm);
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
      domUpdates.hideResponse(hydrationResponse, hydrationForm);
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
      domUpdates.hideResponse(hydrationResponse, hydrationForm);
    }, 2500);
  });

  getAllData().then(data => {
    const hydration = new Hydration(userId, data[3]);
    hydrationDataChart.destroy();
    // assigning the value of hydration chart a 
    // second time to be able to input data more than once
    hydrationDataChart = domUpdates.renderHydration(hydration);
  });
}

function initializeData(data, idNumber) {
  const userRepo = new UserRepository(data[0]);
  const user = new User(userRepo.getUser(idNumber));
  domUpdates.renderUser(user, userRepo);
  const hydration = new Hydration(user.id, data[3]);
  hydrationDataChart = domUpdates.renderHydration(hydration);
  const sleep = new Sleep(user.id, data[1]);
  calculateSleep(sleep);
  userId = user.id;
  const activity = new Activity(user.id, data[2], data[0]);
  renderActivity(activity);
}

function calculateSleep(data) {
  const lastNightQuality = data.getDailySleepQuality(getTodaysDate());
  const lastNightDuration = data.getDailyHoursSlept(getTodaysDate());
  let lastWeekQuality = data.calculateSleepQualityWeek(getTodaysDate());
  const lastWeekDuration = data.calculateHoursSleptWeek(getTodaysDate());
  const averageQuality = data.getAverageSleepQuality();
  const averageDuration = data.getAverageHoursSlept();
  domUpdates.renderSleep(lastNightQuality, lastNightDuration, averageQuality, averageDuration);
  sleepDataChart = domUpdates.renderWeekSleep(lastWeekQuality, lastWeekDuration)
}
function getTodaysDate() {
  return new Date().toISOString().slice(0, 10).replaceAll("-", "/").replaceAll("2021", "2019");
}

export default getTodaysDate;
