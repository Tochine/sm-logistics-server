const requestHandler = require("../../providers/RequestHandler");
const RidersAccountService = require("../../services/riders");
const { GetRiderCoordinates } = require("../../validators/riders/account");
const { RiderUpdateProfileValidator, GetKycValidator } = require("../../validators/riders/account");
const {
  GetRiderAccounValidator,
  GetRidersHistoryValidator,
  ChangeAccountPasswordValidator
} = require("../../validators");

class RidersAccountController {
  static getRiderAccount = requestHandler({
    validator: GetRiderAccounValidator,
    handler: RidersAccountService.account.getRiderAccount,
  });

  static updateRiderAccount = requestHandler({
    validator: RiderUpdateProfileValidator,
    handler: RidersAccountService.account.updateRiderAccount
  });

  static getRiderHistory = requestHandler({
    validator: GetRidersHistoryValidator,
    handler: RidersAccountService.account.getRiderHistory,
  });

  static storeRiderCoordinates = requestHandler({
    validator: GetRiderCoordinates,
    handler: RidersAccountService.account.getCoordinates,
  });

  static passportKyc = requestHandler({
    validator: GetKycValidator,
    handler: RidersAccountService.Kyc.verifyPassport
  });

  // static verifyEmail = requestHandler({
  //   validator: RegisterValidator,
  //   handler: RidersAccountService.verifyEmail,
  // });

  // static changeAccountPassword = requestHandler({
  //   validator: ChangeAccountPasswordValidator,
  //   handler: RidersAccountService.changeAccountPassword
  // })
}

module.exports = RidersAccountController;
