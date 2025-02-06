const { BlackList } = require("../models/index");

class BlackListService {
  async create(blackListData) {
    return await BlackList.create(blackListData);
  }

  async findOne(query) {
    return await BlackList.findOne({ where: query, raw: true });
  }
}

module.exports = BlackListService;
