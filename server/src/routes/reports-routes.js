const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const reportsControllers = require('../controllers/reports-controllers')

// Get a spesific report by a specific tracking id 
router.get('/:tid', reportsControllers.getReportById)

// Get all reports for a specific user with a userId
router.get('/user/:uid', reportsControllers.getReportsByUserId)

// Create a new report
router.post(
    '/',
    [
        check('ideaTitle').notEmpty(),
        check('owner').notEmpty()
    ],
    reportsControllers.createReport
)

// Update a report
router.patch('/:tid', reportsControllers.updateReport)

// Delete a report
router.delete('/:tid', reportsControllers.deleteReport)

module.exports = router