const sequelize = require('./index');
const UserAuth = require('./UserAuth');
const UserProfile = require('./UserProfile');

// Define associations between UserAuth and UserProfile


module.exports = { UserAuth, UserProfile };