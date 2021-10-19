class Hydration {
  constructor(id, hydrationData) {
    this.id = id;
    this.hydrationData = hydrationData.filter(data => data.userID === this.id);
  }
  findAverageNumOunces() {
    const numOuncesArray = this.hydrationData.map(data => data.numOunces);
    const totalOunces = numOuncesArray.reduce((acc, ounces) => {
      return acc += ounces;
    }, 0);
    console.log(totalOunces / numOuncesArray.length);
    return totalOunces / numOuncesArray.length;
    
  }
};


export default Hydration;