// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User'

// Global
const userRepo = new UserRepository(userData);
const user = new User(userRepo.getUser(17));

const userGreeting = document.querySelector('#userGreeting');
const userFullName = document.querySelector('#userFullName');
const userEmail = document.querySelector('#userEmail');
const userAddress = document.querySelector('#userAddress');
const userStride = document.querySelector('#userStride');
const userFriends = document.querySelector('#userFriends');
const userStepGoal = document.querySelector('#userStepGoal');
const averageStepGoal = document.querySelector('#averageStepGoal');

userGreeting.innerText = `Greetings ${user.returnFirstName()}`;
userFullName.innerText = user.name;
userEmail.innerText = user.email;
userAddress.innerText = user.address;
userStride.innerText = user.strideLength;
userStepGoal.innerText = user.dailyStepGoal;
averageStepGoal.innerText = userRepo.averageStepGoal();
// userFriends.innerHTML = addFriends();
userFriends.innerText = addFriends();

function addFriends() {
  let friendsList = user.friends;
  friendsList = friendsList.map(friend => {
    // return `<li>${userRepo.getUser(friend).name}</li>`;
    return userRepo.getUser(friend).name;
  }).join(', ');
  // console.log(friendsList);
  // const friendsNames = friendsList.join(', ');
  return friendsList;
}
