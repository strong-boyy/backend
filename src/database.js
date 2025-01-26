const { Sequelize, DataTypes } = require("sequelize");
const config = require("./configs/index");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql",
    logging: false, 
  }
);

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
