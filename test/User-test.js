const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User.js');

describe('User', function() {

  // variable declarations for those used in beforeEach()
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let users;

  beforeEach(function() {
    user1 = {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [2, 3, 4, 5]
    };
    user2 = {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [1, 4]
    };
    user3 = {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [2, 4, 5]
    };
    user4 = {
      "id": 4,
      "name": "Mae Connelly",
      "address": "28926 Schinner Islands, Turnermouth NE 23720-3230",
      "email": "Marcos_Pollich@hotmail.com",
      "strideLength": 3.1,
      "dailyStepGoal": 4000,
      "friends": [1, 3]
    };
    user5 = {
      "id": 5,
      "name": "Erick Schaden",
      "address": "514 Mayert Walk, Jordaneside SC 55023-6523",
      "email": "Vanessa_Gerhold@gmail.com",
      "strideLength": 3.1,
      "dailyStepGoal": 8000,
      "friends": [1, 2, 3, 4]
    };
    users = [user1, user2, user3, user4, user5];
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    let userA = new User(user1);
    expect(userA).to.be.an.instanceof(User);
    let userB = new User(user4);
    expect(userB).to.be.an.instanceof(User);
  });

});
