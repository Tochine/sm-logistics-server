const domains = require("disposable-email-domains");
const crypto = require("crypto");
const wildcards = require("disposable-email-domains/wildcard.json");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { email, string } = require("../../validationTypes");
const models = require("../../database/models/Index");
const { hashPassword, generateRandomNumbers } = require("../../providers/Utilities");
const { mailMan } = require("../mail");
const { otpMailTemplate } = require("../mail/template");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    firstName: { ...string },
    lastName: { ...string },
    email: {
      ...email,
      messages: {
        email: "email is not valid",
      },
    },
    phoneNumber: { ...string },
    password: { ...string },
  },

  async handler(params) {
    if (params.email.includes("+")) {
      throw new ValidationError([{ message: "email is not valid" }]);
    }

    const [, emailDomain] = params.email.split("@");

    if (domains.includes(emailDomain)) {
      throw new ValidationError([{ message: "email is not valid" }]);
    }

    if (wildcards.some((domain) => emailDomain.includes(domain))) {
      throw new ValidationError([{ message: "email is not valid" }]);
    }

    const accountExist = await models.Account.findOne({ email: params.email });
    if (accountExist) throw new ServiceError("account already exist");

    const otp = generateRandomNumbers();

    const data = {
      email: params.email,
      otp,
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      password: await hashPassword(params.password),
      emailVerificationToken: await crypto.randomBytes(64).toString("hex"),
    };
    const user = await models.Account.create(data);
    const subject = "Account Verification OTP";

    const account = await models.Account.findById(user._id);

    await mailMan(
      account.email,
      subject,
      otpMailTemplate(account.firstName, account.otp),
    );

    return {
      message: "proceed to verifying your account",
    };
  },
});
