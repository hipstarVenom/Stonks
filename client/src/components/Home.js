function Home() {
  return (
    <div className="page">
      <h1>📈 Welcome to StonksAlert</h1>

      <section>
        <h2>What is StonksAlert?</h2>
        <p>
          StonksAlert is a simple stock monitoring tool that helps you track stock prices and get notified via SMS when prices drop.
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <ul>
          <li>➕ Add a stock symbol to your watchlist from the <strong>Fetch Live</strong> tab.</li>
          <li>🔁 We check stock prices every 10 minutes.</li>
          <li>📉 If a stock price drops below your added value, we’ll notify you via SMS.</li>
          <li>📂 View all alerts under the <strong>Alerts</strong> tab.</li>
        </ul>
      </section>

      <section>
        <h2>Start Tracking Now!</h2>
        <p>
          Use the navigation above to explore features. You can fetch live stock data, manage your watchlist, and see your alert history.
        </p>
      </section>
    </div>
  );
}

export default Home;
