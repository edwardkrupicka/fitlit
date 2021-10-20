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
    return averageHoursSlept;
  }

  getAverageSleepQuality(userId) {
    const usersSleepQuality = this.allSleepData.filter(user => {
      return user.userID === userId;
    });
    const avgUserSleepQuality = usersSleepQuality.reduce((avgSleep, user) => {
      return avgSleep += user.sleepQuality;
    }, 0) / usersSleepQuality.length;
    return avgUserSleepQuality;
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

  calculateHoursSleptAWeek(userId, date) {
    const hoursSleptInAWeek = this.allSleepData.filter((user) => {
      return user.userID === userId;
    })
    const dateIndex = hoursSleptInAWeek.map((user) => {
      return user.date
    }).indexOf(date);
    return hoursSleptInAWeek.slice(dateIndex, dateIndex + 7);
  }
}

export default Sleep;
