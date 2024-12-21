const express = require('express')
const router = express.Router()

const reportsControllers = require('../controllers/reports-controllers')

// Get a spesific report by a specific tracking id 
router.get('/:tid', reportsControllers.getReportsById)

// Get all reports for a specific user with a userId
router.get('/user/:uid', reportsControllers.getAllReportsByUserId)

module.exports = router