const { ServiceError } = require("../../exceptions");
const config = require("../../config");
const omit = require("lodash/omit");
const models = require("../../database/models/Index");

module.exports = class Kyc {
  static verifyPassport = async ({ riderId, file }) => {
    const account = await models.RidersAccount.findById(riderId);
    if(!account) throw new ServiceError("account not fount")

    const passport = await models.KYC.findOne({ riderId: account._id });
    if(passport.status === "completed") throw new ServiceError("Passort already exist")

    passport.key = file.key;
    passport.path = file.location;
    passport.status = "completed";
    passport.save();

    return {
      account,
      data: omit(passport, ['riderId', 'nationalId', 'driversLicense'])
    } 
  }

  static verifyDriverLicense = async ({ riderId, file }) => {
    const account = await models.RidersAccount.findById(riderId);
    if(!account) throw new ServiceError("account not fount")

    const driverLicense = await models.KYC.findOne({ riderId: account._id });
    if(driverLicense.status === "completed") throw new ServiceError("driver license already exist")

    driverLicense.key = file.key;
    driverLicense.path = file.location;
    driverLicense.status = "completed";
    driverLicense.save();

    return {
      message: "license stored successfully"
    } 
  }


  static verifyNationalId = async ({ riderId, file }) => {
    const account = await models.RidersAccount.findById(riderId);
    if(!account) throw new ServiceError("account not fount")

    const nationalId = await models.KYC.findOne({ riderId: account._id });
    if(nationalId.status === "completed") throw new ServiceError("national ID already exist")

    nationalId.key = file.key;
    nationalId.path = file.location;
    nationalId.status = "completed";
    nationalId.save();

    return {
      message: "national ID stored successfully"
    } 
  }
}