// Import the sequelize package
const sequelize = require('sequelize');

// Create a sequelize instance with mysql connection
const db = new sequelize('mysql://root@localhost:3306/cars');

// Export the db module
module.exports = db;
