const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: String,
  lastPrice: Number,
  currentPrice: Number,
  notified: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", stockSchema);
