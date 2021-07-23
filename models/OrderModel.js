const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Products" },
        amount: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
