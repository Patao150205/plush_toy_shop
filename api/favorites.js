const FavoritesModel = require("../models/FavoritesModel");
const router = require("express").Router();
const auth = require("../middleware/verificationAuth");

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
      console.log(data);
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
  console.log(productId);
  try {
    const data = await FavoritesModel.findOneAndUpdate(
      { user: userId },
      { $push: { products: [{ product: productId }] } }
    );
    const target = data.products.find((product) => product._id === productId);
    res.json(target._id);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/favorites
// @desc お気に入りの削除
// @access Private
router.delete("/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;
  console.log(productId);
  try {
    const data = await FavoritesModel.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
    console.log("ここよおお", data);
    res.send("お気に入りから削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
