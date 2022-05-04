const moment = require("moment");
const models = require("../database/models");
const { generateJWTToken } = require("./Utilities");

module.exports.createSession = async (accountId, ip) => {
  const accountSession = await models.Session.create({
    accountId,
    token: await generateJWTToken({ id: accountId, flag: "AUTH" }),
    expires: moment().add(1, "day").toDate(),
    initiatedAt: new Date(),
    ip,
  });

  return accountSession;
};
