const sendErrorResponse = require("../helpers/error-response");
const TasksService = require("../services/task.service");

exports.create = async (req, res, next) => {
  try {
    const tasksService = new TasksService();
    const task = await tasksService.create(req.body);
    return res.send({
      message: "Create task successful",
      data: { task: task },
    });
  } catch (error) {
    console.log(error);
    return next(
      sendErrorResponse(res, 500, { message: "Error during create a new task" })
    );
  }
};

exports.findAll = async (req, res, next) => {
  let tasks = [];
  try {
    const { limit, offset } = req.query;
    const tasksService = new TasksService();
    if (limit && offset) {
      tasks = await tasksService.find(
        {},
        false,
        parseInt(offset),
        parseInt(limit)
      );
    } else {
      tasks = await tasksService.find();
    }

    return res.send({
      message: "Get all task successful",
      data: { tasks: tasks },
    });
  } catch (error) {
    console.log(error);
    return next(
      sendErrorResponse(res, 500, { message: "Error during get all task" })
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const tasksService = new TasksService();
    const task = await tasksService.findById(taskId);
    return res.send({
      message: "Create task successful",
      data: { task: task },
    });
  } catch (error) {
    console.log(error);
    return next(
      sendErrorResponse(res, 500, { message: "Error during create a new task" })
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const tasksService = new TasksService();
    const taskUpdated = await tasksService.update(req.body, { id: taskId });
    if (!taskUpdated) {
      return next(
        sendErrorResponse(res, 400, {
          message: "Error during update task",
        })
      );
    }
    return res.send({
      message: "Update task successful",
    });
  } catch (error) {
    console.log(error);
    return next(
      sendErrorResponse(res, 500, { message: "Error during create a new task" })
    );
  }
};
