const { ObjectId } = require("mongoose").Types;
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const {
  string, any, array, number,
} = require("../../validationTypes");
const models = require("../../database/models/Index");
const { generateCryptoToken } = require("../../providers/Utilities");
const { geoCoder } = require("../../providers/geoCoder");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    dropOffId: { ...any },
    timeline: { ...string, optional: true },
    items: {
      ...array,
      props: {
        quantity: { ...number, min: 1 },
        weightId: { any },
        categoryId: { any },
      },
    },
    to: { ...string },
    from: { ...string },
    recipientFullName: { ...string },
    recipientPhoneNumber: { ...string },
    note: { ...string },
  },
  async handler(params) {
    // TODO: update instead of storing items again
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const dropOff = await models.Items.findById(params.dropOffId);
    if (!dropOff) {
      throw new ServiceError("Items does not exist");
    }

    const { items } = params;

    const newItems = items.map((item) => ({
      quantity: item.quantity,
      weightId: ObjectId(item.weightId),
      categoryId: ObjectId(item.categoryId),
    }));

    dropOff.items = [];

    await dropOff.save();

    newItems.forEach((item) => {
      dropOff.items.push(item);
    });

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

    dropOff.status = "saved";
    await dropOff.save();

    let tranx;

    const tranxExist = await models.Tranx.findOne({ itemId: dropOff._id });
    if (tranxExist) {
      tranx = await models.fidOneAndUpdate(
        { itemId: params.itemID },
        { total: dropOff.price },
        { status: "saved" },
        { new: true },
      );

      return {
        data: dropOff,
        tranx,
      };
    }

    const code = generateCryptoToken(8);
    const orderNo = `D${code.toUpperCase()}`;

    tranx = await models.Tranx.create({
      orderNo,
      itemId: dropOff._id,
      clientId: dropOff.accountId,
      total: dropOff.price,
      status: "saved",
    });

    return {
      data: dropOff,
      tranx,
    };
  },
});
