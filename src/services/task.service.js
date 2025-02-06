const { Tasks, Statuses, Users } = require("../models/index");

class TasksService {
  getFindOptions(query = {}, page = null, pageSize = null) {
    const options = {
      where: query,
      raw: true,
      attributes: { exclude: ["statusId", "created_by"] },
      include: [
        {
          model: Statuses,
          as: "status",
          attributes: ["id", "status_name"],
        },
        {
          model: Users,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    };
    // Pagination
    if (page !== null && pageSize !== null) {
      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;
    }
    return options;
  }

  async create(taskData) {
    return await Tasks.create(taskData);
  }

  async find(query = {}, findOne = false, page = null, pageSize = null) {
    const options = this.getFindOptions(query, page, pageSize);

    return findOne
      ? await Tasks.findOne(options)
      : await Tasks.findAll(options);
  }

  async findById(taskId) {
    return await Tasks.findByPk(taskId, this.getFindOptions());
  }

  async update(taskData, query) {
    try {
      await Tasks.update(taskData, { where: query });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = TasksService;
