class Sleep {
  constructor(sleepData) {
    this.allSleepData = sleepData;
  }

  getAverageHoursSlept(userId) {
    const userSleep = this.allSleepData.filter(user => {
      return user.userID === userId;
    });
    const averageHoursSlept = userSleep.reduce((avgHours, user) => {
      return avgHours += user.hoursSlept;
    }, 0) / userSleep.length;
    return averageHoursSlept;
  }

  getAverageSleepQuality(userId) {
    const userSleepQuality = this.allSleepData.filter(user => {
      return user.userID === userId;
    });
    const avgUserSleepQuality = userSleepQuality.reduce((avgSleep, user) => {
      return avgSleep += user.sleepQuality;
    }, 0) / userSleepQuality.length;
    return avgUserSleepQuality;
  }
}

export default Sleep;
