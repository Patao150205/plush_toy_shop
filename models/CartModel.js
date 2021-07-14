const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
      amount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
