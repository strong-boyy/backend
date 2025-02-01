const jwtService = require('../utils/jwt.util');
const sendErrorResponse = require('../helpers/error-response'); 

const verifyToken = (req, res, next) => {
  const tokenFromHeader = req.headers['authorization']?.split(' ')[1];
  const tokenFromCookie = req.cookies?.refreshToken; 
  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {
    return sendErrorResponse(res, 401, { message: "Access token is required" });
  }

  const decoded = jwtService.verifyToken(token); 
  if (!decoded) {
    return sendErrorResponse(res, 403, {
      token: "Refresh token expired or invalid. Please log in again.",
    });
  }
  req.user = decoded;
  next(); 
};

module.exports = verifyToken;
