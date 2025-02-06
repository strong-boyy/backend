const jwtService = require("../utils/jwt.util");
const sendErrorResponse = require("../helpers/error-response");
const BlackListService = require("../services/blacklist.service");

const verifyToken = (req, res, next) => {
  const tokenFromHeader = req.headers["authorization"]?.split(" ")[1];
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {
    return sendErrorResponse(res, 401, { message: "Access token is required" });
  }

  const decoded = jwtService.verifyToken(token);
  if (!decoded) {
    return sendErrorResponse(res, 403, {
      token: "Token expired or invalid. Please log in again.",
    });
  }
  req.user = { ...decoded, token };
  next();
};

const isTokenBlacklisted = async (req, res, next) => {
  const blackListService = new BlackListService();
  const token = req.user.token;
  const tokenExisted = await blackListService.findOne({
    refreshToken: token,
  });
  if(tokenExisted){
    return sendErrorResponse(res, 403, {
      token: "Token revoked. Please log in again.",
    });
  }
  next();
};

module.exports = { verifyToken, isTokenBlacklisted };
