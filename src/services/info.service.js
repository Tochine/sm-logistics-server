const models = require("../database/models/Index");

class InfoService {
  static getCategories = async () => {
    return {
      data: await models.ItemCategory.find({}),
    };
  };

  static getWeights = async () => {
    return {
      data: await models.ItemWeight.find({}),
    };
  };
}

module.exports = InfoService;
