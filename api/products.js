const ProductsModel = require("../models/ProductsModel");
const router = require("express").Router();
const extractSerachQuery = require("../serverUtils/searchQueryCondition");
const extractSortQuery = require("../serverUtils/sortQueryCondition");
const auth = require("../middleware/verificationAuth");
const root = require("../middleware/isRootUser");

// @route GET api/products
// @desc 商品一覧の取得
// @access Public
router.get("/", async (req, res) => {
  const q = req.query;
  const skipCount = q.p ? 20 * (q.p - 1) : 0;
  const search = extractSerachQuery(q);
  const sort = extractSortQuery(q);
  try {
    const data = await ProductsModel.find(search)
      .skip(skipCount)
      .limit(20)
      .sort(sort)
      .select("name primaryPic price New Hot height");
    const count = await ProductsModel.find(search).countDocuments();
    const sendData = {
      products: data,
      count,
    };
    res.json(sendData);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/products
// @desc 商品情報の登録
// @access Private
router.post("/", auth, root, async (req, res) => {
  try {
    const product = new ProductsModel({
      ...req.body,
    });
    await product.save();
    res.send("商品情報の登録に成功しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route DELETE api/products
// @desc 商品情報の削除
// @access Private
router.delete("/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    await ProductsModel.findByIdAndDelete(productId);
    res.send("商品情報を削除しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route GET api/products/search
// @desc 商品情報の検索
// @access Public
router.get("/search", async (req, res) => {
  try {
    const keyword = new RegExp(`.*${req.query.keyword}.*`);
    const products = await ProductsModel.find({ name: keyword }).limit(20).select("name primaryPic");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
