const UserModel = require("../models/UserModel");
const FavoritesModel = require("../models/FavoritesModel");
const CartModel = require("../models/CartModel");
const router = require("express").Router();
const auth = require("../middleware/verificationAuth");
const mongoose = require("mongoose");

// @route GET api/user
// @desc ユーザー情報の取得
// @access Public
router.get("/", auth, async (req, res) => {
  const { userId } = req;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).send("ユーザが存在しません。");
  }
  const favorites = await FavoritesModel.findOne({ user: user._id }).select("products");
  const cart = await CartModel.findOne({ user: user._id }).select("products");
  const data = {
    userInfo: user,
    favorites: favorites.products,
    cart: cart.products,
  };
  res.json(data);
});

module.exports = router;
