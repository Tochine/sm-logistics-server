/* eslint-disable global-require */
module.exports = {
  createAccount: require("./createAdmin"),
  loginAdmin: require("./loginAdmin"),
  getItemsAwaitingApproval: require("./getItemsAwaitingApproval"),
  createItemCategory: require("./createItemCategory"),
  getItemCategories: require("./getItemCategories"),
  // payment: require("./payment"),
  // dashboard: require("./dashboard"),
  // paymentType: require("./paymentType"),
  // account: require("./account"),
};
