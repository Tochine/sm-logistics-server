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

    const { nationalId } = await models.KYC.findOne({ riderId: account._id });
    if(nationalId.status === "completed") throw new ServiceError("national ID already exist")

    nationalId.key = file.key;
    nationalId.path = file.location;
    nationalId.status = true;
    nationalId.save();

    return {
      message: "national ID stored successfully"
    } 
  }
})