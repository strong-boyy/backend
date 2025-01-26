const User = require("../models/user.model");

class UserService {
  async create(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async findOne(query) {
    const user = await User.findOne({ where: query });
    return user;
  }
  
}

module.exports = UserService;
