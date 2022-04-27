const mongoose = require("mongoose");

const AccountModel = require("./Account");

const schema = new mongoose.Schema({
  accountId: {
    type: mongoose.Types.ObjectId,
    ref: AccountModel,
  },

  otp: { 
    type: String,
    unique: true
  },

  loginCount: {
    type: Number,
    default: 0,
  },

  profileImage: {
    name: { type: String },
    path: { type: String },
  },
}, { timestamps: true });

const riderAccountModel = mongoose.model("client", schema);

module.exports = riderAccountModel;
