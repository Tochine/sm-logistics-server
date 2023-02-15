/* eslint-disable consistent-return */
const AdminService = require("../../services/admins");

module.exports.register = async (req, res, next) => {
  try {
    const result = await AdminService.createAccount({ 
      ...req.body,
      // createdBy: req.session.account._id,
     });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const result = await AdminService.loginAdmin({ ...req.body });

    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getItemsAwaitingApproval = async (req, res, next) => {
  try {
    const result = await AdminService.getItemsAwaitingApproval()

    return res.send({
      status: "success",
      result
    });
  } catch (error) {
    next(error);
  }
}

module.exports.createItemCategory = async (req, res, next) => {
  try {
    const result = await AdminService.createItemCategory({
      ...req.body
    });

    return res.send({
      status: "success",
      result
    })
  } catch (error) {
    next(error);
  }
}

module.exports.getItemCategories = async (req, res, next) => {
  try {
    const result = await AdminService.getItemCategories();

    return res.send({
      status: "success",
      result
    })
  } catch (error) {
    next(error);
  }
}

module.exports.createItemWeight = async (req, res, next) => {
  try {
    const result = await AdminService.createItemWeight({
      ...req.body
    });

    return res.send({
      status: "success",
      result
    })
  } catch (error) {
    next(error);
  }
}