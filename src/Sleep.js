import UserStats from './UserStats';

class Sleep extends UserStats {
  constructor(id, dataset) {
    super(id, dataset);
  }

  getAverageHoursSlept() {
    const averageHoursSlept = this.getAverage(this.filteredData, "hoursSlept");
    return parseFloat(averageHoursSlept.toFixed(1));
  }

  getAverageSleepQuality() {  
    const avgUserSleepQuality = this.getAverage(this.filteredData, "sleepQuality");
    return parseFloat(avgUserSleepQuality.toFixed(1));
  }

  getDailyHoursSlept(date) {
    return this.filteredData.find(user => user.date === date).hoursSlept;
  }

  getDailySleepQuality(date) {
    return this.filteredData.find(user => user.date === date).sleepQuality;
  }

  calculateHoursSleptWeek(date) {
    return this.getWeekRange(this.filteredData, date).map(e => {
      return {
        hours: e.hoursSlept,
        date: e.date
      };
    })
  }

  calculateSleepQualityWeek(date) {
    return this.getWeekRange(this.filteredData, date).map(e => {
      return {
        quality: e.sleepQuality,
        date: e.date
      };
    })
  }

  getUsersAvgSleepQuality() {
    const avgSleepQuality = this.getAverage(this.allDataset, "sleepQuality").toFixed(1);
    return parseFloat(avgSleepQuality);
  }
}

export default Sleep;
