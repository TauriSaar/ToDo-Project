const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Set up MySQL connection
const con = mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Define the logout route
router.get('/', (req, res) => {
    // Extract user ID from the session
    const userId = req.session.userId;

    // Fetch user's first name from the database
    con.query('SELECT firstname FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        const userName = req.body.userName;

        // Log the user logout action with the user's first name and user ID
        const logQuery = 'INSERT INTO log (DateTime, Action, UserID) VALUES (NOW(), ?, ?)';
        const logAction = `User "${userName}" has signed in`;

        con.query(logQuery, [logAction, userId, userName], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            // Clear the session
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }

                // Clear the session cookie
                res.clearCookie('connect.sid');

                // Redirect to the front page
                res.redirect('/');
            });
        });
    });
});

module.exports = router;
