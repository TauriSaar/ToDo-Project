const express = require('express');
const router = express.Router();
const session = require('express-session');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Set up session management
router.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

// Define the dashboard.ejs route
router.get('/', (req, res) => {
    // Check if the user is authenticated
    if (!req.session.userId) {
        // If the user is not authenticated, you can redirect to the login page or take appropriate action.
        res.redirect('/');
    } else {
        // If the user is authenticated, render the 'dashboard.ejs' template from the 'views' directory.
        res.render('dashboard');
    }
});

module.exports = router;
