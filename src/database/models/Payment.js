const mongoose = require("mongoose");

const { Schema } = mongoose;
const timestamp = require("./plugins/timestamp");

const paymentSchema = new Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },

  ownerName: {
    type: String,
  },

  bvn: {
    type: String,
  },

  cardDetails: [
    {
      // uuid: { type: String },

      bankName: { type: String },

      brand: { type: String },

      cardType: { type: String },

      country: { type: String },

      cardNumber: { type: String },

      cvs: { type: Number },

      expiryDate: { type: Date },
    },
  ],
});

paymentSchema.plugin(timestamp);

const paymentCardModel = mongoose.model("PaymentCard", paymentSchema);

module.exports = paymentCardModel;
