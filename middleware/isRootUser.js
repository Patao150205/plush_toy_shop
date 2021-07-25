const UserModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  try {
    const { role } = await UserModel.findById(req.userId).select("role");
    if (role !== "root") {
      return res.status(401).send("rootUserOnly");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("rootUserOnly");
  }
};
