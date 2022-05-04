const models = require("../../database/models");
const omit = require("lodash/omit");
const { ServiceError } = require("../../exceptions");
const { calcCrow } = require("../../providers/calc");

class Payment {
  static confirmPayment = async ({ refNo, itemID}, req) => {
    const item = await models.Items.findById(itemID);
    if (!item) throw new ServiceError("no item found");

    const ref = await models.Transaction.findOneAndUpdate(
      {reference: refNo},
      {approvedBy: req.session.account._id},
      {status: "in progress"},
      {new: true}
    );

  const riders = models.RidersAccount.find({ loginStatus: true });
  const ridersToClient = riders.map((rider) => {
    return {
      ...rider,
      distance: calcCrow(
        rider.coordinates.lat,
        rider.coordinates.long,
        item.to.lat,
        item.to.long
      ),
    };
  });

  const closetRider = ridersToClient.sort((a, b) => a.distance - b.distance )[0]

    return {
      tranx: ref,
      item: omit(item.toObject(), ["items", "v", "to", "from", ]),
      rider: closetRider
    };
  }
}

module.exports = Payment;