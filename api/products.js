const ProductsModel = require("../models/ProductsModel");

const router = require("express").Router();

// @route POST api/products
// @desc 商品情報の登録
// @access Private
router.post("/", async (req, res) => {
  const product = new ProductsModel({
    ...req.body,
  });

  try {
    await product.save();
    res.send("商品情報の登録に成功しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/products
// @desc 商品情報の登録
// @access Private
router.delete("/", async (req, res) => {
  try {
    await ProductsModel.findOneAndDelete();
    res.send("商品情報を削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route GET api/products
// @desc 商品情報の取得
// @access Public
router.get("/", (req, res) => {
  try {
    const products = await ProductsModel.sort({ createdAt: -1 }).find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});
