import UserStats from './UserStats';

class Hydration extends UserStats {
  constructor(id, hydrationData) {
    super(id, hydrationData);
  }
  
  findAverageHydration() {
    return this.getAverage(this.filteredData, "numOunces"); 
  }

  findDailyHydration(date) {
    return this.getDayData(this.filteredData, date).numOunces;
  }

  findWeeklyHydration(startDate) {
    return this.getWeekRange(this.filteredData, startDate);
  }
}

export default Hydration;