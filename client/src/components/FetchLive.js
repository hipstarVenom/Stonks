import React, { useState } from "react";
import axios from "axios";

function FetchLive() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const fetchStock = async () => {
    try {
      const apiKey = "your_api_key_here";
      const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.code || !response.data.symbol) {
        setError("Invalid stock symbol or API error.");
        setStockData(null);
      } else {
        setStockData(response.data);
        setError("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch stock data.");
      setStockData(null);
    }
  };

  const saveToWishlist = async () => {
    try {
      await axios.post("http://localhost:5000/api/stocks", {
        symbol: stockData.symbol,
        lastPrice: parseFloat(stockData.close),
      });
      alert("Stock saved to wishlist!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save stock.");
    }
  };

  return (
    <div className="page">
      <h2>📡 Fetch Live Stock Data</h2>

      <form onSubmit={(e) => { e.preventDefault(); fetchStock(); }}>
        <label htmlFor="symbol">Enter Stock Symbol</label>
        <input
          id="symbol"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. AAPL, INFY.NS, RELIANCE.NS"
        />
        <button type="submit">Fetch</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {stockData && (
        <div className="card">
          <h3>{stockData.name} ({stockData.symbol})</h3>
          <p><strong>Price:</strong> ${stockData.close}</p>
          <p><strong>Open:</strong> ${stockData.open}</p>
          <p><strong>High:</strong> ${stockData.high}</p>
          <p><strong>Low:</strong> ${stockData.low}</p>
          <p><strong>Exchange:</strong> {stockData.exchange}</p>
          <p><strong>Currency:</strong> {stockData.currency}</p>
          <p><strong>Change %:</strong> {Number(stockData.percent_change).toFixed(2)}%</p>

          <button onClick={saveToWishlist}>💾 Save to Wishlist</button>
        </div>
      )}
    </div>
  );
}

export default FetchLive;
