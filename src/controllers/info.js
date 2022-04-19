const RequestHandler = require("../providers/RequestHandler");
const InfoService = require("../services/info.service");

class InfoController {
  static getCategories = RequestHandler({
    handler: InfoService.getCategories,
  });

  static getWeights = RequestHandler({
    handler: InfoService.getWeights,
  });

  static createItemsCategory = async (req, res, next) => {
    const itemsCategories = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../../docs/categories.items.json`,
        "utf-8"
      )
    );

    try {
      await ItemsCategory.deleteMany({});
      for (let name in itemsCategories) {
        let items = await ItemsCategory.findOne({
          name: itemsCategories[name],
        });
        if (!items) await ItemsCategory.create({ name: itemsCategories[name] });
      }
      res.send({
        message: "Item categories added successfully",
        data: await ItemsCategory.find(),
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = InfoController;
