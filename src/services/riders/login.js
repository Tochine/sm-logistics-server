const _ = require("lodash");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { email, string } = require("../../validationTypes");
const models = require("../../database/models/Index");
const { comparePassword } = require("../../providers/Utilities");
const { createSession } = require("../../providers/createSession");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    email: { ...email },
    password: { ...string, min: 5 },
    ip: { ...string, optional: true },
  },

  async handler(params) {
    const { email, password } = params;
    const account = await models.RidersAccount.findOne(
      { email },
      {},
      { select: "+password" },
    );

    if (!account) throw new ServiceError("email or password not correct");

    const passwordMatch = await comparePassword(password, account.password);
    if (!passwordMatch) throw new ServiceError("password incorrect");

    const auth = await models.RidersAccount.findOneAndUpdate(
      { _id: account._id },
      {
        lastLoggedIn: new Date(),
      },
      { new: true },
    );

    // const auth = await models.RidersAccount.findById(account._id);
    const { token } = await createSession(auth._id, ip = params.ip);

    return {
      account: _.omit(auth.toObject(), ["password", "__v", "createdAt", "updatedAt"]),
      token,
    };
  },
});
