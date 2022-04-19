const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    account_id: { ...any },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("no account found");

    const loggedOut = await models.Session.deleteMany({ accountId: account._id });

    return {
      message: "account logged out successfully",
      data: loggedOut,
    };
  },
});
