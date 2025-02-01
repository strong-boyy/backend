const yup = require("yup");

class UserSchema {
  static get loginSchema() {
    return yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });
  }

  static get registerSchema() {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });
  }

  static get verifyOtpSchema() {
    return yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email address is required"),
      otp: yup
        .string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "Invalid OTP format"),
    });
  }

  static get updateUserSchema() {
    return yup.object().shape({
      name: yup.string(),
      email: yup.string().email("Invalid email address"),
    }).test(
      "at-least-one-field",
      "At least one of name or email must be provided",
      (values) => values.name || values.email 
    );
  }
  
}

module.exports = UserSchema;
