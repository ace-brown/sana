const { validationResult } = require("express-validator")

const HttpError = require("../models/http-error");
const User = require("../models/user");


// Get all users
async function getUsers(req, res, next) {
    try {
        // Exclude the password field for security
        const users = await User.find({}, '-password');
        res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
    } catch (err) {
        return next(new HttpError(
            'Fetching users failed, please try again later.',
            500
        ));
    }
}

// Create a new user
async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input passed, please check your data", 422));
    }

    const { username, email, password, fullName } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User exists already, please login instead.', 422);
        return next(error);
    }

    const createdUser = new User({
        username,
        email,
        password,
        reports: [],
        profile: { fullName }
    });


    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

// Login an existing user
async function login(req, res, next) {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Loggin in failed, please try again later.', 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid email or password, could not log you in.', 401);
        return next(error);
    }

    res.json({
        message: 'Logged in!',
        user: existingUser.toObject({ getters: true })
    });
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login