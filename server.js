const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("./config/db")();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use("/api/auth", require("./api/auth"));
  server.use("/api/user", require("./api/user"));
  server.use("/api/products", require("./api/products"));
  server.use("/api/product", require("./api/product"));
  server.use("/api/favorites", require("./api/favorites"));

  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log("Express Server Running");
  });
});
