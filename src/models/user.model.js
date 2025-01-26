const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
