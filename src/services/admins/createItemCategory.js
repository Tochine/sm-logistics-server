const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { string } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    name: { ...string },

  },
  async handler(params) {
    const nameToLower = params.name.toLowerCase();
    const categoryExist = await models.ItemCategory.findOne({ name: nameToLower});
    if(categoryExist) throw new ServiceError("item category already exist");

    const itemCategory = await models.ItemCategory.create({
      name: nameToLower,
    });

    return itemCategory;
  }
});
