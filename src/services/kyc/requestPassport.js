const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { any } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    accountId: { ...any },
    file: { ...any },
  },
  async handler(params) {
    const account = await models.RidersAccount.findById(riderId);
    if(!account) throw new ServiceError("account not fount")

    const { passport } = await models.KYC.findOne({ riderId: account._id });
    if(passport.status === "completed") throw new ServiceError("passport license already exist")

    passport.key = file.key;
    passport.path = file.location;
    passport.status = true;
    passport.save();

    return {
      message: "passport stored successfully"
    } 
  }
})