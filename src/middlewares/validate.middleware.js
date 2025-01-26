module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: true });
    next();
  } catch (error) {
    res.status(400).json({
      errors: error.errors,
    });
  }
};
