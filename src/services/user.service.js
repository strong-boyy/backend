const { Users } = require("../models/index");

class UserService {
  async create(userData) {
    return await Users.create(userData);
  }

  async findOne(query) {
    return await Users.findOne({ where: query });
  }

  async update(userData, query) {
    try {
      await Users.update(userData, {
        where: query,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = UserService;
