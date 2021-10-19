import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Hyrdration', () => {
  let hydration;
  let hydration2;
  let hydrationData;

  beforeEach(() => {
    hydrationData = [
      {"userID":1, "date":"2019/06/15", "numOunces":37}, 
      {"userID":2, "date":"2019/06/15", "numOunces":75}, 
      {"userID":3, "date":"2019/06/15", "numOunces":47}, 
      {"userID":1,"date":"2019/06/16","numOunces":69}, 
      {"userID":2, "date":"2019/06/15", "numOunces":100},
    ];

    hydration = new Hydration(1, hydrationData);
    hydration2 = new Hydration(2, hydrationData)
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
    console.log(hydration);
  });

  it('should take user id as an argument', () => {
    expect(hydration.id).to.equal(1);
  });

  it('should store hydration data', () => {
    expect(hydration.hydrationData).to.deep.equal(hydrationData.filter(data => data.userID === 1));
    console.log(hydrationData.filter(data => data.userID === 1));
  });

  it('should be able to return average fluid ounces consumed per day for all time', () => {
    expect(hydration.findAverageNumOunces()).to.equal(53);
    expect(hydration2.findAverageNumOunces()).to.equal(87.5);
  })
});