const wrapServiceAction = require("./_core/wrapServiceAction");
const { ServiceError } = require("../exceptions");
const config = require("../config");
const { email, any } = require("../validationTypes");
const models = require("../database/models/Index");
const { generateRandomToken } = require("../providers/Utilities");
const { resetPasswordToken } = require("./mail/template");
const { mailMan } = require("./mail");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    email: {
      ...email,
      messages: {
        email: "email is not valid",
      },
    },
    url: { ...any },
  },

  async handler(params) {
    let account;
    let user;
    if (params.url === "/auth/password/forgot") {
      account = await models.Account.findOne({ email: params.email });
      if (!account) throw new ServiceError("account not found");

      const token = generateRandomToken();

      user = await models.Account.findOneAndUpdate(
        { email: account.email },
        { passwordResetToken: token },
        { new: true },
      );
    }

    if (params.url === "/riders/auth/password/forgot") {
      console.log(params.url);
      console.log("*********************");
      account = await models.RidersAccount.findOne({ email: params.email });
      if (!account) throw new ServiceError("account not found");

      const token = generateRandomToken();

      user = await models.RidersAccount.findOneAndUpdate(
        { email: account.email },
        { passwordResetToken: token },
        { new: true },
      );
    }

    const url = `${config.app.frontendUrl}/riders/auth/reset-password/${user.passwordResetToken}`;
    const subject = "Password Reset";

    await mailMan(
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
