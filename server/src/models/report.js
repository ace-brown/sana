const mongoose = require('mongoose')


const defaultStages = [
    {
        stageTitle: "Idea Evaluation",
        status: "Not Started",
        tasks: [
            { taskTitle: "Brainstorming Session", completed: false },
            { taskTitle: "Market Research", completed: false },
            { taskTitle: "Competitor Analysis", completed: false },
            { taskTitle: "Feasibility Study", completed: false },
        ],
    },
    {
        stageTitle: "Prototype Development",
        status: "Not Started",
        tasks: [
            { taskTitle: "Sketch Initial Design", completed: false },
            { taskTitle: "Build MVP", completed: false },
            { taskTitle: "Test Prototype", completed: false },
        ],
    },
    {
        stageTitle: "Testing Phase",
        status: "Not Started",
        tasks: [
            { taskTitle: "Unit Testing", completed: false },
            { taskTitle: "Integration Testing", completed: false },
            { taskTitle: "User Feedback", completed: false },
        ],
    },
    {
        stageTitle: "Deployment",
        status: "Not Started",
        tasks: [
            { taskTitle: "Setup Hosting", completed: false },
            { taskTitle: "Configure Production", completed: false },
            { taskTitle: "Launch Product", completed: false },
        ],
    },
]

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true, immutable: true },
    completed: { type: Boolean, required: true },
});

const stageSchema = new mongoose.Schema({
    stageTitle: { type: String, required: true, immutable: true },
    status: { type: String, required: true, enum: ['Completed', 'In Progress', 'Not Started'] },
    tasks: { type: [taskSchema], required: true },
});

const reportSchema = new mongoose.Schema({
    ideaTitle: { type: String, required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Idea' },
    ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    stages: { type: [stageSchema], default: defaultStages },
    createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
    Report,
    defaultStages,
};
