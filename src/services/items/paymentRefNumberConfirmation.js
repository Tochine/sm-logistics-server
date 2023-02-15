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

    // console.log(tranxExist);

    const data = await models.Tranx.findOne({ itemId: item._id });
    data.reference = params.referenceNumber;
    data.total = item.price;
    data.paidAt = new Date();
    data.status = "pending";
    await data.save();

    return {
      message: "Transaction awaiting confirmation",
    };
  },
});
