const mongoose = require("mongoose");
// const timestamp = require("./plugins/timestamp");

const itemsSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    items: [
      {
        categoryId: {
          type: mongoose.Types.ObjectId,
          ref: "ItemCategory",
        },
        weightId: {
          type: mongoose.Types.ObjectId,
          ref: "ItemWeight",
        },
        quantity: {
          type: Number,
        },
      },
    ],

    // itemStatus: {
    //   type: String,
    //   default: "saved",
    // },

    to: {
      lat: { type: String },
      long: { type: String },
      formattedAddress: { type: String },
    },

    from: {

      lat: { type: String },
      long: { type: String },
      formattedAddress: { type: String },
    },

    paymentRef: { type: String },

    distance: { type: String },

    // amount: { type: Number },

    recipientFullName: { type: String },

    recipientPhoneNumber: { type: String },

    note: { type: String },

    type: {
      type: String,
      enum: ["express", "scheduled"],
    },

    price: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      enum: ["draft", "submited"],
      defaultValue: "draft",
    },
    status: {
      type: String,
      enum: ["completed", "saved", "progress", "cancelled"],
    },
    timeline: {
      type: Date,
    },

    confirmation: {
      boolean: false,
    },
  },
  { timestamps: true },
);

const Items = mongoose.model("Item", itemsSchema);

module.exports = Items;
