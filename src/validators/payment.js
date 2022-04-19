const GenericValidator = require("./core");
const ObjectId = require("mongoose").Types.ObjectId;

class PaymentCardValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
    cardNumber: { type: "string" },
    cvs: { type: "string" },
    expiryDate: { type: "string" },
  };
}

class GetPaymentCardValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
  };
}

module.exports = {
  PaymentCardValidator,
  GetPaymentCardValidator,
};
