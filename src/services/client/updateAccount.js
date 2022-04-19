const omit = require("lodash/omit");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any, string } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    firstName: { ...string, optional: true },
    lastName: { ...string, optional: true },
    phoneNumber: { ...string, optional: true },
  },

  async handler(params) {
    const account = await models.Account.findOne({ _id: params.account_id });
    if (!account) throw new ServiceError("account not found");

    account.firstName = params.firstName;
    account.lastName = params.lastName;
    account.phoneNumber = params.phoneNumber;
    await account.save();

    return omit(account.toObject(), ["password", "__v", "updatedAt", "createdAt"]);
  },
});
