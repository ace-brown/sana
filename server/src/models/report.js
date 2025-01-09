const mongoose = require('mongoose')


const defaultStages = [
    {
        stageTitle: "ارزیابی ایده",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "جلسه ایده پردازی", taskStatus: "Not Started" },
            { taskTitle: "تحقیق بازار", taskStatus: "Not Started" },
            { taskTitle: "تحلیل رقبا", taskStatus: "Not Started" },
            { taskTitle: "مطالعه امکان‌سنجی", taskStatus: "Not Started" },
        ],
    },
    {
        stageTitle: "توسعه نمونه اولیه",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "طراحی اولیه", taskStatus: "Not Started" },
            { taskTitle: "ساخت MVP", taskStatus: "Not Started" },
            { taskTitle: "آزمایش نمونه اولیه", taskStatus: "Not Started" },
        ],
    },
    {
        stageTitle: "آزمایش",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "آزمایش واحد", taskStatus: "Not Started" },
            { taskTitle: "آزمایش یکپارچه‌سازی", taskStatus: "Not Started" },
            { taskTitle: "بازخورد کاربران", taskStatus: "Not Started" },
        ],
    },
    {
        stageTitle: "توسعه و استقرار",
        stageStatus: "Not Started",
        tasks: [
            { taskTitle: "راه‌اندازی هاست", taskStatus: "Not Started" },
            { taskTitle: "پیکربندی تولید", taskStatus: "Not Started" },
            { taskTitle: "عرضه محصول", taskStatus: "Not Started" },
        ],
    },
];


const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true, immutable: true },
    taskStatus: { type: String, required: true, enum: ['Completed', 'In Progress', 'Not Started'] },
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
