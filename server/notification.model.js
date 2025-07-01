const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  symbol: String,
  oldPrice: Number,
  newPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
