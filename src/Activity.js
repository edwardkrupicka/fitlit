class Activity {
  constructor(id, activityData, userData) {
    this.id = id;
    this.allActivityData = activityData;
    this.activityData = activityData.filter(data => data.userID === this.id);
    this.userData = userData.find(user => user.id === this.id);
  }

  getActiveDay(date) {
    return this.activityData.find(activity => activity.date === date);
  }

  getActiveDateRange(start, end) {
    return this.activityData.filter(activity => {
      const activityDate = Date.parse(activity.date);
      if (activityDate >= start && activityDate <= end) {
        return true;
      } else {
        return false;
      }
    });
  }

  getMiles(date) {
    const currentDay = this.activityData.find(day => day.date === date);
    const userStride = this.userData.strideLength;
    return Math.round(currentDay.numSteps * userStride / 5280 * 100) / 100;
  }
  
  getDayActiveMins(date) {
    return this.getActiveDay(date).minutesActive;
  }

  getWeekAverageMins(date) {
    const startDate = Date.parse(date);
    const endDate = startDate + (86400000 * 6);
    const activeDays = this.getActiveDateRange(startDate, endDate);
    const totalMins = activeDays.map(activity => activity.minutesActive)
    .reduce((total, activity) => {
      return total += activity;
    }, 0)
    return Math.round(totalMins / activeDays.length);
  }

  checkSteps(date) {
    return this.getActiveDay(date).numSteps >= this.userData.dailyStepGoal;
  }

  findWinStepDays() {
    return this.activityData.filter(day => {
      if (this.checkSteps(day.date)) {
        return true;
      } else {
        return false;
      }
    }).map(day => day.date);
  }

  findBestSteps() {
    return this.activityData.reduce((best, activity) => {
      if (activity.flightsOfStairs > best) {
        best = activity.flightsOfStairs;
      }
      return best;
    }, this.activityData[0].flightsOfStairs)
  }

  getAverageActivityByDate(date, type) {
    const currentDay = this.allActivityData.filter(activity => activity.date === date);
    const sum = currentDay.reduce((total, activity) => {
      return activity[type] += total;
    }, 0);
    return Math.round(sum / currentDay.length);
  }

}
  export default Activity;