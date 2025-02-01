const bcrypt = require("bcrypt");
const { omit, isFinite } = require("lodash");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const config = require("../config/index");
const jwtService = require("../utils/jwt.util");
const emailService = require("../utils/email.util");
const OtpService = require("../services/otp.service");
const { Op } = require("sequelize");
const sendErrorResponse = require("../helpers/error-response");
const cloudinary = require("../config/cloudinary");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userService = new UserService();
    const user = await userService.findOne({ email: email });
    if (!user) {
      return sendErrorResponse(res, 400, { email: "Please check your email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, { password: "Incorrect password" });
    }
    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = jwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
    });
    return res.send({
      message: "Login successful",
      data: {
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        user: omit(user.toJSON(), "password"),
      },
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, { message: "Error during login" }));
  }
};

exports.loginByGoogle = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Vui lòng đăng nhập lại"));
    }
    if (req.isAuthenticated()) {
      const { googleId, email } = req.user;
      const userService = new UserService();

      const existingUser = await userService.findOne({ email: email });
      if (!existingUser) {
        return next(new ApiError(404, "Người dùng không tồn tại"));
      }

      const accessToken = jwtService.generateAccessToken({
        id: existingUser.id,
        email: existingUser.email,
      });
      const refreshToken = jwtService.generateRefreshToken({
        id: existingUser.id,
        email: existingUser.email,
      });

      return res.send(`
        <script>
          window.opener.postMessage({
            type: "google-login-success",
            message: "Login success",
            userData: {
              user: {
                id: "${existingUser.id}",
                name: "${existingUser.name || "UnKnown"}",
                email: "${existingUser.email || "UnKnown"}",
                avatar: "${existingUser.avatar || "UnKnown"}",
              },
              token: {
                accessToken: "${accessToken}",
                refreshToken: "${refreshToken}"
              }
            }
          }, "http://localhost:4000");
          window.close();
        </script>
      `);
    } else {
      const { googleId, name, email, avatar } = req.user;
      const userService = new UserService();
      const user = await userService.findOne({ email: email });
      if (user) {
        return next(new ApiError(400, "Email đã được sử dụng"));
      }
      const userData = {
        email: email,
        name: name,
        avatar: avatar,
        googleId: googleId,
        isActived: 1,
      };
      const newUser = await userService.create(userData);
      const accessToken = jwtService.generateAccessToken({
        id: newUser.id,
        email: newUser.email,
      });
      const refreshToken = jwtService.generateRefreshToken({
        id: newUser.id,
        email: newUser.email,
      });
      return res.send(`
        <script>
          window.opener.postMessage({
            type: "google-login-success",
            message: "Login success",
            userData: {
              user: {
                id: "${existingUser.id}",
                name: "${existingUser.name || "UnKnown"}",
                email: "${existingUser.email || "UnKnown"}",
                avatar: "${existingUser.avatar || "UnKnown"}",
              },
              token: {
                accessToken: "${accessToken}",
                refreshToken: "${refreshToken}"
              }
            }
          }, "http://localhost:4000");
          window.close();
        </script>
      `);
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Lỗi khi đăng nhập với Google"));
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userService = new UserService();
    const otpService = new OtpService();
    const user = await userService.findOne({ email: email });
    if (user) {
      return sendErrorResponse(res, 400, {
        email: "Email has already been used",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email: email,
      name: name,
      password: hashedPassword,
      isActived: 0,
    };
    const otp = emailService.generateOtp();
    try {
      await emailService.sendEmail(
        email,
        "Mã OTP đăng ký tài khoản",
        `Mã OTP của bạn là: ${otp}`,
        `<h2>Mã OTP của bạn là: ${otp}</h2>`
      );
    } catch (error) {
      console.log(error);
      return sendErrorResponse(res, 500, {
        sendEmail: "Error when sending email",
      });
    }
    const newUser = await userService.create(userData);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    await otpService.create({
      userId: newUser.id,
      otp: otp,
      expiresAt: expiresAt,
    });
    return res.send({
      message: "Registration successful",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, {
      message: "Error when registering new account",
    });
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const userService = new UserService();
    const otpService = new OtpService();
    const user = await userService.findOne({ email: email });
    if (!user) {
      return sendErrorResponse(res, 404, {
        email: "Account does not exist with email",
      });
    }
    const otpRecord = await otpService.findOne({
      userId: user.id,
      otp: otp,
      expiresAt: { [Op.gt]: new Date() },
    });
    if (!otpRecord) {
      return sendErrorResponse(res, 400, { otp: "Invalid or expired OTP" });
    }
    try {
      await userService.update({ isActived: 1 }, { id: otpRecord.userId });
    } catch (error) {
      console.log(error);
      return sendErrorResponse(res, 400, {
        message: "Error when updating account status",
      });
    }
    await otpService.delete({
      userId: user.id,
      otp: otp,
    });
    return res.send({
      message: "Verification successful",
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, {
      message: "Error during OTP verification",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const userService = new UserService();
    const user = await userService.findOne({ email: email });
    if (!user) {
      return sendErrorResponse(res, 404, { email: "Email not found" });
    }
    const newAccessToken = jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    return res.send({
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, {
      message: "Error during token refresh",
    });
  }
};
