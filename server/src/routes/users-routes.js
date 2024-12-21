const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users-controllers')

// Get the list of users 
router.get('/', usersControllers.getUsers)

// Create a new user
router.post('/signup', usersControllers.signup)

// Log in a user
router.post('/login', usersControllers.login)



module.exports = router