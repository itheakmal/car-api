const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const UserAuth = require('./UserAuth');
const Category = require('./Category');
const Joi = require('joi');

const Car = sequelize.define('Car', {
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registrationNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Associations between Car, UserAuth, and Category
Car.belongsTo(UserAuth, { foreignKey: 'UserAuthId' });
Car.belongsTo(Category, { foreignKey: 'CategoryId' });

const carSchema = Joi.object({
    color: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    registrationNo: Joi.string().required(),
    categoryId: Joi.number().required(),
});
Car.carValidate = (input) => {
    return carSchema.validate(input);
};

/**
 * Create a new car
 * @param {string} color - Car color
 * @param {string} make - Car make
 * @param {string} model - Car model
 * @param {string} registrationNo - Car registration number
 * @param {number} userAuthId - UserAuth ID for the car owner
 * @param {number} categoryId - Category ID for the car category
 * @returns {Promise<Car>} - Created car
 */
Car.createCar = async (color, make, model, registrationNo, userAuthId, categoryId) => {
    const car = await Car.create({ color, make, model, registrationNo, UserAuthId:userAuthId, CategoryId:categoryId });
    return car;
};

module.exports = Car;