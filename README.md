# Stonks

stonks is a simple and intuitive stock price notifier web app. It allows a user to fetch real-time stock prices, add specific stocks to a personal watchlist, and receive alerts when the stock price drops.

This project was built as a learning and showcase app using React for the frontend, Node.js and Express for the backend, and MongoDB for storing wishlist data. It integrates with the TwelveData API to fetch live stock data.

# Features

- Clean navigation with Home, Fetch Live, History, and Alerts pages
- Search any stock symbol and fetch its latest details
- Add stocks to your wishlist to monitor their performance
- Compare saved price and live price
- Get notified if the stock price decreases
- Option to delete stocks from history
- SMS or future pop-up notification support
- Professional and responsive UI

##Pages

- Home: Description of the project and how it works
- Fetch Live: Search for a stock symbol, see its details, and add to watchlist
- Your History: View all your saved stocks, their saved and current prices
- Alerts: Displays list of stocks that dropped in price since they were saved

# Technologies Used

Frontend:
- React
- React Router
- Axios

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose

API:
- TwelveData (https://twelvedata.com/)

Other:
- SMS Notification (Twilio or mock version)
- RESTful API design

# Folder Structure

- client/        - React frontend
- server/        - Express backend
- client/src/    - React components (Navbar, Home, FetchLive, History, Alerts)
- server/models/ - Mongoose models
- server/routes/ - API endpoints

#How to Run

1. Clone the repository

   git clone https://github.com/your-username/stonks.git

2. Frontend setup

   cd client
   npm install
   npm start

3. Backend setup

   cd ../server
   npm install

   Create a `.env` file in the server directory and add:
   MONGO_URI=your_mongo_connection_string
   TWELVE_API_KEY=your_twelve_data_api_key

   Start backend:
   node index.js

4. Visit frontend at:

   http://localhost:3000

# Future Improvements

- Add user authentication for multi-user support
- Custom price alert thresholds
- Email or push notifications
- Chart visualizations for each stock
- Deployment (Vercel + Render setup)

# Notes

This app does not store user data or support login. All data is saved for a single user session only. It is ideal for learning full stack concepts and API integration with real-time data.

