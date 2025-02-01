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
    development: {
      username: process.env.DB_USER || "root", 
      password: process.env.DB_PASSWORD || "", 
      database: process.env.DB_NAME || "strong-boyy", 
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "mysql", 
    },
    test: {
      username: process.env.DB_USER || "root", 
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "strong-boyy",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "mysql",
    },
    production: {
      username: process.env.DB_USER || "root", 
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "strong-boyy",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "mysql",
    },
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  cloud:{
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  }
};

module.exports = config;
