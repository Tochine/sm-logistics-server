const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { string } = require("../../validationTypes");
const models = require("../../database/models");
const { hashPassword } = require("../../providers/Utilities");
const { passwordResetSuccess } = require("../mail/template");
const { mailMan } = require("../mail");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    newPassword: { ...string },
    token: { ...string },
  },

  async handler(params) {
    const account = await models.Account.findOne({
      passwordResetToken: params.token,
    });
    if (!account) throw new ServiceError("User not found");

    await models.Account.findOneAndUpdate(
      { passwordResetToken: params.token },
      {
        password: await hashPassword(params.newPassword),
        passwordResetToken: null,
      },
    );

    const subject = "Password Reset Successful";

    await mailMan(
      account.email,
      subject,
      passwordResetSuccess(account.firstName),
    );

    return {
      message: "password reset successful",
    };
  },
});
