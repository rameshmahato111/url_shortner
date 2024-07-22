const mongoose = require("mongoose");
const urlshortnerSchema = new mongoose.Schema(
  {
    originalurl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true
    },
  },

  { timestamps: true }
);

const ShortedURL = mongoose.model("ShortedURL", urlshortnerSchema);

module.exports = ShortedURL;
