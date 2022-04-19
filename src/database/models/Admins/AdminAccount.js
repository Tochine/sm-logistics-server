const mongoose = require("mongoose");
const timestamp = require("../plugins/timestamp");

const adminAccountSchema = new mongoose.Schema({
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

  profileImage: {
    type: String,
  },

  profileImagePath: {
    type: String,
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

  isVerified: {
    type: Boolean,
    default: false,
  },

  verifiedAt: {
    type: Date,
  },

  lastLoggedIn: {
    type: Date,
    default: new Date(),
  },

  sessionID: {
    type: String,
  },

  profileImage: { type: String },

  emailVerificationToken: { type: String },
});

adminAccountSchema.plugin(timestamp);

const adminAccountModel = mongoose.model("AdminAccount", adminAccountSchema);

module.exports = adminAccountModel;
