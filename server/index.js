const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const axios = require("axios");
const twilio = require("twilio");

const Stock = require("./stock.model");
const Notification = require("./notification.model");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Twilio setup
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const sendSMS = async (body) => {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE
    });
    console.log("📲 SMS sent:", body);
  } catch (err) {
    console.error("❌ SMS failed:", err.message);
  }
};

// REST APIs
app.get("/api/stocks", async (req, res) => {
  const stocks = await Stock.find().sort({ addedAt: -1 });
  res.json(stocks);
});

app.post("/api/stocks", async (req, res) => {
  const { symbol, lastPrice } = req.body;
  const newStock = new Stock({ symbol, lastPrice, currentPrice: lastPrice });
  await newStock.save();
  res.json(newStock);
});

app.delete("/api/stocks/:id", async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.get("/api/alerts", async (req, res) => {
  const alerts = await Notification.find().sort({ createdAt: -1 });
  res.json(alerts);
});

// 🔁 Cron Job – every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  console.log("🔁 Checking stock prices...");

  const stocks = await Stock.find();

  for (let stock of stocks) {
    try {
      const apiKey = "your_api_key";
      const url = `https://api.twelvedata.com/quote?symbol=${stock.symbol}&apikey=${apiKey}`;
      const res = await axios.get(url);
      const livePrice = parseFloat(res.data.close);

      const shouldNotify = livePrice < stock.lastPrice && !stock.notified;

      if (shouldNotify) {
        const message = `⚠️ ${stock.symbol} dropped from $${stock.lastPrice} to $${livePrice}`;

        await Notification.create({
          symbol: stock.symbol,
          oldPrice: stock.lastPrice,
          newPrice: livePrice,
        });

        await sendSMS(message);

        stock.notified = true;
      }

      stock.currentPrice = livePrice;
      await stock.save();
    } catch (err) {
      console.error(`❌ Error for ${stock.symbol}:`, err.message);
    }
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
