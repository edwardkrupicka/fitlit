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

  findWeeklyHydration(startDate) {
    const dates = this.hydrationData.map(data => data.date);
    const startIndex = dates.indexOf(startDate);
    const weeklyHydration = this.hydrationData.slice(startIndex - 6, startIndex + 1);
    return weeklyHydration;
  }
};


export default Hydration;