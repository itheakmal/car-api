const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../Models/UserAuth');
const UserProfile = require('../Models/UserProfile');

// const xss = require('xss');

// register a new user
const registerUser = async (req, res) => {

    // validate req
    const { error, value } = UserAuth.registerValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    // if email exists
    const exists = await UserAuth.findByEmail(value.email)
    if (exists) {
        return res.status(401).json({ message: 'Email already registered' });
    }
    try {
        // get a random password
        const password = UserAuth.generatePassword();

        // create a new user and Hash the password
        const user = await UserAuth.createHashedUser(value.email, password);

        // Send email to the user
        await emailService.sendEmail(user, password);

        res.status(201).json({
            id: user.id,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.log(error)
    }

}

// Define a login an existing user
const loginUser = async (req, res) => {
    // validate req
    const { error, value } = UserAuth.loginValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const user = await UserAuth.findByEmail(value.email)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }


    const match = await bcrypt.compare(value.password, user.password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token using the user id and username and the secret key from the environment variable
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

    // Return a 200 OK response with the token
    res.json({ token });

};

// Exporting
module.exports = {
    registerUser,
    loginUser
};