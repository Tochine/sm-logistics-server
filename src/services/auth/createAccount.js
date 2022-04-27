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
const { emailVerification, otpMailTemplate } = require("../mail/template");

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



    const data = {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      password: await hashPassword(params.password),
      userType: params.type,
    };

    const user = await models.Account.create(data);


    if (params.type === "client") {
      let pin = generateRandomNumbers()

      await models.Client.create({
        accountId: user._id,
        otp: pin,
      });

      const subject = "Account Verification OTP";

      await mailMan(
        user.email,
        subject,
        otpMailTemplate(user.firstName, pin),
      );

      return {
        message: "proceed to verifying your account",
      };
    }

    if (params.type === "rider") {
      const rider = await models.Rider.create({
        accountId: user._id,
        emailVerificationToken: crypto.randomBytes(64).toString("hex"),
      })
      const url = `${config.app.baseUrl}/riders/auth/verify/${rider.emailVerificationToken}`;
      const subject = "Rider Registeration";
  
      mailMan(
        user.email,
        subject,
        emailVerification(url, user.firstName),
      );
    }

    return _.omit(user.toObject(), ["password", "__v", "createdAt", "updatedAt"]);
  },
});
