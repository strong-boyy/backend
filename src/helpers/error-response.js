const ApiError = require("../api-error");

const sendErrorResponse = (res, statusCode, errors) => {
  const apiError = new ApiError(statusCode, errors);
  return res.send(apiError.statusCode, apiError);
};

module.exports = sendErrorResponse;
