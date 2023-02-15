const mongoose = require("mongoose");

const { Schema } = mongoose;
const timestamp = require("./plugins/timestamp");

const itemWeightSchema = new Schema({
  start: {
    type: Number,
    unique: true,
  },
  end: {
    type: Number,
    unique: true
  }
});

itemWeightSchema.plugin(timestamp);

const itemModel = mongoose.model("ItemWeight", itemWeightSchema);
module.exports = itemModel;
