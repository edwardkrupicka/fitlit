import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Hyrdration', () => {
  let hydration;
  let hydration2;
  let hydration3;
  let hydrationData;

  beforeEach(() => {
    hydrationData = [
      {"userID":1, "date":"2019/06/15", "numOunces":37}, 
      {"userID":1,"date":"2019/06/16","numOunces":69}, 
      {"userID":2, "date":"2019/06/15", "numOunces":75}, 
      {"userID":2, "date":"2019/06/16", "numOunces":100},
      {"userID":3, "date":"2019/06/15", "numOunces":10},
      {"userID":3, "date":"2019/06/16", "numOunces":20}, 
      {"userID":3, "date":"2019/06/17", "numOunces":56}, 
      {"userID":3, "date":"2019/06/18", "numOunces":12}, 
      {"userID":3, "date":"2019/06/19", "numOunces":75}, 
      {"userID":3, "date":"2019/06/20", "numOunces":13}, 
      {"userID":3, "date":"2019/06/21", "numOunces":36}, 
      {"userID":3, "date":"2019/06/22", "numOunces":13}, 
      {"userID":3, "date":"2019/06/23", "numOunces":72}, 
    ];

    hydration = new Hydration(1, hydrationData);
    hydration2 = new Hydration(2, hydrationData);
    hydration3 = new Hydration(3, hydrationData);
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should take user id as an argument', () => {
    expect(hydration.id).to.equal(1);
    expect(hydration2.id).to.equal(2);
  });

  it('should store hydration data', () => {
    expect(hydration.hydrationData).to.deep.equal(hydrationData.filter(data => data.userID === 1));
    expect(hydration2.hydrationData).to.deep.equal(hydrationData.filter(data => data.userID === 2));
  });

  it('should be able to return average fluid ounces consumed per day for all time', () => {
    expect(hydration.findAverageHydration()).to.equal(53);
    expect(hydration2.findAverageHydration()).to.equal(87.5);
  });

  it('should be able to return how many fluid ounces the user consumed for a specific day', () => {
    expect(hydration.findDailyHydration('2019/06/15')).to.equal(37);
    expect(hydration2.findDailyHydration('2019/06/15')).to.equal(75);
  });

  it('should be able to return how many fluid ounces of water consumed each day over the course of 7 days', () => {
    expect(hydration3.findWeeklyHydration('2019/06/16')).to.deep.equal(
      [
      {"userID":3, "date":"2019/06/16", "numOunces":20}, 
      {"userID":3, "date":"2019/06/17", "numOunces":56}, 
      {"userID":3, "date":"2019/06/18", "numOunces":12}, 
      {"userID":3, "date":"2019/06/19", "numOunces":75}, 
      {"userID":3, "date":"2019/06/20", "numOunces":13}, 
      {"userID":3, "date":"2019/06/21", "numOunces":36}, 
      {"userID":3, "date":"2019/06/22", "numOunces":13}
    ]
    );
  });
});