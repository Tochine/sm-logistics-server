/* eslint-disable consistent-return */
const AuthService = require("../../services/auth");

module.exports.register = async (req, res, next) => {
  try {
    const result = await AuthService.createAccount({ ...req.body });

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
    const result = await AuthService.login({
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

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await AuthService.forgotPassword({
      email: req.body.email,
      url: req.originalUrl,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const result = await AuthService.resetPassword({
      newPassword: req.body.newPassword,
      token: req.params.token,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOtp = async (req, res, next) => {
  try {
    const result = await AuthService.updateOtp({
      otp: req.body.otp,
    });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};
