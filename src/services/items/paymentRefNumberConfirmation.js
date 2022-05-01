const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    referenceNumber: { ...any },
    dropOffId: { ...any },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const item = await models.Items.findById(params.dropOffId);
    if (!item) throw new ServiceError("item does not exist");

    const tranxExist = await models.Tranx.findOne({ reference: params.referenceNumber });
    if (tranxExist) throw new ServiceError("reference number already exist");

    const tranx = await models.Tranx.findOneAndUpdate(
      { itemId: params.dropOffId },
      { reference: params.referenceNumber },
      { paidAt: new Date() },
    ).exec();


    // tranxExist.itemId = params.dropOffId;
    // tranxExist.reference = params.referenceNumber;
    // tranxExist.total = item.price;
    // tranxExist.paidAt = new Date();
    // await tranxExist.save();

    return {
      message: "Transaction awaiting confirmation",
    };
  },
});
