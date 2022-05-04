/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
  },

  async handler(params) {
    const account = await models.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const items = await models.Items.find({ accountId: account._id });
    const result = [];
    let arr = [];

    for (const item of items) {
      for (const data of item.items) {
        const itemCategory = await models.ItemCategory.findOne({
          _id: data.categoryId,
        });
        const itemWeight = await models.ItemWeight.findOne({
          _id: data.weightId,
        });
        arr.push({ itemCategory, itemWeight });
      }
      result.push({ ...item._doc, items: arr });
      arr = [];
    }

    return { data: result };
  },
});
