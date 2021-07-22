const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserShema = new Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: "String", enum: ["root", "user"], default: "user" },
    password: { type: "String", required: true, select: false },
    isShorthandEmail: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", UserShema);
