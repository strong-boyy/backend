const yup = require("yup");

class TasksSchema {
  static get createTaskSchema() {
    return yup.object().shape({
      task_name: yup
        .string()
        .min(3, "Task name must be at least 3 characters long")
        .max(255, "Task name must not exceed 255 characters")
        .required("Task name is required"),

      description: yup
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .nullable(),

      statusId: yup
        .number()
        .integer("Status must be an integer")
        .positive("Status must be a positive number")
        .default(1),

      due_date: yup
        .date()
        .min(new Date(), "Due date must be in the future")
        .nullable(),

      created_by: yup
        .number()
        .integer("Created by must be an integer")
        .positive("Created by must be a positive number")
        .required("Created by is required"),
    });
  }
}

module.exports = TasksSchema;
