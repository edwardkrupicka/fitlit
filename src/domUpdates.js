import { makeSingleChart, makeDoubleChart } from './charts.js';
import getTodaysDate from './scripts.js';
// ~~~~~used to render user and user data~~~~~
const userGreeting = document.querySelector('#userGreeting');
const userFullName = document.querySelector('#userFullName');
const userEmail = document.querySelector('#userEmail');
const userAddress = document.querySelector('#userAddress');
const userStride = document.querySelector('#userStride');
const userFriends = document.querySelector('#userFriends');
const userStepGoal = document.querySelector('#userStepGoal');
const averageStepGoal = document.querySelector('#averageStepGoal');
// ~~~~~~render Sleep Method~~~~~~~~
const lastNightSleep = document.querySelector('#lastNightSleep');
const averageSleep = document.querySelector('#averageSleep');
// ~~~~~charts~~~~~~~~~~
const sleepChart = document.querySelector('#sleepChart');
const hydrationChart = document.querySelector('#hydrationChart');
// ~~~~~~~used to render hydration~~~~~~~~
const dailyHydration = document.querySelector('#dailyHydration');
// ~~~~~~~~swivel buttons~~~~~~~~~~~
const stepCardInner = document.querySelector('#stepCardInner');
const sleepCardInner = document.querySelector('#sleepCardInner');
const hydrationCardInner = document.querySelector('#hydrationCardInner');
// ~~~~~~~~render Activity~~~~~~~~~~~
const latestSteps = document.querySelector("#latestSteps");
const todayActiveMinutes = document.querySelector("#todayActiveMinutes");
const distanceWalked = document.querySelector("#distanceWalked");
const flightsClimbed = document.querySelector("#flightsClimbed");
const allLatestSteps = document.querySelector("#allLatestSteps");
const allActiveMinutes = document.querySelector("#allActiveMinutes");
const activityChart = document.querySelector("#activityChart");
const minutesActivityChart = document.querySelector("#minutesActivityChart");
// const swivelButton = document.querySelectorAll('.swivel-button');

let domUpdates = {
  hideResponse(element, form) {
    element.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
  },

  renderUser(user, userRepo) {
    userGreeting.innerText = user.returnFirstName();
    userFullName.innerText = user.name;
    userEmail.innerText = user.email;
    userAddress.innerText = user.address;
    userStride.innerText = user.strideLength;
    userStepGoal.innerText = user.dailyStepGoal;
    averageStepGoal.innerText = userRepo.averageStepGoal();
    userFriends.innerHTML = this.addFriends(user, userRepo);
  },

  addFriends(user, userRepo) {
    let friendsList = user.friends;
    return friendsList.reduce((finalString, friend) => {
      return finalString += `<li class="user-friend">
      <img class="friend-img" src="https://www.abbeysurestart.com/wp-content/uploads/2021/03/blank-profile.png" alt="User Image">
      ${userRepo.getUser(friend).name}: Step Goal ${userRepo.getUser(friend).dailyStepGoal}</li>`
    }, "");
  },

  renderSleep(lastNightQuality, lastNightDuration, averageQuality, averageDuration) {
    lastNightSleep.innerText = `${lastNightQuality}/5 quality & ${lastNightDuration} hours`;
    averageSleep.innerText = `${averageQuality}/5 quality & ${averageDuration} hours`;
  },

  renderWeekSleep(sleepWeekQuality, sleepWeekDuration) {
    const weekDates = sleepWeekQuality.map(day => day.date);
    const weekQuality = sleepWeekQuality.map(day => day.quality);
    const weekQuantity = sleepWeekDuration.map(day => day.hours);
    return makeDoubleChart(sleepChart, 'Daily Hours Slept', 'Daily Sleep Quality out of 5', weekDates, weekQuantity, weekQuality);
  },

  renderHydration(data) {
    const dailyOunces = data.findDailyHydration(getTodaysDate());
    const weeklyOunces = data.findWeeklyHydration(getTodaysDate());
    dailyHydration.innerText = dailyOunces;
    const weekOunces = weeklyOunces.map(day => day.numOunces);
    const weekDates = weeklyOunces.map(day => day.date);
    return makeSingleChart(hydrationChart, 'Daily Number of Ounces', weekDates, weekOunces);
  },

  toggleSwivel(event) {
    if (event.target.classList.contains('sleep-button')) {
      sleepCardInner.classList.toggle('swivel');
    } else if (event.target.classList.contains('hydration-button')) {
      hydrationCardInner.classList.toggle('swivel');
    } else if (event.target.classList.contains('step-button')) {
      stepCardInner.classList.toggle('swivel');
    }
  },

  function renderActivity(activity) {
    let today = getTodaysDate();
    console.log(activity.filteredData)
    latestSteps.innerText = activity.checkSteps(today);
    todayActiveMinutes.innerText = activity.getDayActiveMins(today) + " minutes";
    distanceWalked.innerText = activity.getMiles(today) + " miles";
    flightsClimbed.innerText = activity.getStairs(today)
    allLatestSteps.innerText = activity.checkSteps(today);
    allActiveMinutes.innerText = activity.getAverageActivityByDate(today, "minutesActive") + " minutes";
    allFlightsClimbed.innerText = (activity.getAverageActivityByDate(today, "flightsOfStairs"));
    console.log(activity.getWeekRange(activity.filteredData, today));
    const weekData = activity.getWeekRange(activity.filteredData, today);
    const weekStairs = weekData.map(day => day.flightsOfStairs);
    const weekActiveMinutes = weekData.map(day => day.minutesActive);
    const weekDates = weekData.map(day => day.date);
    // const weekSteps = weekData.map(day => day.flightsOfStairs);
    console.log(weekStairs);
    stepActivityDataChart = makeSingleChart(activityChart, 'Stairs Climbed', weekDates, weekStairs);
    console.log(weekActiveMinutes)
    minutesActivityDataChart = makeSingleChart(minutesActivityChart, 'Minutes Active', weekDates, weekActiveMinutes);
  }
}

export default  domUpdates;