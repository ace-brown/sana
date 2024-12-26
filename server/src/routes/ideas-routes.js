const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const ideasControllers = require('../controllers/ideas-controllers')

// Get a spesific report by a specific tracking id 
router.get('/:rid', ideasControllers.getIdeaById)

// Get all reports for a specific user with a userId
router.get('/user/:uid', ideasControllers.getIdeasByUserId)

// Create a new report
router.post(
    '/',
    [
        check('ideaTitle').notEmpty(),
        check('ownerId').notEmpty()
    ],
    ideasControllers.createIdea
)

// Update a report
router.patch('/:rid', ideasControllers.updateIdea)

// Delete a report
router.delete('/:rid', ideasControllers.deleteIdea)

module.exports = router