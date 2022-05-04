/* eslint-disable consistent-return */
const Services = require("../services");

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await Services.forgotPassword({
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
