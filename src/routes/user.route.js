const express = require("express");
const users = require("../controllers/user.controller");
const UserSchema = require("../schemas/user.schema");
const validate = require("../middlewares/validate.middleware");
const passport = require("../../src/passport");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");

// Google
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
// End Google

router.post("/auth/login", validate(UserSchema.loginSchema), users.login);
router.post(
  "/auth/register",
  validate(UserSchema.registerSchema),
  users.register
);
router.post(
  "/auth/verifyOtp",
  validate(UserSchema.verifyOtpSchema),
  users.verifyOtp
);

router.post("/auth/refreshToken", verifyToken, users.refreshToken);

module.exports = router;
