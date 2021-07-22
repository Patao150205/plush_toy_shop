const router = require("express").Router();
const CartModel = require("../models/CartModel");
const ProductsModel = require("../models/ProductsModel");
const mongoose = require("mongoose");
const auth = require("../middleware/verificationAuth");
const { getStockList } = require("../serverUtils/getStockList");
const bcrypt = require("bcrypt");

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
      if (!data) {
        return res.json({ cart: [], updatedAt: null });
      }
    } else {
      data = await CartModel.findOne({ user: userId });
      if (!data) {
        return res.json({ cart: [], updatedAt: null });
      }
    }
    console.log(data.updatedAt, "アップデート");

    // ハッシュ化したカートの最終更新日を返す。
    const updatedAtHash = await bcrypt.hash(data.updatedAt.toString(), 10);
    console.log(data.products, updatedAtHash);
    res.json({ cart: data.products, updatedAt: updatedAtHash });
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
    const { totalStock } = await getStockList(productId);

    if (amount > totalStock) {
      return res.status(400).send("在庫情報が更新されました。");
    }
    const hasCart = await CartModel.exists({ user: userId });

    const _id = mongoose.Types.ObjectId().toString();
    if (!hasCart) {
      const newCart = new CartModel({
        user: userId,
        products: [{ _id, product: productId, amount: parseInt(amount) }],
      });
      await newCart.save();
    } else {
      await CartModel.findOneAndUpdate(
        { user: userId },
        { $push: { products: [{ _id, product: productId, amount: parseInt(amount) }] } }
      );
    }
    res.json(_id);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/cart/count/:productId
// @desc カートの個別商品の数量を変更
// @access Private
router.post("/count/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.userId;
  const { newAmmount } = req.body;

  try {
    const { totalStock, cartStock, productStock } = await getStockList(productId);

    const myCartProduct = await CartModel.findOne({
      user: userId,
    }).select("products");

    // 今現在カートにある、ある商品の在庫数
    console.log(myCartProduct);
    const target = myCartProduct.products.find((prod) => prod.product.toString() === productId);

    console.log(target);
    // すべての在庫数を超えないかをチェックする。(マイナスになってしまわないかチェック)
    const result = cartStock - target.amount + newAmmount;

    // 現在取りうる事のできる在庫数
    const stock = totalStock + target.amount;
    if (result > productStock) {
      return res.status(400).send("在庫が更新されました");
    }

    await CartModel.findOne({ user: userId }).updateOne(
      { products: { $elemMatch: { product: productId } } },
      { $set: { "products.$.amount": newAmmount } }
    );

    res.json(stock);
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
  try {
    await CartModel.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
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
