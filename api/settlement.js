const router = require("express").Router();
const auth = require("../middleware/verificationAuth");
const Stripe = require("stripe");
const CartModel = require("../models/CartModel");
const bcrypt = require("bcrypt");

const stripe = new Stripe(process.env.STRIPE_SECRET);

// @route POST api/settlement
// @desc 決済処理を行う
// @access Public
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    // カートの日付token
    const { token, sumPrice } = req.body;
    // カートが新たに更新されていないかを確認する
    console.log(userId);
    const data = await CartModel.findOne({ user: userId }).select("updatedAt");
    const isSameCart = await bcrypt.compare(data.updatedAt.toString(), token);

    if (isSameCart) {
      // 更新されていなかった
      const paymentIntent = await stripe.paymentIntents.create({
        amount: sumPrice,
        currency: "jpy",
      });

      res.json({ client_secret: paymentIntent.client_secret });
    } else {
      // 更新されため
      res.status(302).send("カートが更新されたため、ご注文確認画面へ");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
