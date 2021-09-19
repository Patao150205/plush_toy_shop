const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('JsonWebTokenError');
  }
  jwt.verify(req.headers.authorization, process.env.jwtSecret, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).send('JsonWebTokenError');
    }

    req.userId = decoded.userId;
    next();
  });
};
