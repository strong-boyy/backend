const { Otp } = require("../models/index");

class OtpService {
  async create(otpData) {
    return await Otp.create(otpData);
  }

  async findOne(query) {
    return await Otp.findOne({ where: query });
  }
}

module.exports = OtpService;
