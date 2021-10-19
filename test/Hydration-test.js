const chai = require("chai");
const expect = chai.expect;

const Hydration = require('../src/Hydration');

describe('Hyrdration', () => {
  let hydration;
  let hydrationData;

  beforeEach(() => {
    hydrationData = [
      {"userID":1, "date":"2019/06/15", "numOunces":37}, 
      {"userID":2, "date":"2019/06/15", "numOunces":75}, 
      {"userID":3, "date":"2019/06/15", "numOunces":47}
    ];

    hyrdration = new Hydration(1, hydrationData);
  });
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });
});