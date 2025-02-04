"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Otp, { foreignKey: "userId" });
      this.hasMany(models.Tasks, { foreignKey: "created_by", as: "createdTasks" });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      googleId: DataTypes.STRING,
      isActived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM('Admin', 'Manager', 'Developer', 'QA', 'Support'),
        defaultValue: 'Developer'
      }
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
