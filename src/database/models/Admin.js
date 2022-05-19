const mongoose = require("mongoose");
const timestamp = require("./plugins/timestamp");

const adminAccountSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  profileImage: {
    name: { type: String },
    path: { type: String },
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

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },

  role: {
    type: mongoose.Types.ObjectId
  }

});

adminAccountSchema.plugin(timestamp);

const adminModel = mongoose.model("Admin", adminAccountSchema);

module.exports = adminModel;
