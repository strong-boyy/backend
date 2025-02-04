'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tasks, {
        foreignKey: "taskId", // Liên kết với bảng Tasks
        targetKey: "id",
      });
      this.belongsTo(models.Users, {
        foreignKey: "assigned_to", // Liên kết với bảng Users (assigned_to)
        targetKey: "id",
      });
      this.belongsTo(models.Users, {
        foreignKey: "assigned_by", // Liên kết với bảng Users (assigned_by)
        targetKey: "id",
      });
    }
  }
  TaskAssignment.init({
    taskId: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    assigned_by: DataTypes.INTEGER,
    assigned_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TaskAssignment',
  });
  return TaskAssignment;
};