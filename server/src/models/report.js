const mongoose = require('mongoose')


const defaultStages = [
    {
        stageTitle: "ارزیابی ایده",
        status: "Not Started",
        tasks: [
            { taskTitle: "جلسه طوفان فکری", completed: false },
            { taskTitle: "تحقیق بازار", completed: false },
            { taskTitle: "تحلیل رقبا", completed: false },
            { taskTitle: "مطالعه امکان‌سنجی", completed: false },
        ],
    },
    {
        stageTitle: "توسعه نمونه اولیه",
        status: "Not Started",
        tasks: [
            { taskTitle: "طراحی اولیه", completed: false },
            { taskTitle: "ساخت MVP", completed: false },
            { taskTitle: "آزمایش نمونه اولیه", completed: false },
        ],
    },
    {
        stageTitle: "مرحله آزمایش",
        status: "Not Started",
        tasks: [
            { taskTitle: "آزمایش واحد", completed: false },
            { taskTitle: "آزمایش یکپارچه‌سازی", completed: false },
            { taskTitle: "بازخورد کاربران", completed: false },
        ],
    },
    {
        stageTitle: "توسعه و استقرار",
        status: "Not Started",
        tasks: [
            { taskTitle: "راه‌اندازی هاست", completed: false },
            { taskTitle: "پیکربندی تولید", completed: false },
            { taskTitle: "عرضه محصول", completed: false },
        ],
    },
];


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
