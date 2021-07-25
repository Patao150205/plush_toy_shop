const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId },
        name: { type: String },
        primaryPic: { type: String },
        price: { type: Number },
        amount: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

OrderSchema.index({ user: 1 });

module.exports = mongoose.model("Order", OrderSchema);
