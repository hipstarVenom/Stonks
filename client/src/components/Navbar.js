import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/fetch">📡 Fetch Live</Link>
      <Link to="/history">📂 Your History</Link>
      <Link to="/alerts">🔔 Alerts</Link>
    </nav>
  );
}

export default Navbar;
