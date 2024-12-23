const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const { Report, defaultStages } = require('../models/report')


// Get a spesific report by a specific tracking id 
async function getReportById(req, res, next) {
    const reportId = req.params.rid;
    let report;

    try {
        report = await Report.findById(reportId);
    } catch (err) {
        return next(new HttpError("Something went wrong, couldn't find report.", 500))
    }

    if (!report) {
        return next(new HttpError("Could not find a report for the provided id", 404))
    }

    res.json({ report: report.toObject({ getters: true }) })
}

// Get all reports for a specific user with a userId
async function getReportsByUserId(req, res, next) {
    const userId = req.params.uid;

    let reportsForUser;

    try {
        reportsForUser = await Report.find({ ownerId: userId })
    } catch (err) {
        return next(new HttpError("Fetching reports faild, please try again later", 500))
    }

    if (!reportsForUser || reportsForUser.length === 0) {
        return next(new HttpError("Could not find reports for the provided user id", 404))
    }

    res.json({ reportsForUser: reportsForUser.map(r => r.toObject({ getters: true })) })
}

// Create a new report
async function createReport(req, res, next) {
    const { nanoid } = await import('nanoid');
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new HttpError("Invalid input passed, please check your data", 422)
    }

    const { ideaTitle, ownerId } = req.body;
    const trackingId = `t-${nanoid(10)}`;

    const newReport = new Report({
        trackingId,
        ideaTitle,
        ownerId,
        stages: defaultStages,
    });

    try {
        await newReport.save();
    } catch (err) {
        return next(new HttpError("Creating report failed, please try again later.", 500))
    }

    res.status(201).json({ report: newReport });
}

// Update a specific report
async function updateReport(req, res, next) {
    const reportId = req.params.rid;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return next(new HttpError("Invalid report ID", 400));
        }

        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            updates,
            { new: true, runValidators: true }
        );


        if (!updatedReport) {
            return next(new HttpError("Could not find a report for the provided ID", 404));
        }

        res.status(200).json({ report: updatedReport.toObject({ getters: true }) });

    } catch (error) {
        return next(new HttpError("Updating report failed, please try again later.", 500));
    }
}


// Delete a specific report
async function deleteReport(req, res, next) {
    const reportId = req.params.rid;

    try {
        const deletedReport = await Report.findByIdAndDelete(reportId);

        if (!deletedReport) {
            return next(new HttpError("Could not find a report for the provided ID", 404));
        }

        res.status(200).json({ message: "Report deleted successfully!" });

    } catch (err) {

        return next(new HttpError("Deleting the report failed, please try again later.", 500));

    }

}


exports.getReportById = getReportById
exports.getReportsByUserId = getReportsByUserId
exports.createReport = createReport
exports.updateReport = updateReport
exports.deleteReport = deleteReport