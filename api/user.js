const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("api success");
});

module.exports = router;
