const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users-controllers')
const { check } = require('express-validator')

// Get current user 
router.get('/:uid', usersControllers.getCurrentUser)

// Get the list of users 
router.get('/', usersControllers.getUsers)

// Create a new user
router.post('/signup', [
    check('username')
        .notEmpty(),
    check('email')
        .normalizeEmail()
        .isEmail(),
    check('password')
        .isLength({ min: 6 }),
    check('fullName')
        .notEmpty()
], usersControllers.signup)

// Log in a user
router.post('/login', usersControllers.login)

// Update a user
router.patch('/:uid', usersControllers.updateUser)

// Delete a user
router.delete('/:uid', usersControllers.deleteUser)

module.exports = router