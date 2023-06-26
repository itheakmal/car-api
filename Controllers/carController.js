const Car = require('../Models/Car');
const Category = require('../Models/Category');
const UserAuth = require('../Models/UserAuth');
const UserProfile = require('../Models/UserProfile');
/**
 * Get all cars
 * @returns {Promise<Car[]>} - All cars
 */
const getCars = async (req, res) => {
    try {
        const cars = await Car.findAll({
            where: { UserAuthId: req.user.id },
            include: [
                { model: Category, attributes: ['name'] },
                {
                    model: UserAuth,
                    attributes: ['email'],
                    include: [{ model: UserProfile, attributes: ['name'] }]
                }
            ],
        });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cars' });
    }
};


/**
 * Create a new car
 * @param {number} categoryId - Category ID for the car
 * @param {string} color - Car color
 * @param {string} model - Car model
 * @param {string} make - Car make
 * @param {string} registrationNo - Car registration number
 * @returns {Promise<Car>} - Created car
 */
const createCar = async (req, res) => {
    console.log('first', req.body)
    console.log('first', req.user.id)
    // validate req
    const { error, value } = Car.carValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }


    try {
        // Check if the specified category exists
        const category = await Category.findByPk(value.categoryId);
        console.log(category)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const car = await Car.createCar(value.color, value.make, value.model, value.registrationNo, req.user.id, value.categoryId);

        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create car' });
    }
};

/**
 * Update a car
 * @param {number} id - Car ID
 * @param {number} categoryId - Updated category ID for the car
 * @param {string} color - Updated car color
 * @param {string} model - Updated car model
 * @param {string} make - Updated car make
 * @param {string} registrationNo - Updated car registration number
 * @returns {Promise<Car>} - Updated car
 */
const updateCar = async (req, res) => {
    const { id } = req.params;
    // validate req
    const { error, value } = Car.carValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }


    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        } else if (car.UserAuthId !== req.user.id) {
            return res.status(403).json({ message: 'Not Allowed' });
        }

        // Check if the specified category exists
        const category = await Category.findByPk(value.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        car.categoryId = value.categoryId;
        car.color = value.color;
        car.model = value.model;
        car.make = value.make;
        car.registrationNo = value.registrationNo;
        await car.save();

        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car' });
    }
};

/**
 * Delete a car
 * @param {number} id - Car ID
 * @returns {Promise} - Empty response
 */
const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        } else if (car.UserAuthId !== req.user.id) {
            return res.status(403).json({ message: 'Not Allowed' });
        }

        await car.destroy();

        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car' });
    }
};

/**
 * Get a car by id
 * @returns {Promise<Car[]>} - All cars
 */
const getCarById = async (req, res) => {
    console.log(req.params)
    try {
    const car = await Car.findOne({
        where: { id: req.params.id },
        include: [
            { model: Category, attributes: ['name'] },
            {
                model: UserAuth,
                attributes: ['email'],
                include: [{ model: UserProfile, attributes: ['name'] }]
            }
        ],
    });
    res.json(car);
    } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars' });
    }
};

module.exports = {
    getCars,
    createCar,
    updateCar,
    deleteCar,
    getCarById
}