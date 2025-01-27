const express = require("express");
const users = require("../controllers/user.controller");
const UserSchema = require("../schemas/user.schema");
const validate = require("../middlewares/validate.middleware");
const passport = require("../../src/passport");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/api/users/auth/google/profile");
  }
);

router.get("/auth/google/profile", users.loginByGoogle);

router.post("/auth/login", validate(UserSchema.loginSchema), users.login);
router.post(
  "/auth/register",
  validate(UserSchema.registerSchema),
  users.register
);

module.exports = router;
