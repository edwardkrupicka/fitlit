import UserStats from './UserStats';

class Activity extends UserStats {
  constructor(id, activityData, userData) {
    super(id, activityData);
    this.userData = userData.find(user => user.id === this.id);
    this.allUserData = userData;
  }

  getActiveDateRange(start, end) {
    return this.filteredData.filter(activity => {
      const activityDate = Date.parse(activity.date);
      return (activityDate >= start && activityDate <= end)
    });
  }

  getMiles(date) {
    const currentDay = this.getDayData(this.filteredData, date);
    const userStride = this.userData.strideLength;
    return Math.round(currentDay.numSteps * userStride / 5280 * 100) / 100;
  }
  
  getDayActiveMins(date) {
    return this.getDayData(this.filteredData, date).minutesActive;
  }

  getWeekAverageMins(date) {
    const activeDays = this.getWeekRange(this.filteredData, date);
    return Math.round(this.getAverage(activeDays, "minutesActive"));
  }

  checkSteps(date) {
    return this.getDayData(this.filteredData, date).numSteps >= this.userData.dailyStepGoal;
  }

  findWinStepDays() {
    return this.filteredData.filter(day => this.checkSteps(day.date))
    .map(day => day.date);
  }

  findBestSteps() {
    return this.filteredData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs;
  }

  getAverageActivityByDate(date, type) {
    const currentDay = this.getAllDayData(this.allDataset, date);
    return Math.round(this.getAverage(currentDay, type))
  }

  getStairs(date) {
    return this.getDayData(this.filteredData, date).flightsOfStairs;
  }
}
  export default Activity;