const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("JsonWebTokenError");
  }
  jwt.verify(req.headers.authorization, process.env.jwtSecret, (err, { userId }) => {
    if (err) {
      return res.status(401).send(err.name);
    }
    console.log(userId);
    req.userId = userId;
    next();
  });
};
