const sequelize = require('./db');
const UserAuth = require('./UserAuth');
const UserProfile = require('./UserProfile');

// Define associations between UserAuth and UserProfile
UserAuth.hasOne(UserProfile, { foreignKey: 'userAuthId', onDelete: 'CASCADE' });
UserProfile.belongsTo(UserAuth, { foreignKey: 'userAuthId' });

module.exports = { UserAuth, UserProfile };