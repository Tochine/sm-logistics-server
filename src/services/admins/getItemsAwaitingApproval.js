const wrapServiceAction = require("../_core/wrapServiceAction");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");

module.exports = wrapServiceAction({
  async handler() {
    const items = await models.Tranx.find({ status: "pending" });

    return items;
  }
});
