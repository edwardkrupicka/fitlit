import { expect } from 'chai';
import Activity from '../src/Activity';
import { activityData } from '../test/Activity-test-data';

describe("Activity", () => {
  let activity1;
  let activity2;
  let activity3;

  beforeEach(() => {
    activity1 = new Activity(1, activityData);
    activity2 = new Activity(2, activityData);
    activity3 = new Activity(3, activityData);
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
    expect(activity3.hydrationData).to.deep.equal(hydrationData.filter(data => data.userID === 3));
  });
})