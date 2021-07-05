const jwt = require("jsonwebtoken");

module.exports = ((req, res, next) => {
  const isValid = jwt.verify(req.headers.token, process.env.jwtSecret);
  if (isValid) {

  } else {
    
  }
}()