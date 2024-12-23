const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const { Report, defaultStages } = require('../models/report')


const reports = [
    {
        trackingId: "TC-1001",
        ideaTitle: "E-Commerce Platform",
        owner: "u2",
        stages: [
            {
                title: "Idea Evaluation",
                status: "Completed",
                tasks: [
                    { title: "Brainstorming Session", completed: true },
                    { title: "Market Research", completed: true },
                    { title: "Competitor Analysis", completed: true },
                    { title: "Feasibility Study", completed: true },
                ],
            },
            {
                title: "Prototype Development",
                status: "In Progress",
                tasks: [
                    { title: "Sketch Initial Design", completed: true },
                    { title: "Build MVP", completed: false },
                    { title: "Test Prototype", completed: false },
                ],
            },
            {
                title: "Testing Phase",
                status: "Pending",
                tasks: [
                    { title: "Unit Testing", completed: false },
                    { title: "Integration Testing", completed: false },
                    { title: "User Feedback", completed: false },
                ],
            },
            {
                title: "Deployment",
                status: "Pending",
                tasks: [
                    { title: "Setup Hosting", completed: false },
                    { title: "Configure Production", completed: false },
                    { title: "Launch Product", completed: false },
                ],
            },
        ],
    },
    {
        trackingId: "TC-2002",
        ideaTitle: "Health & Fitness App",
        owner: "u2",
        stages: [
            {
                title: "Idea Evaluation",
                status: "Completed",
                tasks: [
                    { title: "Identify Target Audience", completed: true },
                    { title: "Define Core Features", completed: true },
                    { title: "Conduct Market Analysis", completed: true },
                    { title: "Assess Development Costs", completed: true },
                ],
            },
            {
                title: "Prototype Development",
                status: "In Progress",
                tasks: [
                    { title: "Create Wireframes", completed: true },
                    { title: "Develop Frontend Prototype", completed: false },
                    { title: "Backend Integration", completed: false },
                ],
            },
            {
                title: "Testing Phase",
                status: "Pending",
                tasks: [
                    { title: "Usability Testing", completed: false },
                    { title: "Bug Fixing", completed: false },
                    { title: "Performance Testing", completed: false },
                ],
            },
            {
                title: "Deployment",
                status: "Pending",
                tasks: [
                    { title: "Prepare Marketing Materials", completed: false },
                    { title: "Publish to App Store", completed: false },
                    { title: "Announce Launch", completed: false },
                ],
            },
        ],
    }

];

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
        reportsForUser = await Report.find({ owner: userId })
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

    const { ideaTitle, owner } = req.body;
    const trackingId = `t-${nanoid(10)}`;

    const newReport = new Report({
        trackingId,
        ideaTitle,
        owner,
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

        res.status(200).json({ report: updatedReport });

    } catch (error) {
        return next(new HttpError("Updating report failed, please try again later.", 500));
    }
}


// Delete a specific report
function deleteReport(req, res, next) {
    const trackingId = req.params.tid;
    const reportIndex = reports.findIndex(r => r.trackingId === trackingId);

    if (reportIndex === -1) {
        return next(new HttpError("Could not find a report for the provided id", 404))
    }

    reports.splice(reportIndex, 1);
    res.status(200).json({ message: "Report deleted successfully" })
}


exports.getReportById = getReportById
exports.getReportsByUserId = getReportsByUserId
exports.createReport = createReport
exports.updateReport = updateReport
exports.deleteReport = deleteReport