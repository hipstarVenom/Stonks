import React, { useEffect, useState } from "react";
import axios from "axios";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/alerts");
        setAlerts(res.data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="page">
      <h2>🔔 Price Drop Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts yet!</p>
      ) : (
        <div className="alerts">
          {alerts.map((alert) => (
            <div className="alert-box" key={alert._id}>
              <strong>{alert.symbol}</strong> dropped from <strong>${alert.oldPrice}</strong> to <strong>${alert.newPrice}</strong>
              <small>{new Date(alert.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alerts;
