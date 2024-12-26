const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const ideasControllers = require('../controllers/ideas-controllers')

// Get a spesific idea by a specific idea id 
router.get('/:eid', ideasControllers.getIdeaById)

// Get all ideas for a specific user with a userId
router.get('/user/:uid', ideasControllers.getIdeasByUserId)

// Create a new idea
router.post(
    '/',
    [
        check('ownerId').notEmpty(),
        check('fullName').notEmpty(),
        check('fatherName').notEmpty(),
        check('city').notEmpty(),
        check('career').notEmpty(),
        check('maritalStatus').notEmpty(),
        check('gender').notEmpty(),
        check('mobileNumber').notEmpty(),
        check('age').notEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('identificationNumber').notEmpty(),
        check('branchOfStudy').notEmpty(),
        check('branchDetail').notEmpty(),
        check('ideaTitle').notEmpty(),
        check('ideaDescription').notEmpty(),
    ],
    ideasControllers.createIdea
)

// Update a idea
router.patch('/:eid', ideasControllers.updateIdea)

// Delete a idea
router.delete('/:eid', ideasControllers.deleteIdea)

module.exports = router