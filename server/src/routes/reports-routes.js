const express = require('express')

const router = express.Router()

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


router.get('/:tid', function (req, res) {
    const trackingId = req.params.tid;
    const report = reports.find(r => r.trackingId === trackingId);
    res.json({ report })
})

router.get('/user/:uid', function (req, res) {
    const userId = req.params.uid;
    const reportsForUser = reports.filter(r => r.owner === userId)
    res.json({ reportsForUser })
})

module.exports = router