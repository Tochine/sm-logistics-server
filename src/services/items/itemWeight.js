const wrapServiceAction = require("../_core/wrapServiceAction");

const models = require("../../database/models");

module.exports = wrapServiceAction({
  async handler() {
    const itemWeights = models.ItemWeight.find();

    return itemWeights;
  }
});
