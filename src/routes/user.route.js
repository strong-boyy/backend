const express = require("express");
const users = require("../controllers/user.controller");
const UserSchema = require("../schemas/user.schema");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/auth/login", validate(UserSchema.loginSchema), users.login);

module.exports = router;
