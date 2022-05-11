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

    const driverLicense = await models.KYC.findOne({ riderId: account._id });
    if(driverLicense.driversLicense.status === "completed") throw new ServiceError("driver license already exist")

    driverLicense.driversLicense.key = file.key;
    driverLicense.driversLicense.path = file.location;
    driverLicense.driversLicense.status = true;
    driverLicense.save();

    return {
      message: "license stored successfully"
    } 
  }
})