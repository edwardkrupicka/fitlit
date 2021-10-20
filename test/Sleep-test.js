import {expect} from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', function() {
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
    const averageSleepQuality = sleep.getAverageSleepQuality(1);
    expect(averageSleepQuality).to.equal(3);
  });

  it('should return how many hours a user slept on a specific day', function() {
    const hoursSleptADay = sleep.getDailyHoursSlept(1, "2019/06/16");
    expect(hoursSleptADay).to.equal(4.1);
  });

  it('should return a user\'s sleep quality on a specific day', function() {
    const sleepQuality = sleep.getDailySleepQuality(3, "2019/06/15");
    expect(sleepQuality).to.equal(4.7)
  });

  it('should calculate the hours slept each day over the course of a week', function() {
    const hoursSleptAWeek = sleep.calculateHoursSleptAWeek(3, "2019/06/16");
    expect(hoursSleptAWeek).to.eql([
      {userID: 3, date: '2019/06/16', hoursSlept: 10.7, sleepQuality: 3.4},
      { userID: 3, date: '2019/06/17', hoursSlept: 5.3, sleepQuality: 4.9 },
      { userID: 3, date: '2019/06/18', hoursSlept: 9.8, sleepQuality: 2.6 },
      { userID: 3, date: '2019/06/19', hoursSlept: 7.2, sleepQuality: 3.4 },
      { userID: 3, date: '2019/06/20', hoursSlept: 9.4, sleepQuality: 1.2 },
      { userID: 3, date: '2019/06/21', hoursSlept: 8.9, sleepQuality: 3.7 },
      { userID: 3, date: '2019/06/22', hoursSlept: 9.8, sleepQuality: 2.1 }
    ]);
  })
});
