const models = require("../../database/models");
const { ServiceError } = require("../../exceptions");
const omit = require("lodash/omit");

class Dashboard {
  static getDashboard = async () => {
    // const account = await models.AdminsAccount.findById(accountId);
    // if(!account) throw new ServiceError("account not found")

    // const session = await models.Session.findOne({ _id: account.sessionID });
    // if(!session) throw new ServiceError("no session found");

    const items = await models.Items.countDocuments();

    const inProgress = await models.Items.countDocuments({ status: "progress" });

    const delivered = await models.Items.countDocuments({ status: "completed" });

    const cancelled = await models.Items.countDocuments({ status: "cancelled" });

    return {
      totalShipment: items,
      onGoingDelivery: inProgress,
      delieverdShipment: delivered,
      failedDelieveries: cancelled
    }
  }

  static getItems = async () => {
    // const account = await models.AdminsAccount.findById(accountId);
    // if(!account) throw new ServiceError("account not found")

    // const session = await models.Session.findOne({ _id: account.sessionID });
    // if(!session) throw new ServiceError("no session found");

    let result = [];

    const items = await models.Items.find().sort({ createdAt: 1}).limit(8);
    for (const data of items) {
      const rider = await models.RidersAccount.findById(data.riderId).select(['firstName', 'lastName'])
      result.push({rider})
    }

    // items.push({rider})
    // const rider = await models.RidersAccount.findById(items.riderId).select(['firstName', 'lastName']);

    return {
      items: items 
    };
    
  }

  static singleItem = async ({itemID}) => {
    const item = await models.Items.findById(itemID);
    if(!item) throw new ServiceError("no item fount");

    const tranx = await models.Transaction.findOne({ itemId: item._id}).selected(["total"]);
    const rider = await models.RidersAccount.findById(tranx.riderId).select(["firstName", "lastName"]);

    return {
      ...item,
      ...tranx,
      ...rider
    }
    
  }

  static clients = async () => {
    const clients = await models.Account.find().select(["firstName", "lastName", "phoneNumber", "email"]).sort({ createdAt: 1});
    if (!clients) throw new ServiceError("no clients found")
    
    return clients;
  }

  static singleClient = async ({ clientID }) => {
    const client = await models.Account.findById(clientID);
    if (!client) throw new ServiceError("no client found");

    return {
      client: omit(client.toObject(),["password", "__v", "passwordResetToken"] )
    };
  }

  static getRiders = async () => {
    const riders = await models.RidersAccount.find().select(["firstName", "lastName", "email"]).sort({ createdAt: 1});
    if (!riders) throw new ServiceError("no riders found")
    
    return riders;
  }

  static singleRider = async ({ riderID }) => {
    const rider = await models.RidersAccount.findById(riderID);
    if (!rider) throw new ServiceError("no client found");

    return {
      client: omit(rider.toObject(),["password", "__v", "passwordResetToken"] )
    };
  }

}

module.exports = Dashboard