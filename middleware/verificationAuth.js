const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("認証情報が無効です。");
  }
  const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);
  if (!userId) {
    return res.status(401).send("認証情報が無効です。");
  }
  req.userId = userId;
  next();
};
