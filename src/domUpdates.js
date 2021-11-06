import { makeSingleChart, makeDoubleChart } from './charts.js';
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
  }

}

export default  domUpdates;