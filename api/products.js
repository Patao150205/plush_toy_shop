const ProductsModel = require("../models/ProductsModel");
const router = require("express").Router();
const extractSerachQuery = require("../serverUtils/searchQueryCondition");
const extractSortQuery = require("../serverUtils/sortQueryCondition");
const auth = require("../middleware/verificationAuth");
const root = require("../middleware/isRootUser");
const PurchaseHistoryModel = require("../models/PurchaseHistoryModel");
const OrderModel = require("../models/OrderModel");
const AddressModel = require("../models/AddressModel");
const CartModel = require("../models/CartModel");

// @route GET api/products
// @desc 商品一覧の取得
// @access Public
router.get("/", async (req, res) => {
  const q = req.query;
  const skipCount = q.p ? 20 * (q.p - 1) : 0;
  let search = extractSerachQuery(q);
  const sort = extractSortQuery(q);

  try {
    const data = await ProductsModel.find(search)
      .skip(skipCount)
      .limit(20)
      .sort(sort)
      .select("name primaryPic price New Hot height isRelease");
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

// @route GET api/products/root
// @desc 商品一覧の取得(管理者用),リリースされていない商品も表示します。
// @access Private
router.get("/root", auth, root, async (req, res) => {
  const q = req.query;
  const skipCount = q.p ? 20 * (q.p - 1) : 0;
  let search = extractSerachQuery(q);
  const sort = extractSortQuery(q);
  delete search.isRelease;

  try {
    const data = await ProductsModel.find(search)
      .skip(skipCount)
      .limit(20)
      .sort(sort)
      .select("name primaryPic price New Hot height isRelease");
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

// @route POST api/products/modification
// @desc 商品情報の編集
// @access Private
router.post("/modification", auth, root, async (req, res) => {
  try {
    console.log(req.body, "なあが");
    const { stock, isRelease, _id } = req.body;
    const product = await ProductsModel.findById(_id);
    const { stock: prevStock, isRelease: prevIsRelease } = product;

    // いずれかの場合、該当商品を顧客のカートから削除する。
    // ①更新する在庫数が、現在の在庫数よりも小さくなる場合
    // ②現在リリース中のものを、キープの状態にする場合
    const conditions = prevStock > stock || (prevIsRelease === true && isRelease === false);
    if (conditions) {
      await CartModel.updateMany({}, { $pull: { products: { product: _id } } }, { multi: true });
      console.log("削除成功です。");
    }

    await ProductsModel.findByIdAndUpdate(_id, { ...req.body });

    res.send("商品情報の編集に成功しました。");
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
    await CartModel.updateMany({}, { $pull: { products: { product: productId } } }, { multi: true });
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

// @route GET api/products/search
// @desc 商品履歴の取得
// @access Private
router.get("/history", auth, async (req, res) => {
  const { userId } = req;
  const { p } = req.query;
  const skip = p ? 2 * (p - 1) : 0;
  try {
    const histories = await PurchaseHistoryModel.find({ user: userId }).limit(2).skip(skip).sort({ createdAt: -1 });
    const orderCount = await PurchaseHistoryModel.countDocuments();
    res.json({ histories, orderCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route GET api/products/search
// @desc 発注リストの取得
// @access Private root
router.get("/order", auth, root, async (req, res) => {
  const { p } = req.query;
  const skip = p ? 2 * (p - 1) : 0;
  try {
    const orders = await OrderModel.find().limit(2).skip(skip).sort({ createdAt: -1 }).populate("user");
    const userIds = orders.map((order) => {
      return { user: order.user._id };
    });

    const addresses = await AddressModel.find({ $or: userIds });
    console.log(addresses);
    const orderCount = await OrderModel.countDocuments();

    const orderAndEmail = orders.map((order) => {
      const address = addresses.find((address) => order.user._id.toString() === address.user.toString());
      return {
        address,
        order,
      };
    });

    res.json({ orders: orderAndEmail, orderCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
