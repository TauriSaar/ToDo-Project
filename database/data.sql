CREATE DATABASE my_db;

GRANT all privileges ON my_db.* TO 'superman'@'%';

USE my_db

CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE log (
  LogID bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  DateTime timestamp NULL DEFAULT NULL,
  Action text,
  UserID int unsigned DEFAULT NULL
);