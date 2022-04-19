const config = require("../../config");

module.exports.paymentType = () => {
  return {
    orangeMoney: config.paymentType.orangeMoney,
    africell: config.paymentType.africell,
  };
};
