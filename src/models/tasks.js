"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Statuses, {
        foreignKey: "statusId",
        targetKey: "id",
        as: "status",
      });
      this.belongsTo(models.Users, {
        foreignKey: "created_by",
        targetKey: "id",
        as: "creator"
      });
    }
  }
  Tasks.init(
    {
      task_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      statusId: DataTypes.INTEGER,
      due_date: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
