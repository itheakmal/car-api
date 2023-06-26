const router = require('express').Router();
const { registerUser, loginUser } = require('../Controllers/authController')
// const emailService = require('./services/email');
const authenticateToken = require('../Middlewares/authenticateToken');
const { getCars, createCar, updateCar, deleteCar, getCarById } = require('../Controllers/carController');
// const { createCar } = require('../Models/Car');
const { createCategory, getCategory, updateCategory, deleteCategory, getCategoryById } = require('../Controllers/categoryController');

/**
 * Routes
 */
// auth routes
router.post('/register', registerUser)
router.post('/login', loginUser)
// cars routes
router.get('/cars', authenticateToken, getCars)
router.get('/car/:id', authenticateToken, getCarById)
router.post('/car', authenticateToken, createCar)
router.put('/car/:id', authenticateToken, updateCar)
router.delete('/car/:id', authenticateToken, deleteCar)
// categories routes
router.get('/categories', authenticateToken, getCategory)
router.get('/category/:id', authenticateToken, getCategoryById)
router.post('/category', authenticateToken, createCategory)
router.put('/category/:id', authenticateToken, updateCategory)
router.delete('/category/:id', authenticateToken, deleteCategory)



// Export the router module
module.exports = router;