const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../Models/UserAuth');
const UserProfile = require('../Models/UserProfile');
const emailService = require('../Services/Email')

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
        return res.status(403).json({ message: 'Email already registered' });
    }
    try {
        // get a random password
        const password = UserAuth.generatePassword();

        // create a new user and Hash the password
        const _user = await UserAuth.createHashedUser(value.email, password);
        console.log(_user)
        const _profile = await UserProfile.createProfile({name: value.name, age: value.age, userAuthId: _user.id});
        // Send email to the user
        await emailService.sendEmail(_profile.name, _user.email, password);

        res.status(201).json({
            id: _user.id,
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
        return res.status(403).json({ message: 'Invalid credentials' });
    }


    const match = await bcrypt.compare(value.password, user.password);
    if (!match) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token using the user id and username and the secret key from the environment variable
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 * 365});

    // Return a 200 OK response with the token
    res.json({ token });

};

// Exporting
module.exports = {
    registerUser,
    loginUser
};