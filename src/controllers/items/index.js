/* eslint-disable consistent-return */
const ItemService = require("../../services/items");


module.exports.createItem = async (req, res, next) => {
    try {
      const result = await ItemService.createItem({
        account_id: req.session.account._id,
        ...req.body,
      });
  
      return res.send({
        status: "success",
        result,
      });
    } catch (error) {
      next(error);
    }
  };