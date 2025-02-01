const cloudinary = require("cloudinary").v2;
const config = require("../config/index");

cloudinary.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.key,
  api_secret: config.cloud.secret,
});

module.exports = cloudinary;
