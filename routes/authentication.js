const express = require('express');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv"); // Add bcrypt for password hashing

// Load environment variables from .env file
dotenv.config();

const con = mysql.createConnection({
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

router.get('/', (req, res) => {
    // Render the login form (you can use a template engine)
    res.render('login');
});

router.post('/', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    // Fetch the hashed password from the database based on the username
    con.query('SELECT id, password FROM users WHERE username = ?', [userName], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length > 0) {
            // Compare the provided password with the stored hash
            const hashedPassword = result[0].password;

            bcrypt.compare(password, hashedPassword, (compareErr, passwordMatch) => {
                if (compareErr) {
                    console.log(compareErr);
                    return res.status(500).send('Internal Server Error');
                }

                if (passwordMatch) {
                    req.session.userId = result[0].id; // Store the user's ID
                    res.redirect('/dashboard'); // Redirect to the dashboard route
                } else {
                    res.redirect('/failLogin.html'); // Redirect to the failure page
                }
            });
        } else {
            res.redirect('/failLogin.html'); // Redirect to the failure page
        }
    });
});

module.exports = router;
