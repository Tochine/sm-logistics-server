/* eslint-disable global-require */
module.exports = {
  createAccount: require("./createAccount"),
  getAccount: require("./getAccount"),
  accountProfileImage: require("./accountProfileImage"),
  updateAccount: require("./updateAccount"),
  updateAccountPassword: require("./updateAccountPassword"),
  login: require("./login"),
  logout: require("./logout"),
  updateOtp: require("./updateOtp"),
  createItem: require("./createItem"),
  updateItem: require("./updateItem"),
  confirmItem: require("./confirmItem"),
  paymentRefNumberConfirmation: require("./paymentRefNumberConfirmation"),
  forgotPassword: require("./forgotPassword"),
  resetPassword: require("./resetPassword"),
  getItemHistory: require("./getItemHistory"),
};
