const wrapServiceAction = require("../_core/wrapServiceAction");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { hashPassword } = require("../../providers/Utilities");
const { any, string, email } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    createdBy: {  ...any, optional: true },
    fullName: { ...string },
    email: { ...email },
    phoneNumber: { ...string },
    password: { ...string },
  },
  async handler(params) {
    const accountExist = await models.Admin.findOne({ email: params.email });
    if(accountExist) throw new ServiceError("email already exist");

    const newAdmin = await models.Admin.create({
      fullName: params.fullName,
      email: params.email,
      phoneNumber: params.phoneNumber,
      password: await hashPassword(params.password),
      createdBy: params.createdBy
    });

    return omit(newAdmin.toObject(), ["password", "__v"]);
  }
});
