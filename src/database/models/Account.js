const mongoose = require("mongoose");
const timestamp = require("./plugins/timestamp");

const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },

  passwordResetToken: {
    type: String,
  },

  passwordResetExpires: {
    type: Date,
  },

  otp: {
    type: String,
  },

  emailIsVerified: {
    type: Boolean,
    default: false,
  },

  emailVerifiedAt: {
    type: Date,
  },

  lastLoggedIn: {
    type: Date,
    default: new Date(),
  },

  otp: {
    type: String,
  },

  profileImage: {
    name: { type: String },
    path: { type: String },
  },

  completionStatus: {
    type: Boolean,
    default: false,
  },

  loginCount: {
    type: Number,
    default: 0,
  },

  userType: {
    type: String,
    enum: ["rider", "client"],
    default: "client",
  },

});

accountSchema.plugin(timestamp);

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
