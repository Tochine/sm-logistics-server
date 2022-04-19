const GenericValidator = require("../core");
const ObjectId = require("mongoose").Types.ObjectId;

class LoginValidator extends GenericValidator {
    schema = {
      $$strict: "remove",
      email: { type: "email" },
      password: { type: "string", trim: true, min: 5 },
    };
  }
  
  class RegisterValidator extends GenericValidator {
    schema = {
      $$strict: "remove",
      email: { type: "email" },
      password: { type: "string", trim: true, min: 5 },
      firstName: { type: "string", trim: true, min: 3 },
      lastName: { type: "string", trim: true, min: 3 },
      phoneNumber: { type: "string", trim: true, min: 7 },
      status: { type: "string", trim: true }
    };
  }

  class PaymentConfirmationValidator extends GenericValidator {
    schema = {
      $$strict: "remove",
      refNo: { type: "string", trim: true },
      itemID: { type: "string" }
    }
  }

  module.exports = {
    LoginValidator,
    RegisterValidator,
    PaymentConfirmationValidator
  }