const ApiError = require("../api-error");

module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formattedErrors = {};
    error.inner.forEach((err) => {
      formattedErrors[err.path] = err.message;
    });
    const apiError = new ApiError(400, formattedErrors);
    return res.send(apiError.statusCode, apiError);
  }
};
