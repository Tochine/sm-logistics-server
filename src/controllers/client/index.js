/* eslint-disable consistent-return */
const ClientService = require("../../services/client");

module.exports.getAccount = async (req, res, next) => {
  try {
    const result = await ClientService.getAccount({
      account_id: req.session.account._id,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.profileImage = async (req, res, next) => {
  try {
    const result = await ClientService.accountProfileImage({
      account_id: req.session.account._id,
      file: req.file,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAccount = async (req, res, next) => {
  try {
    const result = await ClientService.updateAccount({
      account_id: req.session.account._id,
      ...req.body,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAccountPassword = async (req, res, next) => {
  try {
    const result = await ClientService.updateAccountPassword({
      account_id: req.session.account._id,
      ...req.body,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const result = await ClientService.logout({
      account_id: req.session.account._id,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAccountItemHistory = async (req, res, next) => {
  try {
    const result = await ClientService.getAccountItemHistory({
      account_id: req.session.account._id,
    });
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};
