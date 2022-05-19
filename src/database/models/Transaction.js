const mongoose = require("mongoose");

const tranxSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  itemId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  riderId: {
    type: mongoose.Types.ObjectId,
  },

  tranxId: { type: String },

  reference: {
    type: String,
  },

  orderNo: {
    type: String,
    unique: true,
  },

  estimatedDeliveryTime: { type: String },

  approvedBy: {
    type: mongoose.Types.ObjectId,
  },

  deliveryStatus: {
    type: String,
  },

  status: { type: String },

  paidAt: { type: Date },

  channel: { type: String },

  currency: { type: String },

  total: {
    type: Number,
    default: 0,
  },

  isApprovedByAdmin: {
    type: Boolean,
  },

  rejectionReason: { type: String },

  ip: { type: String },
}, { timestamps: true });

const tranxModel = mongoose.model("transaction", tranxSchema);
module.exports = tranxModel;
