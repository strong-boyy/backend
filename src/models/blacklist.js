"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlackList extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
    }
  }
  BlackList.init(
    {
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BlackList",
      tableName: "BlackList",
      freezeTableName: true,
    }
  );
  return BlackList;
};
