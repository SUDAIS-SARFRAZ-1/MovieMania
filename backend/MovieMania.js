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



// Server Setup
const port = 8000;
const host = '127.0.0.1';
app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
