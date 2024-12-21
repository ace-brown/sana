const HttpError = require("../models/http-error");

const users = [
    {
        id: "u1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "securepassword123",
    },
    {
        id: "u2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "password456",
    },
    {
        id: "u3",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: "mypassword789",
    },
];


// Get all users
function getUsers(req, res, next) {
    res.json({ users: users })
}

// Create a new user
function signup(req, res, next) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const createdUser = {
        id: Math.random().toString(36),
        name,
        email,
        password
    }

    users.push(createdUser)
    res.status(201).json({ message: "User created successfully" })
}

// Login an existing user
function login(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    const user = users.find(u => u.email === email && u.password === password)

    if (!user || user.password !== password) {
        throw new HttpError('Invalid username or password', 404)
    }

    res.json({ message: "Logged in successfully", userId: user.id })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login