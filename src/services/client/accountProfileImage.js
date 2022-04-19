const omit = require("lodash/omit");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    file: { ...any },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    account.profileImage = params.file.originalname;
    account.profileImagePath = params.file.location;
    await account.save();

    return omit(account.toObject(), ["password", "__v"]);
  },
});
