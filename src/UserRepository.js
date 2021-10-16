class UserRepository {
  constructor(data) {
    this.allUserData = data
  }

  getUser(findId) {
    return this.allUserData.find(user => user.id === findId);
  }

  averageStepGoal() {
    let totalSteps = this.allUserData.reduce((total, user) => {
      return total += user.dailyStepGoal;
    }, 0);
    let totalUsers = this.allUserData.length;
    return Math.round(totalSteps / totalUsers);
  }
}

export default UserRepository;