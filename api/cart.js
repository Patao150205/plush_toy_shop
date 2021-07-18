const router = require("express").Router();
const CartModel = require("../models/CartModel");
const mongoose = require("mongoose");
const auth = require("../middleware/verificationAuth");

// @route GET api/cart
// @desc カートの情報取得
// (isDetailedクエリがtrueで、商品詳細も取得)
// @access Private
router.get("/", auth, async (req, res) => {
  const isDetailed = req.query.detailed === "true";
  const { userId } = req;

  try {
    let data;
    if (isDetailed) {
      data = await CartModel.findOne({ user: userId }).populate("products.product");
      console.log(data);
    } else {
      data = await CartModel.findOne({ user: userId });
    }
    res.json(data.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/cart/:productId
// @desc カートに商品追加
// @access Private
router.post("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { amount } = req.body;
  const { userId } = req;
  try {
    const _id = mongoose.Types.ObjectId().toString();
    await CartModel.findOneAndUpdate(
      { user: userId },
      { $push: { products: [{ _id, product: productId, amount: parseInt(amount) }] } }
    );
    res.json(_id);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/cart/:productId
// @desc カートの商品削除(商品ID)
// @access Private
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;
  console.log(productId);
  try {
    const data = await CartModel.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
    console.log("ここよおお", data);
    res.send("カートから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/cart/_id/cartId
// @desc カートの商品削除(カートID)
// @access Private
router.delete("/_id/:cartId", auth, async (req, res) => {
  const { cartId } = req.params;
  const { userId } = req;
  try {
    await CartModel.updateOne({ user: userId }, { $pull: { products: { _id: cartId } } });
    res.send("お気に入りから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
