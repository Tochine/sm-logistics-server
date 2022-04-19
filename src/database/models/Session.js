const mongoose = require("mongoose");

const { Schema } = mongoose;
const uuid = require("uuid");

const sessionSchema = new Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  accountId: {
    type: String,
  },
  expires: {
    type: Date,
  },
  ip: {
    type: String,
  },
  initiatedAt: {
    type: Date,
  },
  token: {
    type: String,
  },
}, { timestamps: true });

const sessionModel = mongoose.model("Session", sessionSchema);
module.exports = sessionModel;
