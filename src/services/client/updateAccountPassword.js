const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { any, string } = require("../../validationTypes");
const models = require("../../database/models");
const { comparePassword, hashPassword } = require("../../providers/Utilities");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    currentPassword: { ...string },
    newPassword: { ...string },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_idd);
    if (!account) throw new ServiceError("account does not exist");

    const passwordMatch = await comparePassword(
      params.currentPassword,
      account.password,
    );

    if (!passwordMatch) throw new ValidationError("password does not match");

    account.password = await hashPassword(params.newPassword);
    await account.save();

    return {
      message: "Password updated successfully",
    };
  },
});
