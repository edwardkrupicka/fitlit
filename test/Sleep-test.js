import {expect} from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', function() {
  let sleepData = [
    {
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 10.8,
      "sleepQuality": 4.7
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 4.1,
      "sleepQuality": 3.8
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "hoursSlept": 7.5,
      "sleepQuality": 3.8
    },
    {
      "userID": 3,
      "date": "2019/06/16",
      "hoursSlept": 10.7,
      "sleepQuality": 3.4
    }
  ];
  const sleep = new Sleep(sleepData);

  it('should be a function', function() {
    expect(Sleep).to.be.a('Function');
  });

  it('should be an instance of Sleep', function() {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should store all sleep data', function() {
    expect(sleep.allSleepData).to.deep.equal(sleepData);
  });

  it('should return the average hours slept per day when given a user\'s ID', function() {
    const hoursSlept = sleep.getAverageHoursSlept(2);
    expect(hoursSlept).to.equal(7.25);
  });

  it('should return the average sleep quality per day using a user\'s ID', function() {
    const averageSleepQuality = sleep.getAverageSleepQuality(3);
    expect(averageSleepQuality).to.equal(4.05);
  });

  it('should return how many hours a user slept on a specific day', function() {
    const hoursSleptADay = sleep.getHoursSlept(1, "2019/06/16");
    expect(hoursSleptADay).to.equal(4.1);
  });

  it('should return a user\'s sleep quality on a specific day', function() {
    const sleepQuality = sleep.getSleepQuality(3, "2019/06/15");
    expect(sleepQuality).to.equal(4.7)
  })
});
