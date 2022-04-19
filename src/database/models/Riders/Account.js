const mongoose = require("mongoose");
const timestamp = require("../plugins/timestamp");

const riderAccountSchema = new mongoose.Schema({
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

  coordinated: {
    lat: { type: String },
    long: { type: String },
  },

  passwordResetExpires: {
    type: Date,
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

  lastLoggedIn: {
    type: Date,
    default: new Date(),
  },

  loginStatus: {
    type: Boolean,
    default: false,
  },

  coordinates: {
    lat: { type: Number },
    long: { type: Number },
  },

  completionStatus: {
    type: Boolean,
    default: false,
  },

  profileImage: { type: String },

  // userType: {
  //   type: String,
  //   enum: ["rider", "client"],
  //   default: "client",
  // },

  emailVerificationToken: { type: String },
});

riderAccountSchema.plugin(timestamp);

const riderAccountModel = mongoose.model("RiderAccount", riderAccountSchema);

module.exports = riderAccountModel;
