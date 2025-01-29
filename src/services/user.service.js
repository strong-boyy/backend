const { User } = require("../models/index");

class UserService {
  async create(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async findOne(query) {
    const user = await User.findOne({ where: query });
    return user;
  }

  async update(userData, query) {
    await User.update(userData, {
      where: query,
    });
  }
}

module.exports = UserService;
