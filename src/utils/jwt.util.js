const jwt = require("jsonwebtoken");
const config = require("../config/index");

function generateAccessToken(dataSign) {
  return jwt.sign(dataSign, config.app.jwt.key, {
    expiresIn: config.app.jwt.accessExpiresIn,
  });
}

function generateRefreshToken(dataSign) {
  return jwt.sign(dataSign, config.app.jwt.key, {
    expiresIn: config.app.jwt.refreshExpiresIn,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, config.app.jwt.key);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
};
