class Sleep {
  constructor(userId, allSleepData) {
    this.id = userId;
    this.allSleepData = allSleepData;
    this.sleepData = allSleepData.filter(data => data.userID === this.id);
  }

  getAverageHoursSlept() {
    const averageHoursSlept = this.sleepData.reduce((avgHours, user) => {
      return avgHours += user.hoursSlept;
    }, 0) / this.sleepData.length;
    return parseFloat(averageHoursSlept.toFixed(1));
  }

  getAverageSleepQuality() {
    const avgUserSleepQuality = this.sleepData.reduce((avgSleep, user) => {
      return avgSleep += user.sleepQuality;
    }, 0) / this.sleepData.length;
    return parseFloat(avgUserSleepQuality.toFixed(1));
  }

  getDailyHoursSlept(date) {
    return this.sleepData.find(user => {
      return user.date === date;
    }).hoursSlept;
  }

  getDailySleepQuality(date) {
    return this.sleepData.find(user => {
      return user.date === date;
    }).sleepQuality;
  }

  calculateWeek(date) {
    const dateIndex = this.sleepData.map((user) => {
      return user.date;
    }).indexOf(date);
    return this.sleepData.slice(dateIndex - 6, dateIndex + 1);
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
