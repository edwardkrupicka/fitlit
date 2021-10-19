class Hydration {
  constructor(id, hydrationData) {
    this.id = id;
    this.hydrationData = hydrationData.filter(data => data.userID === this.id);
  }
  findAverageHydration() {
    const numOuncesArray = this.hydrationData.map(data => data.numOunces);
    const totalOunces = numOuncesArray.reduce((acc, ounces) => {
      return acc += ounces;
    }, 0);
    return totalOunces / numOuncesArray.length;  
  }

  findDailyHydration(date) {
    const foundDate = this.hydrationData.filter(data => data.date === date);
    return foundDate[0].numOunces;
  }
};


export default Hydration;