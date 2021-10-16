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

  it.skip('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of User', function() {
    let userA = new User(user1);
    expect(userA).to.be.an.instanceof(User);
    let userB = new User(user4);
    expect(userB).to.be.an.instanceof(User);
  });

  it.skip('should store the user\'s id', function() {
    let userA = new User(user1);
    expect(userA.id).to.equal(1);
    let userB = new User(user3);
    expect(userB.id).to.equal(3);
  });

  it.skip('should store the user\'s name', function() {
    let userA = new User(user4);
    expect(userA.name).to.equal("Mae Connelly");
    let userB = new User(user5);
    expect(userB.name).to.equal("Erick Schaden");
  });

  it.skip('should store the user\'s address', function() {
    let userA = new User(user2);
    expect(userA.address).to.equal("30086 Kathryn Port, Ciceroland NE 07273");
    let userB = new User(user3);
    expect(userB.address).to.equal("85823 Bosco Fork, East Oscarstad MI 85126-5660");
  });

  it.skip('should store the user\'s email', function() {
    let userA = new User(user2);
    expect(userA.email).to.equal("Dimitri.Bechtelar11@gmail.com");
    let userB = new User(user4);
    expect(userB.email).to.equal("Marcos_Pollich@hotmail.com");
  });

  it.skip('should store the user\'s stride length', function() {
    let userA = new User(user1);
    expect(userA.strideLength).to.equal(4.3);
    let userB = new User(user5);
    expect(userB.strideLength).to.equal(3.1);
  });

  it.skip('should store the user\'s daily step goal', function() {
    let userA = new User(user2);
    expect(userA.dailyStepGoal).to.equal(5000);
    let userB = new User(user5);
    expect(userB.dailyStepGoal).to.equal(8000);
  });

  it.skip('should store the user\'s friends', function() {
    let userA = new User(user1);
    expect(userA.friends).to.deep.equal([2, 3, 4, 5]);
    let userB = new User(user3);
    expect(userB.friends).to.deep.equal([2, 4, 5]);
  });

});
