const GenericValidator = require("./core");
const ObjectId = require("mongoose").Types.ObjectId;

class CreateDropOffValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
    type: { type: "string" },
    timeline: { type: "string", optional: true },
    items: {
      type: "array",
      props: {
        quantity: { type: "number", min: 1 },
        weightId: { type: "any" },
        categoryId: { type: "any" },
      },
    },
  };
}

class UpdateDropOffValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    dropOffId: { type: "string" },
    to: { type: "string" },
    from: { type: "string" },
    recipientFullName: { type: "string" },
    recipientPhoneNumber: { type: "string" },
    note: { type: "string", optional: true },
  };
}

// class CreatePaymentValidator extends GenericValidator {
//   schema = {
//     $$strict: "remove",
//     ownerId: { type: ObjectId },
//     cardDetails: {
//       type: "array",
//       props: {
//         cardNumber: { type: "string" },
//         cvs: { type: "number" },
//         expiryDate: { type: "date" },
//       },
//     },
//   };
// }

class ConfirmDropOffValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    items: {
      type: "array",
      props: {
        quantity: { type: "number", min: 1 },
        weightId: { type: "any" },
        categoryId: { type: "any" },
      },
    },
    dropOffId: { type: "string" },
    to: { type: "string" },
    from: { type: "string" },
    recipientFullName: { type: "string" },
    recipientPhoneNumber: { type: "string" },
    note: { type: "string", optional: true },
  };
}

class ChangeAccountPasswordValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: ObjectId },
    currentPassword: { type: "string" },
    newPassword: { type: "string" },
  };
}

class GetAccounValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
  };
}

class GetRiderAccounValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
  };
}

class GetAccountItemsValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
  };
}

class GetRidersHistoryValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    accountId: { type: "string" },
  };
}

class EmailVerifiedValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    token: { type: "string", optional: true },
  };
}

class ProfileImageUploadValidator extends GenericValidator {
  shema = {
    $$strict: "remove",
    image: { type: "string" }
  }
}

module.exports = {
  CreateDropOffValidator,
  UpdateDropOffValidator,
  ConfirmDropOffValidator,
  GetAccounValidator,
  ChangeAccountPasswordValidator,
  GetAccountItemsValidator,
  EmailVerifiedValidator,
  GetRiderAccounValidator,
  GetRidersHistoryValidator,
  ProfileImageUploadValidator,
};
