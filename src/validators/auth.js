const GenericValidator = require("./core");
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
    phoneNumber: { type: "string", trim: true, min: 8 },
    // userType: { type: "enum", values: ["client", "rider"] },
  };
}

class LogoutValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    token: { type: "string" },
  };
}

class ForgotPasswordValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    email: { type: "email" },
  };
}

class ResetPasswordValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    newPassword: { type: "string" },
  };
}


module.exports = {
  ForgotPasswordValidator,
  ResetPasswordValidator,
  RegisterValidator,
  LoginValidator,
  LogoutValidator,
};
