/* eslint-disable global-require */
module.exports = {
  createAccount: require("./createAdmin"),
  loginAdmin: require("./loginAdmin"),
  getItemsAwaitingApproval: require("./getItemsAwaitingApproval"),
  createItemCategory: require("./createItemCategory"),
  getItemCategories: require("./getItemCategories"),
  createItemWeight: require("./createItemWeight"),
  // payment: require("./payment"),
  // dashboard: require("./dashboard"),
  // paymentType: require("./paymentType"),
  // account: require("./account"),
};
