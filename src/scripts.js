// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

// import fetchUserData from './api-calls';
// fetchUserData.then(data => renderUser(data));
import { gotUserData, gotSleepData, gotActivityData, gotHydrationData } from './api-calls';
gotUserData.then(data => renderUser(data));

import UserRepository from './UserRepository';
import User from './User';

// Global

const userGreeting = document.querySelector('#userGreeting');
const userFullName = document.querySelector('#userFullName');
const userEmail = document.querySelector('#userEmail');
const userAddress = document.querySelector('#userAddress');
const userStride = document.querySelector('#userStride');
const userFriends = document.querySelector('#userFriends');
const userStepGoal = document.querySelector('#userStepGoal');
const averageStepGoal = document.querySelector('#averageStepGoal');

function renderUser(userData) {
  const userRepo = new UserRepository(userData);
  const randomUserNum = Math.floor(Math.random() * 50);
  const user = new User(userRepo.getUser(randomUserNum));
  userGreeting.innerText = user.returnFirstName();
  userFullName.innerText = user.name;
  userEmail.innerText = user.email;
  userAddress.innerText = user.address;
  userStride.innerText = user.strideLength;
  userStepGoal.innerText = user.dailyStepGoal;
  averageStepGoal.innerText = userRepo.averageStepGoal();
  userFriends.innerHTML = addFriends(user, userRepo);
};

function addFriends(user, userRepo) {
  let friendsList = user.friends;
  return friendsList.reduce((finalString, friend) => {
    return finalString += `<li class="user-friend">
    <img class="friend-img" src="https://cataas.com/cat">
    ${userRepo.getUser(friend).name}: Step Goal ${userRepo.getUser(friend).dailyStepGoal}</li>`
  }, "");
};
