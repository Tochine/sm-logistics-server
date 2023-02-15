const wrapServiceAction = require("../_core/wrapServiceAction");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { comparePassword } = require("../../providers/Utilities");
const { createSession, flags } = require("../../providers/createSession");
const { string, email } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    email: { ...email },
    password: { ...string },
  },
  async handler(params) {
    const adminExist = await models.Admin.findOne(
      { email: params.email },
      {},
      { select: "+password" }
    );

    if(!adminExist) throw new ServiceError("email or password is incorrect");

    const passwordMatch = await comparePassword(params.password, adminExist.password);

    if (!passwordMatch) throw new ServiceError("email or password is incorrect");

    const data = await models.Admin.findOneAndUpdate(
      { _id: adminExist._id },
      {lastLoggedIn: new Date()},
      { new: true }
    );

    const { token } = await createSession(data._id, null, flags.admin);

    return { 
      account: omit(data.toObject(), ["password", "__v"]),
      token
    };

  }
});