const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const dotenv = require('dotenv');

// Set up body parser for URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up body parser for JSON
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

// Set up the port
const port = process.env.PORT;

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Swagger UI at /docs
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Disable the browser's back button and history navigation
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Set up static files
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

// Cookie middleware
app.use(cookieParser());

// Database connection
const con = mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.getConnection(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
    }
});

// Import routes
const registrationRoutes = require('./routes/registration');
const authenticationRoutes = require('./routes/authentication');
const dashboardRoutes = require('./routes/dashboard');
const logoutRoutes = require('./routes/logout');
const edituserRoutes = require('./routes/edituser');

// Use the imported routes
app.use('/register', registrationRoutes);
app.use('/login', authenticationRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/logout', logoutRoutes);
app.use('/edituser', edituserRoutes);

// Define the front page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/frontpage.html');
});

// App web server
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} and docs are at http://localhost:${port}/docs`);
});
