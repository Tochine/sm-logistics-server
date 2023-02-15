const wrapServiceAction = require("../_core/wrapServiceAction");

const models = require("../../database/models");

module.exports = wrapServiceAction({
  async handler() {
    const itemCategories = models.ItemCategory.find();

    return itemCategories;
  }
});
