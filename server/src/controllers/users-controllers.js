const { validationResult } = require("express-validator")
const mongoose = require('mongoose')

const HttpError = require("../models/http-error");
const User = require("../models/user");
const { Report } = require("../models/report");


// Get the current user data
async function getCurrentUser(req, res, next) {
    try {
        const { uid } = req.params;

        // const user = await User.findById(uid).select('-password');
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: user.toObject({ getters: true }) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Fetching user failed. Please try again later.' });
    }
}


// Get all users
async function getUsers(req, res, next) {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Parse and validate `page` and `limit`
        const currentPage = Math.max(1, parseInt(page, 10));
        const perPage = Math.max(1, parseInt(limit, 10));

        // Exclude the password field for security
        const users = await User.find({}, '-password')
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        // Count total users in the database for pagination metadata
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users: users.map(user => user.toObject({ getters: true })),
            totalUsers,
            currentPage,
            totalPages: Math.ceil(totalUsers / perPage)
        });
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

// Update an existing user
async function updateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input passed, please check your data", 422));
    }

    const userId = req.params.uid;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new HttpError("Invalid user ID", 400));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new HttpError("Could not find a user for the provided ID", 404));
        }

        // Update user fields
        for (const key in updates) {
            if (user[key] !== undefined) {
                user[key] = updates[key];
            }
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        await user.save({ session: sess });

        await sess.commitTransaction();

        res.status(200).json({ user: user.toObject({ getters: true }) });
    } catch (error) {
        console.log(error);
        return next(new HttpError("Updating user failed, please try again later.", 500));
    }
}

// Delete user
async function deleteUser(req, res, next) {
    const userId = req.params.uid;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new HttpError("Invalid user ID", 400));
        }

        const user = await User.findById(userId).populate('ideas').populate('reports');
        if (!user) {
            return next(new HttpError("Could not find a user for the provided ID", 404));
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();

        // Delete associated Ideas and Reports
        for (const idea of user.ideas) {
            const reports = await Report.find({ ideaId: idea._id });
            for (const report of reports) {
                await report.deleteOne({ session: sess }); // Delete reports
            }
            await idea.deleteOne({ session: sess }); // Delete ideas
        }

        await user.deleteOne({ session: sess });

        await sess.commitTransaction();

        res.status(200).json({ message: "User and all associated data deleted successfully." });
    } catch (error) {
        sess.abortTransaction();
        return next(new HttpError("Deleting user failed, please try again later.", 500));
    }
}


exports.getCurrentUser = getCurrentUser
exports.getUsers = getUsers
exports.signup = signup
exports.login = login
exports.deleteUser = deleteUser
exports.updateUser = updateUser