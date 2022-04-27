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

    passport.passport.key = file.key;
    passport.passport.path = file.location;
    passport.passport.status = true;
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

    driverLicense.driversLicense.key = file.key;
    driverLicense.driversLicense.path = file.location;
    driverLicense.driversLicense.status = true;
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

    nationalId.nationalId.key = file.key;
    nationalId.nationalId.path = file.location;
    nationalId.nationalId.status = true;
    nationalId.save();

    return {
      message: "national ID stored successfully"
    } 
  }
}