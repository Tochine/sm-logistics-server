const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { any, date, string, array } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    accountId: { ...any },
    socialMedia: { ...string },
    resumptionDate: { ...date },
    locations: { ...array, items: "string" },
  },
  async handler(params) {
    const account = await models.RidersAccount.findById(params.account_id);
    if (!account) throw new ServiceError("account does not exit");

    const data = {
      accountId: account._id,
      socialMedia: params.socialMedia,
      resumptionDate: params.resumptionDate,
    };
    await models.AccountExtra.create(data);

    return {
      message: "credentials successfully created",
    };
  },
})
