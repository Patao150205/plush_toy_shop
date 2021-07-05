const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("./config/db")();

console.log(process.env.MONGO_CONNECTION);

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use("/api/auth", require("./api/auth"));

  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log("Express Server Running");
  });
});
