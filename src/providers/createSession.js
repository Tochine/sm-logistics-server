const moment = require("moment");
const models = require("../database/models");
const { generateJWTToken } = require("./Utilities");


module.exports.flags = {
  admin: "ADMIN",
  auth: "AUTH",
  verification: "VERIFICATION"
}

module.exports.createSession = async (accountId, ip = null, flag) => {
  const accountSession = await models.Session.create({
    accountId,
    token: await generateJWTToken({ id: accountId, flag: flag }),
    expires: moment().add(1, "day").toDate(),
    initiatedAt: new Date(),
    ip,
  });

  return accountSession;
};
