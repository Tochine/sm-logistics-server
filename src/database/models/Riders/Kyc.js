const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  passport: {
    key: { type: String },
    path: { type: String },
    status: {
      type: Boolean,
      defaultValue: false,
    },
    isApproved: {
      type: Boolean,
      defaultValue: false,
    },
  },

  driversLicense: {
    key: { type: String },
    path: { type: String },
    status: {
      type: Boolean,
      defaultValue: false,
    },
    isApproved: {
      type: Boolean,
      defaultValue: false,
    },
  },

  nationalId: {
    key: { type: String },
    path: { type: String },
    status: {
      type: Boolean,
      defaultValue: false,
    },
    isApproved: {
      type: Boolean,
      defaultValue: false,
    },
  },

  status: { type: String },

}, { timestamps: true });

const kycModel = mongoose.model("RiderKyc", kycSchema);
module.exports = kycModel;
