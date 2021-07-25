const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseHistory = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Products" },
        name: { type: String },
        primaryPic: { type: String },
        price: { type: Number },
        amount: { type: Number, required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("PurchaseHistory", PurchaseHistory);
