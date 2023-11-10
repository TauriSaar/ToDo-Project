const express = require('express');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const path = require("path");

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

// Set up session management
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
        resave: false
    })
);

// Define the registration route
router.get('/', (req, res) => {
    // Render the login form
    res.render('login');
});

// Define the registration route
router.post('/', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    con.query('SELECT id, password, firstname FROM users WHERE username = ?', [userName], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length > 0) {
            const userId = result[0].id;
            const userName = req.body.userName;

            bcrypt.compare(password, result[0].password, (compareErr, passwordMatch) => {
                if (compareErr) {
                    console.log(compareErr);
                    return res.status(500).send('Internal Server Error');
                }

                if (passwordMatch) {
                    req.session.userId = userId;

                    // Log the sign-in action with UserID
                    const logQuery = 'INSERT INTO Log (DateTime, Action, UserID) VALUES (NOW(), ?, ?)';
                    const logAction = `User "${userName}" has signed in`;

                    con.query(logQuery, [logAction, userId, userName], (logErr) => {
                        if (logErr) {
                            console.log(logErr);
                            return res.status(500).send('Internal Server Error');
                        }

                        res.redirect('/dashboard');
                    });
                } else {
                    // If the password doesn't match, send failLog.html
                    const failLogPath = path.join(__dirname, '../views/failpage/failLog.html');
                    return res.sendFile(failLogPath);
                }
            });
        } else {
            // If the user doesn't exist, send failLog.html
            const failLogPath = path.join(__dirname, '../views/failpage/failLog.html');
            return res.sendFile(failLogPath);
        }
    });
});

module.exports = router;
