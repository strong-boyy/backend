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
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        user:{
          id: user.id,
          name: user.name || "UnKnown",
          email: user.email || "UnKnown",
          avatar: user.avatar || "UnKnown",
        }
      },
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Lỗi khi đăng nhập"));
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

      return res.send({
        message: "Đã đăng nhập",
        data: {
          token: {
            accessToken,
            refreshToken,
          },
          user:{
            id: existingUser.id,
            name: existingUser.name || "UnKnown",
            email: existingUser.email || "UnKnown",
            avatar: existingUser.avatar || "UnKnown",
          }
        },
      });
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
      return res.send({
        message: "Đăng nhập thành công",
        data: {
          token: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          user:{
            id: newUser.id,
            name: newUser.name || "UnKnown",
            email: newUser.email || "UnKnown",
            avatar: newUser.avatar || "UnKnown",
          }
        },
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Lỗi khi đăng nhập với Google"));
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
