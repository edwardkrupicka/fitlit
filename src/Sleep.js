import UserStats from './UserStats';

class Sleep extends UserStats {
  constructor(id, dataset) {
    super(id, dataset);
    this.allSleepData = this.allDataset;
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

  calculateWeek(date) {
    const dateIndex = this.filteredData.map((user) => {
      return user.date;
    }).indexOf(date);
    return this.filteredData.slice(dateIndex - 6, dateIndex + 1);
  }

  calculateHoursSleptWeek(date) {
    return this.calculateWeek(date).map(e => {
      return {
        hours: e.hoursSlept,
        date: e.date
      };
    })
  }

  calculateSleepQualityWeek(date) {
    return this.calculateWeek(date).map(e => {
      return {
        quality: e.sleepQuality,
        date: e.date
      };
    })
  }

  getUsersAvgSleepQuality() {
    const avgSleepQuality = ((this.allSleepData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0) / this.allSleepData.length).toFixed(1));
    return parseFloat(avgSleepQuality);
  }
}

export default Sleep;
