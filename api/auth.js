const router = require("express").Router();
const UserModel = require("../models/UserModel");
const FavoritesModel = require("../models/FavoritesModel");
const CartModel = require("../models/CartModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @route POST api/auth/register
// @desc ユーザーの登録
// @access Public
router.post("/register", async (req, res) => {
  const { nickname, email, password, isShorthandEmail } = req.body;

  try {
    const isExistUser = await UserModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).send("ユーザーが既に存在しています");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      nickname,
      email,
      password: hashedPassword,
      isShorthandEmail,
    });
    const newFavorites = new FavoritesModel({
      user: newUser._id,
      products: [],
    });
    const newCart = new CartModel({
      user: newUser._id,
      products: [],
    });

    await newUser.save();
    await newFavorites.save();
    await newCart.save();

    const token = jwt.sign({ userId: newUser._id.toString() }, process.env.jwtSecret, {
      expiresIn: "2d",
    });

    res.cookie("token", token);
    res.send("登録成功❗");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/auth
// @desc ユーザーの認証(ログイン)
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) return res.status(404).send("メールアドレスまたはパスワードが違います。");

    const isCurrectPass = await bcrypt.compare(password, user.password);
    if (!isCurrectPass) {
      return res.status(404).send("メールアドレスまたはパスワードが違います。");
    }

    const token = jwt.sign({ userId: user._id.toString() }, process.env.jwtSecret, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
    res.send("認証成功❗");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// router.delete("/", (req, res) => {
//   res.clearCookie("token");
// })

module.exports = router;
