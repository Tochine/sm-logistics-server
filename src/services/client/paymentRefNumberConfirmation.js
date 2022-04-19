const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    refNumber: { ...any },
    itemID: { ...any },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const item = await models.Items.findById(params.itemID);
    if (!item) throw new ServiceError("item not found");

    const tranxExist = await models.Tranx.findOne({ reference: refNo });
    if (tranxExist) throw new ServiceError("reference number already exist");

    await models.Tranx.findOneAndUpdate(
      { itemId: itemID },
      { reference: refNo },
      { total: item.price },
      { paidAt: new Date() },
      { new: true },
    );

    return {
      message: "Transaction awaiting confirmation",
    };
  },
});
