const router = require("express").Router();
const UserModel = require("../models/UserModel");
const FavoritesModel = require("../models/FavoritesModel");
const TemporaryRegistModel = require("../models/TemporaryRegistModel");
const CartModel = require("../models/CartModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const BaseUrl = require("../src/utils/BaseUrl");
const fs = require("fs/promises");
const ejs = require("ejs");
const path = require("path");

// @route POST api/auth/temporary/register
// @desc ユーザーの仮登録と確認メール送信 (メールアドレス確認前)
// @access Public
router.post("/temporary/register", async (req, res) => {
  const { nickname, email, password } = req.body;

  try {
    const isExistUser = await UserModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).send("ユーザーが既に存在しています");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // メールに埋め込むハッシュ値
    const random = crypto.randomBytes(32);
    const sha512 = crypto.createHash("sha512");
    sha512.update(random);
    const hash = sha512.digest("hex");

    const temporaryUser = new TemporaryRegistModel({
      nickname,
      email,
      password: hashedPassword,
      hash,
    });
    await temporaryUser.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const href = `${BaseUrl}/auth/register/${hash}`;
    const html = await ejs.renderFile(path.resolve(__dirname, "../email/regist.ejs"), { nickname, href });
    // const html = await fs.readFile(path.resolve(__dirname, "../email/regist.html"), "utf-8");
    console.log(html);
    const msg = {
      to: email,
      from: "patao150205@yahoo.co.jp",
      subject: "Yuruhuwa 登録のご案内",
      html,
    };

    sgMail.send(msg);

    res.send("メール送信成功！");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/auth/register/:hash
// @desc ユーザーの登録 (メールアドレス確認後)
// @access Public
router.post("/register/:hash", async (req, res) => {
  const hash = req.params.hash;
  try {
    const temporaryData = await TemporaryRegistModel.findOne({ hash }).select("+password");
    if (!temporaryData) {
      return res.status(401).send("認証情報が無効です。");
    }
    console.log(temporaryData);
    const isExistUser = await UserModel.findOne({ email: temporaryData.email });
    if (isExistUser) {
      return res.status(400).send("ユーザーが既に存在しています");
    }

    const { _id, nickname, email, role, isShorthandEmail, password } = temporaryData;
    await TemporaryRegistModel.deleteMany({ email });
    const newUser = new UserModel({
      _id,
      nickname,
      email,
      role,
      isShorthandEmail,
      password,
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

    console.log(newUser._id.toString(), "id");
    const token = jwt.sign({ userId: newUser._id.toString() }, process.env.jwtSecret, {
      expiresIn: "2d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/auth
// @desc ユーザーの認証
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
