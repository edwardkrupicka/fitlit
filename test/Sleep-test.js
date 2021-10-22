import {expect} from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', () => {
  let sleepData = [
    {"userID": 1, "date": "2019/06/15", "hoursSlept": 6.1, "sleepQuality": 2.2},
    {"userID": 2, "date": "2019/06/15", "hoursSlept": 7, "sleepQuality": 4.7},
    {"userID": 3, "date": "2019/06/15", "hoursSlept": 10.8, "sleepQuality": 4.7},
    {"userID": 1, "date": "2019/06/16", "hoursSlept": 4.1, "sleepQuality": 3.8},
    {"userID": 2, "date": "2019/06/16", "hoursSlept": 7.5, "sleepQuality": 3.8},
    {"userID": 3, "date": "2019/06/16", "hoursSlept": 10.7, "sleepQuality": 3.4},
    {"userID": 3, "date": "2019/06/17", "hoursSlept": 5.3, "sleepQuality": 4.9},
    {"userID": 3, "date": "2019/06/18", "hoursSlept": 9.8, "sleepQuality": 2.6},
    {"userID": 3, "date": "2019/06/19", "hoursSlept": 7.2, "sleepQuality": 3.4},
    {"userID": 3, "date": "2019/06/20", "hoursSlept": 9.4, "sleepQuality": 1.2},
    {"userID": 3, "date": "2019/06/21", "hoursSlept": 8.9, "sleepQuality": 3.7},
    {"userID": 3, "date": "2019/06/22", "hoursSlept": 9.8, "sleepQuality": 2.1},
    {"userID": 3, "date": "2019/06/23", "hoursSlept": 4.7, "sleepQuality": 3.9}
  ];
  const sleep = new Sleep(sleepData);

  it('should be a function', () => {
    expect(Sleep).to.be.a('Function');
  });

  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should store all sleep data', () => {
    expect(sleep.allSleepData).to.deep.equal(sleepData);
  });

  it('should return the average hours slept per day when given a user\'s ID', () => {
    const hoursSlept = sleep.getAverageHoursSlept(2);
    expect(hoursSlept).to.equal(7.3);
  });

  it('should return the average sleep quality per day using a user\'s ID', () => {
    const averageSleepQuality = sleep.getAverageSleepQuality(1);
    expect(averageSleepQuality).to.equal(3);
  });

  it('should return how many hours a user slept on a specific day', () => {
    const hoursSleptADay = sleep.getDailyHoursSlept(1, "2019/06/16");
    expect(hoursSleptADay).to.equal(4.1);
  });

  it('should return a user\'s sleep quality on a specific day', () => {
    const sleepQuality = sleep.getDailySleepQuality(3, "2019/06/15");
    expect(sleepQuality).to.equal(4.7)
  });

  it('should calculate the hours slept each day over the course of a week', () => {
    const hoursSleptAWeek = sleep.calculateHoursSleptWeek(3, "2019/06/23");
    expect(hoursSleptAWeek).to.eql([
      {"date": "2019/06/17", "hours": 5.3 },
      {"date": "2019/06/18", "hours": 9.8},
      {"date": "2019/06/19", "hours": 7.2},
      {"date": "2019/06/20", "hours": 9.4},
      {"date": "2019/06/21", "hours": 8.9},
      {"date": "2019/06/22", "hours": 9.8},
      {"date": "2019/06/23", "hours": 4.7}]);
  });

  it('should calculate the sleep quality each day over the course of a week', () => {
    const sleepQualityAWeek = sleep.calculateSleepQualityWeek(3, "2019/06/23");
    expect(sleepQualityAWeek).to.eql([
      {"date": "2019/06/17", "quality": 4.9},
      {"date": "2019/06/18", "quality": 2.6},
      {"date": "2019/06/19", "quality": 3.4},
      {"date": "2019/06/20", "quality": 1.2},
      {"date": "2019/06/21", "quality": 3.7},
      {"date": "2019/06/22", "quality": 2.1},
      {"date": "2019/06/23", "quality": 3.9}]);
  });

  it('should return the average sleep quality for all users', () => {
    const avgUsersSleepQuality = sleep.getUsersAvgSleepQuality();
    expect(avgUsersSleepQuality).to.equal(3.4);
  });
});
