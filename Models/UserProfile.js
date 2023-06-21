const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserProfile = sequelize.define('UserProfile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

/**
 * Create user profile
 * @param {string} name - User name
 * @param {number} age - User age
 * @returns {Promise<UserProfile>} - Created user profile
 */
UserProfile.createProfile = async (data) => {
  const userProfile = await UserProfile.create(data);
  return userProfile;
};

module.exports = UserProfile;