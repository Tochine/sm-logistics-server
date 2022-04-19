const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { date, string, array } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...string },
    socialMedia: { ...string },
    resumptionDate: { ...date },
    locations: { type: array, items: "string" },
  },

  async handler(params) {
    const account = await models.RidersAccount.findById(params.account_id);
    if (!account) throw new ServiceError("account does not exit");

    try {
      const data = {
        accountId: accountExist._id,
        socialMedia: params.socialMedia,
        resumptionDate: params.resumptionDate,
      };
      const credentials = await models.AccountExtra.create(data);

      return {
        message: "credentials successfully created",
      };
    } catch (e) {
      throw e;
    }
  },
});
