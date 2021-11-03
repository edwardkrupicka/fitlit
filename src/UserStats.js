class UserStats {
  constructor(id, dataset) {
    this.id = id;
    this.filteredData = dataset.filter(data => data.userID === this.id);
    this.allDataset = dataset;
  }

  getAverage(data, property) {
    return data.reduce((total, element) => {
      return total += element[property];
    }, 0) / this.filteredData.length;
  }
}

export default UserStats;