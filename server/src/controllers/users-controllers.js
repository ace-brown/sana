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
    if (!username || !email || !password || !fullName.fullName) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email, try to login instead." });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = new User({
            username,
            email,
            password,
            profile: { fullName },
        });

        await createdUser.save();

        res.status(201).json({ user: createdUser.toObject({ getters: true }) });

    } catch (err) {
        return next(new HttpError("Signup failed, please try again later", 500));
    }
}

// Login an existing user
async function login(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new HttpError('Invalid email or password', 401);
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     throw new HttpError('Invalid email or password', 401);
        // }

        res.json({ message: "Logged in successfully", userId: user._id });
    } catch (err) {

        next(err);
    }
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login