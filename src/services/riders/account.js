const config = require("../../config");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const { geocoder } = require("../../providers/geoCoder");
const mailer = require("../../mails");
const models = require("../../database/models/Index");
const {
  hashPassword,
  generateToken,
  comparePassword,
  decodeToken,
} = require("../../providers/Utilities");

const sgMail = require("@sendgrid/mail");
const sendgridKey = config.mail.sgKey;

class AccountService {
  static getRiderAccount = async ({ accountId }) => {
    const account = await models.RidersAccount.findById(accountId);
    if (!account) throw new ServiceError("Account does not exist");

    return { data: account };
  };

  static verifyEmail = async ({ token }) => {
    const { _id } = await decodeToken(token);

    const account = await models.RidersAccount.findOne({ _id });

    await models.RidersAccount.updateOne(
      { _id: account._id },
      {
        isVerified: true,
        verifiedAt: new Date(),
      }
    );

    return {
      message: "account has been verified",
    };
  };

  static changeAccountPassword = async ({
    accountId,
    currentPassword,
    newPassword,
  }) => {
    const account = await models.RidersAccount.findById(accountId);
    if (!account) throw new ServiceError("account does not exist");

    const passwordMatch = await comparePassword(
      currentPassword,
      account.password
    );
    if (!passwordMatch) throw new ServiceError("Current password is incorrect");

    account.password = await hashPassword(newPassword);
    await account.save();

    return {
      message: "Password changed successfully",
      data: account,
    };
  };

  static updateRiderProfile = async ({riderID, firstName, lastName, email, phoneNumber}) => {
    const account = await models.RidersAccount.findById(riderID);
    if (!account) throw new ServiceError("no account found");

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber
    }

    account.firstName = firstName;
    account.lastName = lastName;
    account.email = email;
    account.phoneNumber = phoneNumber;
    await account.save();

    return account;
  };

  static getRiderHistory = async ({ accountId }) => {
    const account = await models.RidersAccount.findById(accountId);
    if (!account) throw new ServiceError("Account does not exist");

    // const dropOff = await models.Items.find({accountId: account._id, type: "express" });
    const rides = await models.Transaction.find({ riderId: account._id });

    return { data: rides };
  };

  static getCoordinates = async ({ sessionID, riderId, lat, long }) => {
    const account = await models.RidersAccount.findOne({
      sessionID: sessionID,
    });
    if (!account) throw new ServiceError("Account not found");

    // const data = await models.RidersAccount.updateOne(
    //   {riderId: account.sessionID},
    //   {coordinates.lat: lat}
    // )

    account.coordinates.lat = lat;
    account.coordinates.long = long;
    await account.save();

    return { account: omit(account.toObject(), ["password", "__v"]) };
  };

  // static storeRiderProfile = async ({ riderID, details }) => {
  //   const account = await models.RidersAccount.findById(riderID);
  //   if (!account) throw new ServiceError("account not found");

  //   await account.updateMany({}, 
  //     {})
  // }
}

module.exports = AccountService;
