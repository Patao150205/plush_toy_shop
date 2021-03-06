const router = require("express").Router();
const auth = require("../middleware/verificationAuth");
const Stripe = require("stripe");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const ProductsModel = require("../models/ProductsModel");
const PurchaseHistoryModel = require("../models/PurchaseHistoryModel");
const AddressModel = require("../models/AddressModel");

const stripe = new Stripe(process.env.STRIPE_SECRET);

// @route POST api/settlement
// @desc 決済処理を行う
// @access Private
let session;
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    // カートの日付token
    const { token, sumPrice, eachAmount } = req.body;
    const address = await AddressModel.exists({ user: userId });
    if (!address) return res.status(404).send("住所登録を行ってください。");
    // カートが新たに更新されていないかを確認する
    const data = await CartModel.findOne({ user: userId }).select("updatedAt");
    if (!data) return res.status(404).send("カートの中身がありません");

    const isSameCart = await bcrypt.compare(data.updatedAt.toString(), token);

    if (isSameCart) {
      // カートが更新されていなかった
      const cart = await CartModel.findOne({ user: userId }).populate("products.product");
      const { products } = cart;

      session = await mongoose.startSession();
      session.startTransaction();
      await eachAmount.forEach(async (prod) => {
        const stock = parseInt(-prod.amount);
        await ProductsModel.findByIdAndUpdate(prod._id, { $inc: { stock: stock } }, { session });
      });
      await CartModel.findOneAndDelete({ user: userId }, { session });
      const productsData = products.map((prod) => {
        return {
          _id: prod.product._id,
          name: prod.product.name,
          primaryPic: prod.product.primaryPic,
          price: prod.product.price,
          amount: prod.amount,
        };
      });
      const ObjectId = mongoose.Types.ObjectId();
      await OrderModel.create([{ _id: ObjectId, user: userId, products: productsData }], { session });
      await PurchaseHistoryModel.create([{ orderId: ObjectId, user: userId, products: productsData }], { session });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: sumPrice,
        currency: "jpy",
      });

      res.json({ client_secret: paymentIntent.client_secret });
    } else {
      // カートが更新されため
      res.status(302).send("カートが更新されたため、ご注文確認画面へ");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー。もう一度お試しください。もしくはしばらくしてからお試しください。");
  }
});

// @route POST api/settlement/commit
// @desc 一連の在庫処理をコミット
// @access Private
router.post("/commit", async (req, res) => {
  try {
    await session.commitTransaction();
    res.send("在庫処理をコミットしました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/settlement/rollback
// @desc 一連の在庫処理をロールバック
// @access Private
router.post("/rollback", async (req, res) => {
  try {
    if (session) await session.abortTransaction();
    session = undefined;
    res.send("在庫処理をロールバックしました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
