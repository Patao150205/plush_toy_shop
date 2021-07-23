const router = require("express").Router();
const auth = require("../middleware/verificationAuth");
const Stripe = require("stripe");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const ProductsModel = require("../models/ProductsModel");
const PurchaseHistoryModel = require("../models/PurchaseHistoryModel");

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
    // カートが新たに更新されていないかを確認する
    const data = await CartModel.findOne({ user: userId }).select("updatedAt");
    if (!data) {
      return res.status(404).send("カートの中身がありません");
    }
    const isSameCart = await bcrypt.compare(data.updatedAt.toString(), token);

    if (isSameCart) {
      // カートが更新されていなかった
      const cart = await CartModel.findOne({ user: userId });
      const { products } = cart;
      session = await mongoose.startSession();
      session.startTransaction();
      eachAmount.forEach(async (prod) => {
        const stock = parseInt(-prod.amount);
        await ProductsModel.findByIdAndUpdate(prod._id, { $inc: { stock: stock } }, { session });
        console.log(prod);
      });
      console.log("1", "スタート");
      await CartModel.findOneAndDelete({ user: userId }, { session });
      console.log("2");
      await OrderModel.create([{ user: userId, products }], { session });
      console.log("3");
      await PurchaseHistoryModel.updateOne(
        { user: userId },
        { $push: { order: { $each: products } } },
        { session, upsert: true }
      );
      console.log("4");
      const paymentIntent = await stripe.paymentIntents.create({
        amount: sumPrice,
        currency: "jpy",
      });
      console.log("5");

      res.json({ client_secret: paymentIntent.client_secret });
    } else {
      // カートが更新されため
      res.status(302).send("カートが更新されたため、ご注文確認画面へ");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/settlement/commit
// @desc 一連の在庫処理をコミット
// @access Private
router.post("/commit", async (req, res) => {
  try {
    console.log(session, "セッション1");
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
    console.log("セッション2");
    if (session) await session.abortTransaction();
    session = undefined;
    res.send("在庫処理をロールバックしました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
