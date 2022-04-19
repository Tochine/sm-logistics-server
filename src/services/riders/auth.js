const config = require("../../config");
const { ServiceError } = require("../../exceptions");
const omit = require("lodash/omit");
const { mailMan } = require("../mail");
const models = require("../../database/models/Index");
const {
  hashPassword,
  generateToken,
  comparePassword,
  decodeToken,
} = require("../../providers/Utilities");
const { emailVerification } = require("../mail/template");
const { createSession } = require("../../providers/createSession");

module.exports = class AuthService {
  static register = async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }) => {
    const accountExist = await models.RidersAccount.findOne({ email });
    if (accountExist) throw new ServiceError("account already exist");

    const accountData = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password: await hashPassword(password),
    };
    const user = await models.RidersAccount.create(accountData);

    let url =
      config.app.baseUrl + `/riders/auth/verify/${user.emailVerificationToken}`;
    let subject = "Email Verification";

    const account = await models.RidersAccount.findById(user._id);

    await mailMan(
      account.email,
      subject,
      emailVerification(url, account.firstName)
    );

    return {
      message: "proceed to your mail to verifying your account",
    };
  };

};
