const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Products" },
        amount: { type: Number, required: true },
      },
    ],
    updatedAt: { type: Date, index: { expires: 3600 } },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
