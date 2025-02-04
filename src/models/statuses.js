"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tasks, {
        foreignKey: "statusId",
        sourceKey: "id",
        as: "tasks",
      });
    }
  }
  Statuses.init(
    {
      status_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Statuses",
    }
  );
  return Statuses;
};
