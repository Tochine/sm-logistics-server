/* eslint-disable consistent-return */
const ItemService = require("../../services/items");


module.exports.createItem = async (req, res, next) => {
    try {
      const result = await ItemService.createDropOff({
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

module.exports.updateItem = async (req, res, next) => {
    try {
      const result = await ItemService.updateDropOff({
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

module.exports.confirmItem = async (req, res, next) => {
  try {
    const result = await ItemService.confirmDropOff({
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

module.exports.paymentRefNumberConfirmation = async (req, res, next) => {
  try {
    const result = await ItemService.paymentRef({
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

module.exports.getItemCategories = async (req, res, next) => {
  try {
    const result = await ItemService.itemCategory();

    return res.send({
      status: "success",
      result
    });
  } catch (error) {
    next(error)
  }
}

module.exports.getItemWeights = async (req, res, next) => {
  try {
    const result = await ItemService.itemWeight();
    
    return res.send({
      status: "success",
      result
    });
  } catch (error) {
    next(error)
  }
}