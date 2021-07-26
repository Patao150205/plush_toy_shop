const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noImg = "/noimg.jpg";

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
    New: { type: Boolean },
    Hot: { type: Boolean },
    stock: { type: Number, required: true },
    isRelease: { type: Boolean },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Products", ProductsSchema);
