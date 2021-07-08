const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    productsPic: {
      type: [String],
      required: true,
      max: 5,
      default: [
        "https://res.cloudinary.com/dqzhjmrwo/image/upload/v1625704122/blush_toy_shop/kqrzogaik3zgmlm1laio.jpg",
      ],
    },
    price: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    deepth: { type: Number, required: true },
    New: { type: Boolean, default: true },
    Hot: { type: Boolean, default: false },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductsSchema);
