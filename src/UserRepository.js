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
    const totalUsers = this.allUserData.length;
    return Math.round(totalSteps / totalUsers);
  }
}

export default UserRepository;