const domains = require("disposable-email-domains");
const wildcards = require("disposable-email-domains/wildcard.json");
const _ = require("lodash");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const config = require("../../config");
const { email, string } = require("../../validationTypes");
const models = require("../../database/models/Index");
const { hashPassword } = require("../../providers/Utilities");
const { mailMan } = require("../mail");
const { emailVerification } = require("../mail/template");

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

    const { email } = params;

    const accountExist = await models.RidersAccount.findOne({ email });
    if (accountExist) throw new ServiceError("account already exist");

    const accountData = {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      password: await hashPassword(params.password),
    };
    const user = await models.RidersAccount.create(accountData);

    const url = `${config.app.baseUrl}/riders/auth/verify/${user.emailVerificationToken}`;
    const subject = "Account Registered";

    const account = await models.RidersAccount.findById(user._id);

    await mailMan(
      account.email,
      subject,
      emailVerification(url, account.firstName),
    );

    return _.omit(user.toObject(), ["password", "__v", "createdAt", "updatedAt"]);
  },
});
