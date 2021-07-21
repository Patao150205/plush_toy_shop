const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
const ejs = require("ejs");
const path = require("path");

router.post("/", async (req, res) => {
  const { name, email, message, userId } = req.body.data;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const html = await ejs.renderFile(path.resolve(__dirname, "../email/contact.ejs"), {
      name,
      email,
      message,
      userId,
    });
    const msg = {
      to: process.env.FROM_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: "Yuruhuwa お問い合わせ内容",
      html,
    };

    await sgMail.send(msg);
    res.send("お問い合わせ内容を送信しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

module.exports = router;
