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

  isVerified: {
    type: Boolean,
    default: false,
  },

  verifiedAt: {
    type: Date,
  },

  ip: {
    type: String,
  },

  loginCount: {
    type: Number,
    default: 0,
  },

  lastLoggedIn: {
    type: Date,
    default: new Date(),
  },

  completionStatus: {
    type: Boolean,
    default: false,
  },

  profileImage: {
    name: { type: String },
    path: { type: String },
  },

  // userType: {
  //   type: String,
  //   enum: ["rider", "client"],
  //   default: "client",
  // },

  emailVerificationToken: { type: String },
});

accountSchema.plugin(timestamp);

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;