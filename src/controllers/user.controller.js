const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const config = require("../configs/index");
const jwtService = require("../utils/jwt.service");
const bcrypt = require("bcrypt");

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
        token:{
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      },
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Lỗi khi đăng nhập"));
  }
};