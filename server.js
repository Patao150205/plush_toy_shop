const express = require("express");
const next = require("next");
const crypto = require("crypto");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use("/api/user", require("./api/user"));

  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log("Express Server Running");
  });
});

const KEY = crypto.scryptSync("patao", "", 32);
console.log(KEY);

function encodeBase64(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const encodedData = cipher.update(Buffer.from(data));
  return Buffer.concat([iv, encodedData]).toString("base64");
}

function decodeBase64(data) {
  const buff = Buffer.from(data, "base64");
  const iv = buff.slice(0, 16);
  const encodedData = buff.slice(16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  const decodedData = decipher.update(encodedData);
  return decodedData.toString("utf8");
}

const encodedData = encodeBase64("ぱたお");
const decodedData = decodeBase64(encodedData);

console.log(encodedData, decodedData);
