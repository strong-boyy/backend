const yup = require("yup");

class UserSchema {
  static get loginSchema() {
    return yup.object().shape({
      email: yup
        .string()
        .email("Địa chỉ email không chính xác")
        .required("Địa chỉ email không được để trống"),
      password: yup
        .string()
        .min(8, "Mật khẩu phải từ 8 ký tự")
        .required("Mật khẩu không được để trống"),
    });
  }
}

module.exports = UserSchema;
