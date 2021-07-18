const FavoritesModel = require("../models/FavoritesModel");
const router = require("express").Router();
const auth = require("../middleware/verificationAuth");
const mongoose = require("mongoose");

// @route GET api/favorites
// @desc お気に入り商品の情報取得
// (isDetailedクエリがtrueで、商品詳細も取得)
// @access Private
router.get("/", auth, async (req, res) => {
  const isDetailed = req.query.detailed === "true";
  const { userId } = req;

  try {
    let data;
    if (isDetailed) {
      data = await FavoritesModel.findOne({ user: userId }).populate("products.product");
    } else {
      data = await FavoritesModel.findOne({ user: userId });
    }
    res.json(data.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/favorites/:productId
// @desc お気に入りに登録
// @access Private
router.post("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;
  try {
    const _id = mongoose.Types.ObjectId().toString();
    await FavoritesModel.findOneAndUpdate({ user: userId }, { $push: { products: [{ _id, product: productId }] } });
    res.json(_id);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/favorites
// @desc お気に入りの削除(商品ID)
// @access Private
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;
  try {
    await FavoritesModel.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
    res.send("お気に入りから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/favorites
// @desc お気に入りの削除(お気に入りID)
// @access Private
router.delete("/_id/:favoriteId", auth, async (req, res) => {
  const { favoriteId } = req.params;
  const { userId } = req;
  try {
    await FavoritesModel.updateOne({ user: userId }, { $pull: { products: { _id: favoriteId } } });
    res.send("お気に入りから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
