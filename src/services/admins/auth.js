const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const {
    hashPassword,
    comparePassword
} = require("../../providers/Utilities");
const { createSession } = require("../../providers/createSession");



class AuthService {
    static register = async ({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
    }) => {
    const accountExist = await models.AdminsAccount.findOne({ email });
    if (accountExist) throw new ServiceError("account already exist");

    const accountData = {
        email,
        firstName,
        lastName,
        phoneNumber,
        password: await hashPassword(password)
    };

    const user = await models.AdminsAccount.create(accountData);

    const account = await models.AdminsAccount.findById(user._id);

    return {
      data: await omit(account.toObject(), ["password", "__v"]),
    };
  };

  

  static login = async ({ email, password }, req) => {
    const user = await models.AdminsAccount.findOne(
      { email },
      {},
      { select: "+password" }
    );
    if (!user) throw new ServiceError("account does not exist");

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) throw new ServiceError("password incorrect");

    const data = await models.AdminsAccount.updateOne(
      { _id: user._id },
      {
        lastLoggedIn: new Date(),
        sessionID: req.sessionID,
      }
    );

    const account = await models.AdminsAccount.findById(user._id);
    const{ token } = await createSession(account._id);

    return { account: omit(account.toObject(), ["password", "__v"]) };
  };
}

module.exports = AuthService;