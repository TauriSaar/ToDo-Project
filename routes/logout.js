const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.redirect('/'); // Redirect to the front page or any other page as needed
        }
    });
});

module.exports = router;
