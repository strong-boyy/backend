const { Otp } = require("../models/index");

class OtpService {
  async create(otpData) {
    return await Otp.create(otpData);
  }

  async findOne(query) {
    return await Otp.findOne({ where: query });
  }

  async delete(query) {
    return await Otp.destroy({ where: query });
  }
}

module.exports = OtpService;
