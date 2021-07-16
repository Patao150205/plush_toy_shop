const router = require("express").Router();
const AddressModel = require("../models/AddressModel");
const auth = require("../middleware/verificationAuth");

// @route GET api/address
// @desc 住所取得
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const address = await AddressModel.findOne({ user: req.userId });
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

// @route POST api/address
// @desc 住所登録
// @access Private
router.post("/", auth, async (req, res) => {
  const data = req.body.data;
  const newData = new AddressModel({
    user: req.userId,
    ...data,
  });
  try {
    const prevData = await AddressModel.exists({ user: req.userId });
    if (!prevData) {
      await newData.save();
      res.send("登録に成功しました。");
    } else {
      await AddressModel.updateOne({ user: req.userId }, data);
      res.send("更新に成功しました。");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
