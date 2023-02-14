const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const config = require("../../config");
const { email } = require("../../validationTypes");
const models = require("../../database/models");
const { generateRandomToken } = require("../../providers/Utilities");
const { resetPasswordToken } = require("../mail/template");
const { mailMan } = require("../mail");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    email: {
      ...email,
      messages: {
        email: "email is not valid",
      },
    },
  },

  async handler(params) {
    const account = await models.Account.findOne({ email: params.email });
    if (!account) throw new ServiceError("account not found");

    const token = generateRandomToken();

    const user = await models.Account.findOneAndUpdate(
      { email: account.email },
      { passwordResetToken: token },
      { new: true },
    );

    const url = `${config.app.frontendUrl}/reset-password/${user.passwordResetToken}`;
    const subject = "Password Reset";

    mailMan(
      account.email,
      subject,
      resetPasswordToken(url, account.firstName),
    );

    return {
      status: "success",
      message: "A reset link has been sent to your mail",
    };
  },
});
