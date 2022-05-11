/* eslint-disable consistent-return */
const KycService = require("../../services/kyc");

module.exports.requestDriverLicense = async (req, res, next) => {
  try {
    const result = await KycService.requestDriverLicense({
        file: req.file,
        accountId: req.session.account._id,
      });
  
      return res.send({
        status: "success",
        result,
      });
  } catch (error) {
    next(error);
  }
};

module.exports.requestPassport = async (req, res, next) => {
  try {
    const result = await KycService.requestPassport(req, res, next);({
        file: req.file,
        accountId: req.session.account._id,
      });
  
      return res.send({
        status: "success",
        result,
      });
  } catch (error) {
    next(error);
  }
};

module.exports.requestNationalId = async (req, res, next) => {
  try {
    const result = await KycService.requestNationalID(req, res, next);({
        file: req.file,
        accountId: req.session.account._id,
      });
  
      return res.send({
        status: "success",
        result,
      });
  } catch (error) {
    next(error);
  }
};
