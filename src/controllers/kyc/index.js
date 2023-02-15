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
    const result = await KycService.requestPassport({
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
    const result = await KycService.requestNationalID({
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

module.exports.requestExtra = async (req, res, next) => {
  try {
    const result = await KycService.requestExtra({
      accountId: req.session.account._id,
      ...req.body
    });
    return res.send({
      status: "success",
      result
    });
  } catch (error) {
    next(error);
  }
}
