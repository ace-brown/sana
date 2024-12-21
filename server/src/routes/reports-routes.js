const express = require('express')
const router = express.Router()

const reportsControllers = require('../controllers/reports-controllers')

// Get a spesific report by a specific tracking id 
router.get('/:tid', reportsControllers.getReportById)

// Get all reports for a specific user with a userId
router.get('/user/:uid', reportsControllers.getReportsByUserId)

// Create a new report
router.post('/', reportsControllers.createReport)

// Update a report
router.patch('/:tid', reportsControllers.updateReport)

// Delete a report
router.delete('/:tid', reportsControllers.deleteReport)

module.exports = router