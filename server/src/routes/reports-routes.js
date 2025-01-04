const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const reportsControllers = require('../controllers/reports-controllers')

// Get a spesific report by a specific report id 
router.get('/:rid', reportsControllers.getReportById)

// Create a new report
router.post(
    '/',
    [
        check('ideaTitle').notEmpty(),
        check('ownerId').notEmpty()
    ],
    reportsControllers.createReport
)

// Update a report
router.patch('/:rid', reportsControllers.updateReport)

// Delete a report
// router.delete('/:rid', reportsControllers.deleteReport)

module.exports = router