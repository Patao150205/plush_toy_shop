const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    productPic: { type: [String], required: true, max: 5 },
    price: { type: Number, required: true },
    size: {
      width: { type: String, required: true },
      height: { type: String, required: true },
      deepth: { type: String, required: true },
    },
    isNew: { type: Boolean, default: true },
    isHot: { type: String, default: false },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductsSchema);
