const router = require("express").Router();
const CartModel = require("../models/CartModel");

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
  console.log(amount);
  try {
    const data = await CartModel.findOneAndUpdate(
      { user: userId },
      { $push: { products: [{ product: productId, amount: parseInt(amount) }] } }
    );
    const target = data.products.find((product) => product._id === productId);
    res.json(target._id);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/:productId
// @desc カートの商品削除
// @access Private
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;
  console.log(productId);
  try {
    const data = await FavoritesModel.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
    console.log("ここよおお", data);
    res.send("カートから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
