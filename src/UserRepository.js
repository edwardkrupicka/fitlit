class UserRepository {
  constructor(data) {
    this.allUserData = data
  }

  getUser(findId) {
    return this.allUserData.find(user => user.id === findId);
  }

  averageStepGoal() {
    const totalSteps = this.allUserData.reduce((total, user) => {
      return total += user.dailyStepGoal;
    }, 0);
    return Math.round(totalSteps / this.allUserData.length);
  }
}

export default UserRepository;