const GenericValidator = require("./core");
const ObjectId = require("mongoose").Types.ObjectId;

class GetItemValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    itemId: { type: "string" },
  };
}

class ConfirmPaymentReferenceNumberValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    itemID: { type: "string" },
    orderNo: { type: "string" }
  }
}

module.exports = {
  GetItemValidator,
  ConfirmPaymentReferenceNumberValidator
};
