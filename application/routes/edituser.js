const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

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
        resave: false,
    })
);

// Check if the user is authenticated
router.get('/', (req, res) => {
    // Retrieve the user's information from the database (you should implement this)
    const userId = req.session.userId; // Get the user's ID from the session
    if (!userId) {
        // User not authenticated, redirect to the login page or handle as needed
        return res.redirect('/login');
    }

    con.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            // Handle the error
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 1) {
            const user = result[0];
            // Render the edit profile form and pass user data to the template
            res.render('edituser', { user });
        } else {
            // User not found, redirect to the front page or handle as needed
            return res.redirect('/');
        }
    });
});

// Define the edit profile route and handle the form submission
router.post('/edit-profile', (req, res) => {
    // Handle the form submission to update the user's profile information
    const userId = req.session.userId; // Get the user's ID from the session
    if (!userId) {
        // User not authenticated, redirect to the login page or handle as needed
        return res.redirect('/login');
    }

    const firstName = req.body.name;
    const lastName = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;

    // Check if the profile information is unchanged
    if (firstName === '' && lastName === '' && userName === '' && !password) {
        // No changes made, you can handle this case (e.g., show a message to the user)
        return res.redirect('/dashboard');
    }

    // Use bcrypt to hash the new password (if provided)
    if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                // Handle the error
                return res.status(500).send('Internal Server Error');
            }

            // Update the user's information in the database, including the new password
            con.query(
                'UPDATE users SET firstname = IF(?, ?, firstname), lastname = IF(?, ?, lastname), username = IF(?, ?, username), password = ? WHERE id = ?',
                [firstName !== '' ? true : false, firstName, lastName !== '' ? true : false, lastName, userName !== '' ? true : false, userName, hash, userId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        // Handle the error
                        return res.status(500).send('Internal Server Error');
                    }
                    // Log the user action for account modification
                    const logQuery = 'INSERT INTO log (DateTime, Action, UserID) VALUES (NOW(), ?, ?)';
                    const logParams = `User "${userName}" was modified (with password change))`;

                    con.query(logQuery, [logParams, userId, userName], (logErr, logResult) => {
                        if (logErr) {
                            console.log(logErr);
                            // Handle the error in logging (maybe log it somewhere else?)
                        }
                        // User profile updated successfully, redirect to another page or send a response
                        // For example, you can redirect to the user's profile page:
                        return res.redirect('/dashboard');
                    });
                }
            );
        });
    } else {
        // Update the user's information in the database without changing the password
        con.query(
            'UPDATE users SET firstname = IF(?, ?, firstname), lastname = IF(?, ?, lastname), username = IF(?, ?, username) WHERE id = ?',
            [firstName !== '' ? true : false, firstName, lastName !== '' ? true : false, lastName, userName !== '' ? true : false, userName, userId],
            (err, result) => {
                if (err) {
                    console.log(err);
                    // Handle the error
                    return res.status(500).send('Internal Server Error');
                }
                // Log the user action for account modification
                const logQuery = 'INSERT INTO log (DateTime, Action, UserID) VALUES (NOW(), ?, ?)';
                const logParams = `User "${userName}" was modified (without password change)`;

                con.query(logQuery, [logParams, userId, userName], (logErr, logResult) => {
                    if (logErr) {
                        console.log(logErr);
                        // Handle the error in logging (maybe log it somewhere else?)
                    }
                    // User profile updated successfully, redirect to another page or send a response
                    // For example, you can redirect to the user's profile page:
                    return res.redirect('/dashboard');
                });
            }
        );
    }
});


// Define the deleted account route and handle the form submission
router.post('/delete-account', (req, res) => {
    // Handle the request to delete the user's profile
    const userId = req.session.userId; // Get the user's ID from the session
    if (!userId) {
        // User not authenticated, redirect to the login page or handle as needed
        return res.redirect('/login');
    }

    // Retrieve the username before deleting the user's profile
    con.query('SELECT username FROM users WHERE id = ?', [userId], (usernameErr, usernameResult) => {
        if (usernameErr) {
            console.log(usernameErr);
            // Handle the error
            return res.status(500).send('Internal Server Error');
        }

        const deletedUsername = usernameResult[0].username;

        // Delete the user's profile from the database
        con.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                console.log(err);
                // Handle the error
                return res.status(500).send('Internal Server Error');
            }
            // Log the user action for account deletion with the username
            const logQuery = 'INSERT INTO log (DateTime, Action, UserID) VALUES (NOW(), ?, ?)';
            const logAction = `User "${deletedUsername}" was deleted`;
            const logParams = [logAction, userId];

            con.query(logQuery, logParams, (logErr, logResult) => {
                if (logErr) {
                    console.log(logErr);
                    // Handle the error in logging (maybe log it somewhere else?)
                }
                // User profile deleted successfully, redirect to register page
                return res.redirect('/register');
            });
        });
    });
});

module.exports = router;
