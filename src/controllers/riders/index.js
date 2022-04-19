const AccountService = require("../../services/riders");

module.exports.createAccount = async (req, res, next) => {
  try {
    const result = await AccountService.createAccount({ ...req.body });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const result = await AccountService.login({
      ...req.body,
      ip: req.ip,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.verifyPassport = async (req, res, next) => {
  try {
    const result = await AccountService.Kyc.verifyPassport({
      file,
      riderId: req.session.account._id,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.verifyDriverLicense = async (req, res, next) => {
  try {
    const result = await AccountService.Kyc.verifyDriverLicense({
      file,
      riderId: req.session.account._id,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.verifyNationalId = async (req, res, next) => {
  try {
    const result = await AccountService.Kyc.verifyNationalId({
      file,
      riderId: req.session.account._id,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};
