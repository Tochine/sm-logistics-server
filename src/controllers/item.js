const RequestHandler = require("../providers/RequestHandler");
const ItemsService = require("../services/items.service");
const {
  CreateDropOffValidator,
  UpdateDropOffValidator,
  ConfirmDropOffValidator,
} = require("../validators");

const { ConfirmPaymentReferenceNumberValidator } = require("../validators/item");

const { GetItemValidator } = require("../validators/item");

class ItemsController {
  static createDropOff = RequestHandler({
    validator: CreateDropOffValidator,
    handler: ItemsService.createItem,
  });

  static updateDropOff = RequestHandler({
    validator: UpdateDropOffValidator,
    handler: ItemsService.updateDropOff,
  });

  static confirmDropOff = RequestHandler({
    validator: ConfirmDropOffValidator,
    handler: ItemsService.confirmDropOff,
  });


  static getItem = RequestHandler({
    validator: GetItemValidator,
    handler: ItemsService.getItem,
  });

  static confirmPaymentRefernceNumber = RequestHandler({
    validator: ConfirmPaymentReferenceNumberValidator,
    handler: ItemsService.confirmPaymentReferenceNumber,
  });
}

module.exports = ItemsController;
