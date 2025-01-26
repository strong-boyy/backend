const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const config = require("../configs/index");
const jwtService = require("../utils/jwt.service");
const bcrypt = require("bcrypt");
const { omit } = require("lodash");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userService = new UserService();
    const user = await userService.findOne({ email: email });
    if (!user) {
      return next(new ApiError(400, "Vui lòng kiểm tra lại email"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError(400, "Mật khẩu không đúng"));
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
      message: "Đăng nhập thành công",
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
    return next(new ApiError(500, "Lỗi khi đăng nhập"));
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, cfPassword } = req.body;
    const userService = new UserService();
    const user = await userService.findOne({ email: email });
    if (user) {
      return next(new ApiError(400, "Email đã được sử dụng"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email: email,
      name: name,
      password: hashedPassword,
    };
    await userService.create(userData);
    return res.send({
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Lỗi khi đăng ký tài khoản mới"));
  }
};
