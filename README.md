# Multiuser web-based todo app

This is a multiuser web-based todo app. It is a project for the course Web Application Development at the Tartu
Vocational Collage. The app is built using Node.js, Express.

## Prerequisites

To begin working with this project, you need to have Node.js installed on your machine. You can download it from the official Node.js website (https://nodejs.org/en/download/).


## Getting Started

Once you have installed Node.js, follow these steps:

1. Open the root directory of the project in terminal.
2. Copy the .env.sample file to .env by executing `cp .env.sample .env` and change the values to your liking.
3. Create a MySQL database for the app. You can use the following SQL commands as an example:
 ```mysql
 CREATE DATABASE my_db;
 
 USE my_db;
 
 CREATE TABLE users (
     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     firstname VARCHAR(30) NOT NULL,
     lastname VARCHAR(30) NOT NULL,
     username VARCHAR(50) NOT NULL,
     password VARCHAR(50) NOT NULL,
     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );
 ```
4. Run `npm install` to install all the necessary dependencies for the project.
5. Run `npm start` to start the server on port 4000 (or whatever port you have specified in the .env file).
6. Navigate to [http://localhost:4000/docs](http://localhost:4000/docs) to see the API documentation.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [Express](https://expressjs.com/) for the web framework.
- [Express-session](https://www.npmjs.com/package/express-session) for the session management.
- [Node.js](https://nodejs.org/en/) for the JavaScript runtime.
- [NPM](https://www.npmjs.com/) for the package manager.
- [Dotenv](https://www.npmjs.com/package/dotenv) for the environment variables.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) for the password hashing.
- [body-parser](https://www.npmjs.com/package/body-parser) for the request body parsing.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) for the cookie parsing.
- [barba](https://www.npmjs.com/package/barba) for the page transitions.
- [yamljs](https://www.npmjs.com/package/yamljs) for the YAML parsing.
- [mysql](https://www.npmjs.com/package/mysql2) for the MySQL database connection.