const router = require("express").Router();

router.post("/", auth, (req, res) => {
  const { ammount } = req.body;
});

module.exports = router;
