const HttpError = require('../models/http-error')


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
function getReportById(req, res, next) {
    const trackingId = req.params.tid;
    const report = reports.find(r => r.trackingId === trackingId);
    if (!report) {
        return next(new HttpError("Could not find a report for the provided id", 404))
    }
    res.json({ report })
}

// Get all reports for a specific user with a userId
function getReportsByUserId(req, res, next) {
    const userId = req.params.uid;
    const reportsForUser = reports.filter(r => r.owner === userId)
    if (!reportsForUser || reportsForUser.length === 0) {
        return next(new HttpError("Could not find reports for the provided user id", 404))
    }
    res.json({ reportsForUser })
}

// Create a new report
function createReport(req, res, next) {
    const { ideaTitle, owner, stages } = req.body;
    const newTrackingId = `TC-${1000 + reports.length + 1}`;

    const newReport = {
        trackingId: newTrackingId,
        ideaTitle: ideaTitle,
        owner: owner,
        stages: stages
    }
    reports.push(newReport)
    res.status(201).json({ newReport })
}

// Update a specific report
function updateReport(req, res, next) {
    const trackingId = req.params.tid;
    const reportIndex = reports.findIndex(r => r.trackingId === trackingId);

    if (reportIndex === -1) {
        return next(new HttpError("Could not find a report for the provided id", 404))
    }

    const updatedReport = { ...reports[reportIndex], ...req.body };
    reports[reportIndex] = updatedReport;

    res.json({ report: updatedReport })
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