import { expect } from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';
import UserRepository from '../src/UserRepository';
import { userData, activityData } from '../test/Activity-test-data';

describe("Activity", () => {
  let activity1, activity2, activity3, user1, user2, user3, userRepo;
  beforeEach(() => {
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    user3 = new User(userData[2]);
    userRepo = new UserRepository(userData)
    activity1 = new Activity(1, activityData, userData);
    activity2 = new Activity(2, activityData, userData);
    activity3 = new Activity(3, activityData, userData);
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(activity1).to.be.an.instanceOf(Activity);
  });

  it('should take a user id as an argument', () => {
    expect(activity1.id).to.equal(1);
    expect(activity2.id).to.equal(2);
  });

  it('should store activity data', () => {
    expect(activity1.activityData).to.deep.equal(activityData.filter(data => data.userID === 1));
    expect(activity3.activityData).to.deep.equal(activityData.filter(data => data.userID === 3));
  });

  it('should return total miles walked for a given day', () => {
    expect(activity3.getMiles('2019/06/18')).to.equal(1.72);
  });
  
  it('should return the number of active minutes for a day', () => {
    expect(activity3.getDayActiveMins('2019/06/21')).to.equal(256);
  });

  it('should return average mins per week per day', () => {
    expect(activity3.getWeekAverageMins("2019/06/15")).to.equal(140);
  });

  it('should check if they reached their step goal', () => {
    expect(activity2.checkSteps("2019/06/15")).to.equal(false);
    expect(activity3.checkSteps("2019/06/21")).to.equal(true);
  });

  it('should find all the days they exceeded their step goal', () => {
    expect(activity3.findWinStepDays()).to.deep.equal(["2019/06/20", "2019/06/21"]);
  });

  it('should find their all-time stair climbing record', () => {
    expect(activity3.findBestSteps()).to.deep.equal(13);
  });

  it('should find the average steps, stairs and active minutes for a date range', () => {
    expect(activity3.getAverageActivityByDate("2019/06/15", "numSteps")).to.equal(2145);
    expect(activity3.getAverageActivityByDate("2019/06/15", "minutesActive")).to.equal(62);
    expect(activity3.getAverageActivityByDate("2019/06/15", "flightsOfStairs")).to.equal(2);
  })
})