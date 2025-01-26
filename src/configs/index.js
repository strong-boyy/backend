require("dotenv").config();

const config = {
  app: {
    port: process.env.APP_PORT,
    jwt: {
      key: process.env.JWT_KEY || "strong-boyy",
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRESIN || "1h",
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRESIN || "7d",
    },
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "strong-boyy",
  },
};

module.exports = config;
