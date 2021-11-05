class UserStats {
  constructor(id, dataset) {
    this.id = id;
    this.filteredData = dataset.filter(data => data.userID === this.id);
    this.allDataset = dataset;
  }

  getAverage(data, property) {
    return data.reduce((total, element) => {
      return total += element[property];
    }, 0) / data.length;
  }

  getDayData(data, date) {
    return data.find(element => element.date === date);
  }

  getAllDayData(data, date) {
    return data.filter(element => element.date === date);
  }

  getWeekRange(data, end) {
    const endDate = Date.parse(end);
    const startDate = endDate - (86400000 * 6);
    return data.filter(element => {
      const elementDate = Date.parse(element.date);
      return (elementDate >= startDate && elementDate <= endDate);
    });
  }
}

export default UserStats;