const omit = require("lodash/omit");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any, email } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    email: { ...email, optional: true },
  },

  async handler(params) {
    const account = await models.findOne({
      _id: params.account_id,
      email: params.email,
    });
    if (!account) throw new ServiceError("no account found");

    return omit(account.toObject(), ["password", "__v", "createdAt", "updatedAt"]);
  },
});
