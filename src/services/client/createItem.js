const { ObjectId } = require("mongoose").Types;
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError, ValidationError } = require("../../exceptions");
const {
  string, number, array, any, date,
} = require("../../validationTypes");
const models = require("../../database/models/Index");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    type: { ...string },
    timeline: { ...string, optional: true },
    items: {
      ...array,
      props: {
        quantity: { ...number, min: 1 },
        weightId: { any },
        categoryId: { any },
      },
    },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const { items, timeline, type } = params;

    const data = items.map((item) => ({
      quantity: item.quantity,
      weightId: ObjectId(item.weightId),
      categoryId: ObjectId(item.categoryId),
    }));

    const newItems = new models.Items();
    if (timeline) {
      newItems.timeline = timeline;
    }

    data.forEach((item) => {
      newItems.items.push(item);
    });

    newItems.accountId = account._id;
    newItems.type = type;

    await newItems.save();

    return {
      data: newItems,
    };
  },
});
