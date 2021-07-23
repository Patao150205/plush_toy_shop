const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseHistory = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    order: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Products" },
        amount: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("PurchaseHistory", PurchaseHistory);
