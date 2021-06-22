class User {
  async getUserInfo(token) {
    return {
      id: token.split('_')[1]
    }
  }
}


module.exports = new User();