const requestHandler = require("../../providers/RequestHandler");
const AdminService = require("../../services/admins/auth");
// const AdminServices = require("../../services/admins/dashboard");
const PaymentType = require("../../services/admins/paymentType");
const AdminServices = require("../../services/admins");
const {
  LoginValidator,
  RegisterValidator,
  PaymentConfirmationValidator
} = require("../../validators/admins");

module.exports = class AuthController {
  static login = requestHandler({
    validator: LoginValidator,
    handler: AdminService.login,
  });

  static register = requestHandler({
    validator: RegisterValidator,
    handler: AdminService.register,
  });
  
  static async getDashboard(req, res, next) {
    try {
      const result = await AdminServices.dashboard.getDashboard()
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  static async getItems(req, res, next) {
    try {
      const result = await AdminServices.dashboard.getItems();
      return res.send({
        status: "success",
        data: result
      });
    } catch(error) {
      next(error);
    }
  }

  static async getsingleItem(req, res, next) {
    try {
      const result = await AdminServices.dashboard.singleItem({
        itemID: req.body.itemID
      });
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  static async getPaymentTypes(req, res, next) {
    try{
      const result = await PaymentType.paymentType();
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  static async getClients(req, res, next) {
    try{
      const result = await AdminServices.dashboard.clients();
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  static async getSingleClient(req, res, next) {
    try {
      const result = await AdminServices.dashboard.singleClient({
        clientID: req.body.clientID
      });
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeProfileImage(req, res, next) {
    try {
      const result = await AdminServices.account.profileImage({
        adminID: req.session.account.id,
        file: req.file
      });
      return res.send({
        status: "success",
        data: result
      });
    } catch(error) {
      next(error)
    }
  }


  static async getRiders(req, res, next) {
    try{
      const result = await AdminServices.dashboard.getRiders();
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error)
    }
  }

  
  static async getSingleRider(req, res, next) {
    try {
      const result = await AdminServices.dashboard.singleRider({
        riderID: req.body.riderID
      });
      return res.send({
        status: "success",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }


  static confirmPayment = requestHandler({
    validator: PaymentConfirmationValidator,
    handler: AdminServices.payment.confirmPayment
  })
}