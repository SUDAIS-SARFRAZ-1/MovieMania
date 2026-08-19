const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { user_router } = require('./Routes/User_routes');
const {router} =require('./Routes/Watchlist_routes');

// Express Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(user_router);
app.use('/api/watchlist', router);



const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
