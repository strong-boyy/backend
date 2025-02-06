const { Users } = require("../models/index");

class UserService {
  async create(userData) {
    return await Users.create(userData);
  }

  async findOne(query) {
    return await Users.findOne({ where: query, raw: true });
  }

  async findById(id) {
    return await Users.findByPk(id, { raw: true });
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
