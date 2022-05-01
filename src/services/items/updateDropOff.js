const { ObjectId } = require("mongoose").Types;
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { string, any } = require("../../validationTypes");
const models = require("../../database/models");
const { geoCoder } = require("../../providers/geoCoder");
const { calcCrow } = require("../../providers/calc");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    dropOffId: { ...any },
    to: { ...string },
    from: { ...string },
    recipientFullName: { ...string },
    recipientPhoneNumber: { ...string },
    note: { ...string },
  },

  async handler(params) {
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const dropOff = await models.Items.findById(params.dropOffId);
    if (!dropOff) {
      throw new ServiceError("Items does not exist");
    }

    // Pick up address
    const result1 = await geoCoder().geocode(params.from);
    const pickUpAddress = result1.map((item) => ({
      formattedAddress: item.formattedAddress,
      lat: item.latitude,
      long: item.longitude,
    }));

    dropOff.from.formattedAddress = pickUpAddress[0].formattedAddress;
    dropOff.from.lat = pickUpAddress[0].lat;
    dropOff.from.long = pickUpAddress[0].long;

    // delivery address
    const result2 = await geoCoder().geocode(params.to);

    const deliveryAddress = result2.map((item) => ({
      formattedAddress: item.formattedAddress,
      lat: item.latitude,
      long: item.longitude,
    }));

    dropOff.to.formattedAddress = deliveryAddress[0].formattedAddress;
    dropOff.to.lat = deliveryAddress[0].lat;
    dropOff.to.long = deliveryAddress[0].long;

    dropOff.recipientFullName = params.recipientFullName;
    dropOff.recipientPhoneNumber = params.recipientPhoneNumber;
    dropOff.note = params.note;

    const distance = calcCrow(
      dropOff.from.lat,
      dropOff.from.long,
      dropOff.to.lat,
      dropOff.to.long,
    );

    dropOff.distance = distance.toFixed(3);

    const pricePerKM = 100;
    const totalPrice = pricePerKM * distance;

    dropOff.price = totalPrice.toFixed(0);

    (dropOff.status = "saved");
    dropOff.save();

    const arr = [];

    for (const data of dropOff.items) {
      const itemCategory = await models.ItemCategory.findOne({
        _id: data.categoryId,
      });
      const itemWeight = await models.ItemWeight.findOne({
        _id: data.weightId,
      });
      arr.push({ itemCategory, itemWeight });
    }
    const result = { ...dropOff._doc, items: arr };

    return { data: result };
  },
});
