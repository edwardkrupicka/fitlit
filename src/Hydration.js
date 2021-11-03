import UserStats from './UserStats';

class Hydration extends UserStats {
  constructor(id, hydrationData) {
    super(id, hydrationData)
    this.hydrationData = this.filteredData; 
  }
  
  findAverageHydration() {
    const totalOunces = this.hydrationData.reduce((acc, hydration) => {
      return acc += hydration.numOunces;
    }, 0);
    return totalOunces / this.hydrationData.length;  
  }

  findDailyHydration(date) {
    return this.hydrationData.find(data => data.date === date).numOunces;
  }

  findWeeklyHydration(startDate) {
    const dates = this.hydrationData.map(data => data.date);
    const startIndex = dates.indexOf(startDate);
    const weeklyHydration = this.hydrationData.slice(startIndex - 6, startIndex + 1);
    return weeklyHydration;
  }
}


export default Hydration;