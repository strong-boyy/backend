const { Sequelize } = require("sequelize");
const config = require("../config/index");
const sequelize = new Sequelize(config.db.development);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the Database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
