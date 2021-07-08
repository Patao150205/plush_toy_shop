const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = ConnectDB;
