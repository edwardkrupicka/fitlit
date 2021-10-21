class Sleep {
  constructor(sleepData) {
    this.allSleepData = sleepData;
  }

  getAverageHoursSlept(userId) {
    const usersSleep = this.allSleepData.filter(user => {
      return user.userID === userId;
    });
    const averageHoursSlept = usersSleep.reduce((avgHours, user) => {
      return avgHours += user.hoursSlept;
    }, 0) / usersSleep.length;
    return parseFloat(averageHoursSlept.toFixed(1));
  }

  getAverageSleepQuality(userId) {
    const usersSleepQuality = this.allSleepData.filter(user => {
      return user.userID === userId;
    });
    const avgUserSleepQuality = usersSleepQuality.reduce((avgSleep, user) => {
      return avgSleep += user.sleepQuality;
    }, 0) / usersSleepQuality.length;
    return parseFloat(avgUserSleepQuality.toFixed(1));
  }

  getDailyHoursSlept(userId, date) {
    const hoursSlept = this.allSleepData.filter(user => {
      return user.userID === userId;
    }).find(user => {
      return user.date === date;
    }).hoursSlept;
    return hoursSlept;
  }

  getDailySleepQuality(userId, date) {
    const sleepQuality = this.allSleepData.filter(user => {
      return user.userID === userId;
    }).find(user => {
      return user.date === date;
    }).sleepQuality;
    return sleepQuality;
  }

  calculateWeek(userId, date) {
    const hoursSleptInAWeek = this.allSleepData.filter((user) => {
      return user.userID === userId;
    })
    const dateIndex = hoursSleptInAWeek.map((user) => {
      return user.date
    }).indexOf(date);
    return hoursSleptInAWeek.slice(dateIndex - 6, dateIndex + 1);
  }

  calculateHoursSleptWeek(userId, date) {
    return this.calculateWeek(userId, date).map(e => {
      return {
        hours: e.hoursSlept,
        date: e.date
      };
    })
  }

  calculateSleepQualityWeek(userId, date) {
    return this.calculateWeek(userId, date).map(e => {
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
