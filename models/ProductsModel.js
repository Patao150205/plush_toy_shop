const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noImg = "https://res.cloudinary.com/dqzhjmrwo/image/upload/v1625704122/blush_toy_shop/kqrzogaik3zgmlm1laio.jpg";

const ProductsSchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    productPic: {
      type: [String],
      max: 5,
      default: [noImg],
    },
    primaryPic: { type: String, default: noImg },
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
