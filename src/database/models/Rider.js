const mongoose = require("mongoose");
const timestamp = require("./plugins/timestamp");
const AccountModel = require("./Account");

const riderAccountSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Types.ObjectId,
    ref: AccountModel,
  },

  loginStatus: {
    type: Boolean,
    default: false,
  },

  coordinates: {
    lat: { type: Number },
    long: { type: Number },
  },

  profileImage: {
    name: { type: String },
    path: { type: String },
  },

  emailVerificationToken: { type: String },

  socialMedia: { type: String },

  resumptiondate: { type: Date },

  locations: [String],
});

riderAccountSchema.plugin(timestamp);

const riderAccountModel = mongoose.model("Rider", riderAccountSchema);

module.exports = riderAccountModel;
