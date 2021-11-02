class Activity {
  constructor(id, activityData, userData) {
    this.id = id;
    this.activityData = activityData.filter(data => data.userID === this.id);
    this.userData = userData.find(user => user.id === this.id);
  }

  getMiles(date) {
    const currentDay = this.activityData.find(day => day.date === date);
    const userStride = this.userData.strideLength;
    return Math.round(currentDay.numSteps * userStride / 5280 * 100) / 100;
  }
  
  getDayActiveMins(date) {
    return this.activityData.find(activity => activity.date === date).minutesActive;
  }
  
  getWeekAverageMins(date) {
    const startDate = Date.parse(date);
    const endDate = startDate + (86400000 * 7);
    const activeDays = this.activityData.filter(activity => {
      const activityDate = Date.parse(activity.date);
      if (activityDate >= startDate && activityDate < endDate) {
        return true;
      } else {
        return false;
      }
    });
    const totalMins = activeDays.map(activity => activity.minutesActive)
    .reduce((total, activity) => {
      return total += activity;
    }, 0)
    return Math.round(totalMins / activeDays.length);
  }
}
  export default Activity;