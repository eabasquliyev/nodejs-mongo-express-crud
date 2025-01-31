const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// =====RefreshToken Model=====
const refreshTokenSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});
refreshTokenSchema.virtual("isExpired").get(function () {
  return Date.now() >= this.expires;
});
refreshTokenSchema.virtual("isActive").get(function () {
  return !this.revoked && !this.isExpired;
});

// =====Joke Model=====
const jokesSchema = new Schema(
  {
    content: String,
    created: { type: Date, default: Date.now },
  },
  { strict: false }
);

// =====Book Model=====
const bookSchema = new Schema(
  {
    created: { type: Date, default: Date.now },
  },
  { strict: false }
);

module.exports = {
  Joke: mongoose.model("jokes", jokesSchema),
  Book: mongoose.model("books", bookSchema),
  RefreshToken: mongoose.model("RefreshToken", refreshTokenSchema),
  Account: require("src/collections/account/account.model"),
};
