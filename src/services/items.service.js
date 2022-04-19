const models = require("../models/Index");
const omit  = require("lodash/omit");
const NodeGeoCoder = require("node-geocoder");
const ObjectId = require("mongoose").Types.ObjectId;
const crypto = require("crypto");
const { ServiceError } = require("../exceptions");
const { geocoder } = require("../providers/geoCoder");
const { calcCrow } = require("../providers/calc");
const { generateCryptoToken } = require("../providers/Utilities");
const config = require("../config");

class ItemsService {


  static confirmPaymentReferenceNumber = async ({ itemID, refNo }, req) => {
    const account = await models.Account.findOne({ sessionID: req.sessionID });
    if (!account) throw new ServiceError("no account found");
    const item = await models.Items.findById(itemID);
    if (!item) throw new ServiceError("item not found");

    const tranxExist = await models.Transaction.findOne({ reference: refNo });
    if (tranxExist) throw new ServiceError("reference number already exist");

    const tranx = await models.Transaction.findOneAndUpdate(
      {itemId: itemID},
      {reference: refNo},
      {total: item.price},
      {paidAt: new Date()},
      {new: true}
    );

    return {
      message: "Transaction awaiting confirmation"
    }
  };


  static getItem = async ({ itemId }) => {
    const item = await models.Items.findById(itemId);
    if (!item) throw new ServiceError("No item found");

    const arr = [];

    for (const data of item.items) {
      const itemCategory = await models.ItemCategory.findOne({
        _id: data.categoryId,
      });
      const itemWeight = await models.ItemWeight.findOne({
        _id: data.weightId,
      });
      arr.push({ itemCategory, itemWeight });
    }

    return { data: item };
  };
}

module.exports = ItemsService;
