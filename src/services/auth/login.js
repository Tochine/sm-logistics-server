const domains = require("disposable-email-domains");
const _ = require("lodash");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { email, string } = require("../../validationTypes");
const models = require("../../database/models");
const { comparePassword } = require("../../providers/Utilities");
const { createSession } = require("../../providers/createSession");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    email: {
      ...email,
      messages: {
        email: "email is not valid",
      },
    },
    password: { ...string },
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


    const user = await models.Account.findOne(
      { email: params.email },
      {},
      { select: "+password" },
    );
    if (!user) throw new ServiceError("account does not exist");

    const passwordMatch = await comparePassword(params.password, user.password);

    if (!passwordMatch) throw new ServiceError("password incorrect");

    const account = await models.Account.findOneAndUpdate(
      { _id: user._id },
      {
        lastLoggedIn: new Date(),
      },
      { new: true },
    );

    let count;
    let client;

    const data = Object.assign(user, client)

    const { token } = await createSession(account._id, params.ip);


    return {
      account: _.omit(data.toObject(), ["password", "__v", "createdAt", "updatedAt"]),
      token
    };
  },
});
