const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  postcord: { type: String, required: true },
  prefecture: { type: String, required: true },
  city: { type: String, required: true },
  streetAddress: { type: String, required: true },
  building: { type: String },
  phoneNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Address", AddressSchema);
