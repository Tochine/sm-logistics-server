const wrapServiceAction = require("../_core/wrapServiceAction");
const { ValidationError } = require("../../exceptions");
const { comparePassword } = require("../../providers/Utilities");
const { string } = require("../../validationTypes");
const models = require("../../database/models");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    otp: { ...string },
  },

  async handler(params) {
    const otpExist = await models.Account.findOne({ otp: params.otp });
    if (!otpExist) {
      throw new ValidationError("otp does not match");
    }

    otpExist.otp = "verified";
    await otpExist.save();

    return {
      message: "otp verified successfully",
    };
  },
});
