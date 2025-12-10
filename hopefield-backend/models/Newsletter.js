const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  year: { type: Number, required: true },
  volume: { type: String },
  fileUrl: { type: String, required: true }, // stored PDF URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
