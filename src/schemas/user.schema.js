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

  static get registerSchema() {
    return yup.object().shape({
      name: yup.string().required("Tên không được để trống"),
      email: yup
        .string()
        .email("Địa chỉ email không chính xác")
        .required("Địa chỉ email không được để trống"),
      password: yup
        .string()
        .min(8, "Mật khẩu phải từ 8 ký tự")
        .required("Mật khẩu không được để trống"),
      // cfPassword: yup
      //   .string()
      //   .min(8, "Mật khẩu phải từ 8 ký tự")
      //   .required("Mật khẩu không được để trống")
      //   .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
    });
  }
}

module.exports = UserSchema;
