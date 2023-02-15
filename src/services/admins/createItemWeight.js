const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { number } = require("../../validationTypes");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    start: { ...number },
    end: { ...number }

  },
  async handler(params) {
    
    const weightExist = await models.ItemWeight.find({ start: params.start, end: params.end});
    console.log(weightExist.length)
    if (weightExist.length > 0) throw new ServiceError("weight range already exist");

    console.log(params)

    const weight = await models.ItemWeight.create({
      start: params.start,
      end: params.end
    });

    return weight;
  }
});