const mongoose = require('mongoose')


const defaultStages = [
    {
        title: "Idea Evaluation",
        status: "Not Started",
        tasks: [
            { title: "Brainstorming Session", completed: false },
            { title: "Market Research", completed: false },
            { title: "Competitor Analysis", completed: false },
            { title: "Feasibility Study", completed: false },
        ],
    },
    {
        title: "Prototype Development",
        status: "Not Started",
        tasks: [
            { title: "Sketch Initial Design", completed: false },
            { title: "Build MVP", completed: false },
            { title: "Test Prototype", completed: false },
        ],
    },
    {
        title: "Testing Phase",
        status: "Not Started",
        tasks: [
            { title: "Unit Testing", completed: false },
            { title: "Integration Testing", completed: false },
            { title: "User Feedback", completed: false },
        ],
    },
    {
        title: "Deployment",
        status: "Not Started",
        tasks: [
            { title: "Setup Hosting", completed: false },
            { title: "Configure Production", completed: false },
            { title: "Launch Product", completed: false },
        ],
    },
]

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, immutable: true },
    completed: { type: Boolean, required: true },
});

const stageSchema = new mongoose.Schema({
    title: { type: String, required: true, immutable: true },
    status: { type: String, required: true, enum: ['Completed', 'In Progress', 'Not Started'] },
    tasks: { type: [taskSchema], required: true },
});

const reportSchema = new mongoose.Schema({
    trackingId: { type: String, required: true, unique: true },
    ideaTitle: { type: String, required: true },
    owner: { type: String, required: true },
    stages: { type: [stageSchema], default: defaultStages },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
    Report,
    defaultStages,
};
