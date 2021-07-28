const ProductsModel = require("../models/ProductsModel");
const router = require("express").Router();
const { getStockList } = require("../serverUtils/getStockList");
const auth = require("../middleware/verificationAuth");
const root = require("../middleware/isRootUser");
const OrderModel = require("../models/OrderModel");
const PurchaseHistoryModel = require("../models/PurchaseHistoryModel");

// @route GET api/product/:productId
// @desc 商品情報の取得
// @access Public
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductsModel.findById(productId);
    if (!product) {
      return res.status(404).send("商品情報が見つかりませんでした。");
    }
    // カートに入っている商品数取得
    const { totalStock } = await getStockList(productId);
    res.json({ product, totalStock });
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route GET api/product/stock/:productId
// @desc トータルの在庫数取得
// @access Public
router.get("/stock/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const { totalStock, productStock, cartStock } = await getStockList(productId);
    res.json({ totalStock, productStock, cartStock });
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/product/order/status
// @desc 注文の状態を変更
// @access Private root
router.post("/order/status", auth, root, async (req, res) => {
  const { orderId, status } = req.body;

  await OrderModel.findByIdAndUpdate(orderId, { $set: { status } });
  await PurchaseHistoryModel.findOneAndUpdate(orderId, { $set: { status } });

  try {
    res.send("注文の状態を変更しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
