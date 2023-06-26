// Import the sequelize package and the db module
const sequelize = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const joi = require('joi');
const db = require('./index');

const UserAuth = db.define('UserAuth', {
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
});

/**
 * Schema for validating user registration input
 * Name of the user (required)
 * Email of the user (required and must be a valid email)
 * age
 */
const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(18).max(100).required()
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

/**
 * Validate the input data for user login
 * @param {object} input - Input data for login
 * @returns {joi.ValidationResult} - Validation result of login input
 */
UserAuth.loginValidate = (input) => {
  return loginSchema.validate(input);
};

/**
 * Validate the input data for user registration
 * @param {object} input - Input data for registration
 * @returns {Joi.ValidationResult} - Validation result of registration input
 */
UserAuth.registerValidate = (input) => {
  return registerSchema.validate(input);
};

/**
 * generate a random password of length 8
 * @returns {String}
 */
UserAuth.generatePassword = () => {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    password += characters[randomIndex];
  }

  return password;
};

/**
 * Find a user by email
 * @param {string} email - User's email
 * @returns {Promise<UserAuth|null>} - Found user or null if not found
 */
UserAuth.findByEmail = async (email) => {
  const user = await UserAuth.findOne({ where: { email } });
  return user;
};

/**
 * Create a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<UserAuth>} - Created user
 */
UserAuth.createHashedUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserAuth.create({ email, password: hashedPassword });
  return user;
};




module.exports = UserAuth;
