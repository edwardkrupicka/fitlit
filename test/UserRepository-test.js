import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  const userData = [
    {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        2
      ]
    },
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        1,
        3
      ]
    },
    {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        1
      ]
    }
  ];
  const userRepo = new UserRepository(userData);

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should store all user data', () => {
    expect(userRepo.allUserData).to.equal(userData);
  });

  it('should return a user data when given an id', () => {
    const selectedUser = userRepo.getUser(2);
    expect(selectedUser).to.eql(userData[1]);
  });

  it('should be able to return average steps of all users', () => {
    const averageGoal = userRepo.averageStepGoal();
    expect(averageGoal).to.equal(6667);
  });
});