import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchWishlistWithLivePrices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stocks");
        const savedStocks = response.data;

        const updatedStocks = await Promise.all(
          savedStocks.map(async (stock) => {
            try {
              const apiKey = "your_api_key_here"; // replace with real key
              const url = `https://api.twelvedata.com/quote?symbol=${stock.symbol}&apikey=${apiKey}`;
              const res = await axios.get(url);
              return {
                ...stock,
                currentPrice: parseFloat(res.data.close),
              };
            } catch {
              return {
                ...stock,
                currentPrice: null,
              };
            }
          })
        );

        setStocks(updatedStocks);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlistWithLivePrices();
  }, []);

  const deleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stocks/${id}`);
      setStocks(stocks.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="page">
      <h2>📂 Your Wishlist History</h2>

      {stocks.length === 0 ? (
        <p>No stocks saved yet.</p>
      ) : (
        <div className="card-list">
          {stocks.map((stock) => {
            const dropped = stock.currentPrice !== null && stock.currentPrice < stock.lastPrice;

            return (
              <div
                key={stock._id}
                className="history-item"
                style={{
                  borderLeft: dropped ? "6px solid red" : "6px solid #28a745",
                  backgroundColor: dropped ? "#fff4f4" : "#f9f9f9",
                }}
              >
                <h3>{stock.symbol}</h3>
                <p>
                  <strong>Saved Price:</strong> ${stock.lastPrice}
                </p>
                <p>
                  <strong>Current Price:</strong>{" "}
                  {stock.currentPrice !== null ? `$${stock.currentPrice}` : "Not available"}
                </p>
                <p>
                  <strong>Saved At:</strong>{" "}
                  {new Date(stock.addedAt).toLocaleString()}
                </p>

                {dropped && (
                  <p style={{ color: "red", marginTop: "0.5rem" }}>
                    ⚠️ Price dropped since saved!
                  </p>
                )}

                <button
                  onClick={() => deleteStock(stock._id)}
                  style={{
                    marginTop: "0.75rem",
                    background: "#e74c3c",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
