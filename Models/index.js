// Import the sequelize package
const sequelize = require('sequelize');
require('dotenv').config();

// Create a sequelize instance with mysql connection
const db = new sequelize(process.env.CARS_DB_CONNECTION);

// Export the db module
module.exports = db;
