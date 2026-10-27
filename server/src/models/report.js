const mongoose = require('mongoose');

const defaultStages = [
    {
        stageTitle: "Idea Evaluation",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "Brainstorming Session", taskStatus: "Not Started", description: "" },
            { taskTitle: "Market Research", taskStatus: "Not Started", description: "" },
            { taskTitle: "Competitor Analysis", taskStatus: "Not Started", description: "" },
            { taskTitle: "Feasibility Study", taskStatus: "Not Started", description: "" },
        ],
    },
    {
        stageTitle: "Prototype Development",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "Initial Design", taskStatus: "Not Started", description: "" },
            { taskTitle: "Build Prototype", taskStatus: "Not Started", description: "" },
            { taskTitle: "Prototype Testing", taskStatus: "Not Started", description: "" },
        ],
    },
    {
        stageTitle: "Testing",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "Unit Testing", taskStatus: "Not Started", description: "" },
            { taskTitle: "Integration Testing", taskStatus: "Not Started", description: "" },
            { taskTitle: "User Feedback", taskStatus: "Not Started", description: "" },
        ],
    },
    {
        stageTitle: "Development and Deployment",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "Hosting Setup", taskStatus: "Not Started", description: "" },
            { taskTitle: "Production Configuration", taskStatus: "Not Started", description: "" },
            { taskTitle: "Product Launch", taskStatus: "Not Started", description: "" },
        ],
    },
];

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true, immutable: true },
    taskStatus: { type: String, required: true, enum: ['Completed', 'In Progress', 'Not Started'] },
    description: { type: String, default: "" },
});

const stageSchema = new mongoose.Schema({
    stageTitle: { type: String, required: true, immutable: true },
    stageStatus: { type: String, required: true, enum: ['Completed', 'In Progress', 'Not Started'] },
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
