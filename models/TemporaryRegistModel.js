const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemporaryRegistSchema = new Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["root", "user"], default: "user" },
    password: { type: String, required: true, select: false },
    isShorthandEmail: { type: Boolean, default: false },
    hash: { type: String },
    createdAt: { type: Date, default: Date.now, index: { expires: 1800 } },
  },
  { versionKey: false }
);

module.exports = mongoose.model("TemporaryRegist", TemporaryRegistSchema);
