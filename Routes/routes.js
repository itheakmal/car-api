const router = require('express').Router();
const { registerUser, loginUser } = require('../Controllers/authController')
// const emailService = require('./services/email');
const authenticateToken = require('../Middlewares/authenticateToken');
const { getCars, createCar, updateCar, deleteCar } = require('../Controllers/carController');
// const { createCar } = require('../Models/Car');
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../Controllers/categoryController');

/**
 * Routes
 */

router.post('/register', registerUser)
router.post('/login', authenticateToken, loginUser)

router.get('/cars', authenticateToken, getCars)
router.post('/car', authenticateToken, createCar)
router.put('/car', authenticateToken, updateCar)
router.delete('/car', authenticateToken, deleteCar)

router.get('/category', authenticateToken, getCategory)
router.post('/category', authenticateToken, createCategory)
router.put('/category', authenticateToken, updateCategory)
router.delete('/category', authenticateToken, deleteCategory)



// Export the router module
module.exports = router;