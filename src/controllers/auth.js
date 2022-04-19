const requestHandler = require("../providers/RequestHandler");
const AuthService = require("../services/auth.service");
const AccountService = require("../services/account.service");
const {
  ForgotPasswordValidator,
  ResetPasswordValidator,
  LoginValidator,
  RegisterValidator,
  LogoutValidator,
} = require("../validators/auth");

module.exports = class AuthController {
  static verifyEmail = requestHandler({
    // validator: EmailVerifiedValidator,
    handler: AuthService.verifyEmail,
  });
  static login = requestHandler({
    validator: LoginValidator,
    handler: AccountService.login,
  });

  static register = requestHandler({
    validator: RegisterValidator,
    handler: AccountService.register,
  });
  // static forgotPassword = requestHandler({
  //   validator: ForgotPasswordValidator,
  //   handler: AuthService.forgotPassword,
  // });

  // static resetPassword = requestHandler({
  //   validator: ResetPasswordValidator,
  //   handler: AuthService.resetPassword,
  // });

  static logout = requestHandler({
    validator: LogoutValidator,
    handler: AuthService.logout,
  });
};
