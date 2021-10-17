import { expect } from 'chai';
import User from '../src/User';

describe('User', function() {

  // variable declarations for those used in beforeEach()
  let user1;
  let user2;
  let userA;
  let userB;

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
    userA = new User(user1);
    userB = new User(user2);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(userA).to.be.an.instanceof(User);
    expect(userB).to.be.an.instanceof(User);
  });

  it('should store the user\'s id', function() {
    expect(userA.id).to.equal(1);
    expect(userB.id).to.equal(2);
  });

  it('should store the user\'s name', function() {
    expect(userA.name).to.equal("Luisa Hane");
    expect(userB.name).to.equal("Jarvis Considine");
  });

  it('should store the user\'s address', function() {
    expect(userA.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
    expect(userB.address).to.equal("30086 Kathryn Port, Ciceroland NE 07273");
  });

  it('should store the user\'s email', function() {
    expect(userA.email).to.equal("Diana.Hayes1@hotmail.com");
    expect(userB.email).to.equal("Dimitri.Bechtelar11@gmail.com");
  });

  it('should store the user\'s stride length', function() {
    expect(userA.strideLength).to.equal(4.3);
    expect(userB.strideLength).to.equal(4.5);
  });

  it('should store the user\'s daily step goal', function() {
    expect(userA.dailyStepGoal).to.equal(10000);
    expect(userB.dailyStepGoal).to.equal(5000);
  });

  it('should store the user\'s friends', function() {
    expect(userA.friends).to.deep.equal([2, 3, 4, 5]);
    expect(userB.friends).to.deep.equal([1, 4]);
  });

  it('should be able to return the user\'s first name', function() {
    let resultA = userA.returnFirstName();
    expect(resultA).to.equal("Luisa");
    let resultB = userB.returnFirstName();
    expect(resultB).to.equal("Jarvis");
  });

});
