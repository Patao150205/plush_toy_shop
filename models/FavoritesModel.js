const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
    },
  ],
});

module.exports = mongoose.model("Favorites", FavoritesSchema);
