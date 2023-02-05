const wrapServiceAction = require("../_core/wrapServiceAction");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { any } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    itemId: { ...any },
    tranxId: { ...any },
  },
  async handler(params) {
    const riders = await models.find({ status: "active", loginStatus: true });
    if (riders.length < 0) {
      throw new ServiceError("no rider available at the moment");
    }

    // for (const d of data) {
    //     // send notification to rider
    //     await new Promise(resolve => setTimeout(resolve, 10000));
    //     break;
    // }

  }

});
