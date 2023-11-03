const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

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

// Define the registration route
router.get('/', (req, res) => {
    // Render the registration form (you can use a template engine)
    res.render('register');
});

router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;

    // Use bcrypt to hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            // Handle the error
            return res.status(500).send('Internal Server Error');
        }

        // Checking if the user is already registered
        con.query('SELECT * FROM users WHERE username = ?', [userName], (err, result) => {
            if (err) {
                console.log(err);
                // Handle the error
                return res.status(500).send('Internal Server Error');
            }

            if (result.length > 0) {
                // User already exists, send the 'failReg.html' file
                const failRegPath = path.join(__dirname, '../views/failpage/failReg.html'); // Construct the correct file path
                return res.sendFile(failRegPath);
            } else {
                // Insert new user data with the hashed password
                const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)';
                con.query(sql, [firstName, lastName, userName, hash], (err, result) => {
                    if (err) {
                        console.log(err);
                        // Handle the error
                        return res.status(500).send('Internal Server Error');
                    } else {
                        // User registered successfully, redirect to another page or send a response
                        // For example, you can redirect to a 'dashboard' page:
                        return res.redirect('dashboard');
                    }
                });
            }
        });
    });
});

module.exports = router;
