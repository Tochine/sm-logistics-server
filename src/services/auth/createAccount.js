const domains = require("disposable-email-domains");
const crypto = require("crypto");
const _ = require("lodash");
const wildcards = require("disposable-email-domains/wildcard.json");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const config = require("../../config");
const { email, string } = require("../../validationTypes");
const models = require("../../database/models");
const { hashPassword, generateRandomNumbers, encrypt } = require("../../providers/Utilities");
const { mailMan } = require("../mail");
const { otpMailTemplate } = require("../mail/template");
const { createSession } = require("../../providers/createSession");

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
    type: { ...string },
    ip: { ...string, optional: true },
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

    const pin = generateRandomNumbers()

    const data = {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      password: await hashPassword(params.password),
      userType: params.type,
      otp: pin,
    };

    const user = await models.Account.create(data);

    const subject = "Account Verification OTP";

    

    mailMan(
      user.email,
      subject,
      otpMailTemplate(user.firstName, pin)
    );

    const token = await createSession(user._id, params.ip);


    return "proceed to verify email"
  },
});
