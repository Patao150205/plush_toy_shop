const ProductsModel = require("../models/ProductsModel");
const router = require("express").Router();
const auth = require("../middleware/verificationAuth");

// @route GET api/product/:productId
// @desc 商品情報の取得
// @access Public
router.get("/:productId", async (req, res) => {
  try {
    const product = await ProductsModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("商品情報が見つかりませんでした。");
    }
    console.log("ここです。", product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
  res.json(product);
});

module.exports = router;
