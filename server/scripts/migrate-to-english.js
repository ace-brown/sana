// One-off migration: rewrites Persian values stored in the database to English.
// Covers cost service names, report stage/task titles and idea branch fields.
// Usage (same env vars as index.js): node scripts/migrate-to-english.js
const mongoose = require('mongoose');

const names = {
    "جلسه ایده پردازی": "Brainstorming Session",
    "تحقیق بازار": "Market Research",
    "تحلیل رقبا": "Competitor Analysis",
    "مطالعه امکان‌سنجی": "Feasibility Study",
    "طراحی اولیه": "Initial Design",
    "ساخت نمونه اولیه": "Build Prototype",
    "آزمایش نمونه اولیه": "Prototype Testing",
    "آزمایش واحد": "Unit Testing",
    "آزمایش یکپارچه‌سازی": "Integration Testing",
    "بازخورد کاربران": "User Feedback",
    "راه اندازی وبسایت و هاست": "Website and Hosting Setup",
    "راه‌اندازی هاست": "Hosting Setup",
    "پیکربندی تولید": "Production Configuration",
    "عرضه محصول": "Product Launch",
    // Stage titles
    "ارزیابی ایده": "Idea Evaluation",
    "توسعه نمونه اولیه": "Prototype Development",
    "آزمایش": "Testing",
    "توسعه و استقرار": "Development and Deployment",
};

const branches = {
    "علوم انسانی": "Humanities",
    "هنر": "Arts",
    "علوم تجربی": "Natural Sciences",
    "مهندسی": "Engineering",
    "تربیت بدنی": "Physical Education",
    "سایر": "Other",
    "ادبیات": "Literature",
    "زبان‌شناسی": "Linguistics",
    "فلسفه": "Philosophy",
    "جغرافیا": "Geography",
    "تاریخ": "History",
    "دین": "Religion",
    "روان‌شناسی": "Psychology",
    "جامعه‌شناسی": "Sociology",
    "بازاریابی": "Marketing",
    "امور مالی": "Finance",
    "اقتصاد": "Economics",
    "مدیریت بازرگانی": "Business Administration",
    "گردشگری": "Tourism",
    "حسابداری": "Accounting",
    "حقوق": "Law",
    "نقاشی": "Painting",
    "مجسمه‌سازی": "Sculpture",
    "عکاسی": "Photography",
    "هنرهای نمایشی": "Performing Arts",
    "طراحی لباس": "Costume Design",
    "طراحی مد": "Fashion Design",
    "طراحی دوخت": "Tailoring Design",
    "طراحی پارچه": "Textile Design",
    "کتابت و نگارگری": "Calligraphy and Miniature Painting",
    "موسیقی": "Music",
    "طراحی صنعتی": "Industrial Design",
    "فرش": "Carpet Weaving",
    "طلا و جواهر": "Gold and Jewelry",
    "گرافیک": "Graphic Design",
    "زیست‌ فناوری": "Biotechnology",
    "پزشکی": "Medicine",
    "مهندسی پزشکی": "Biomedical Engineering",
    "زمین‌ شناسی": "Geology",
    "مهندسی برق": "Electrical Engineering",
    "مهندسی مکانیک": "Mechanical Engineering",
    "علوم کامپیوتر": "Computer Science",
    "معماری": "Architecture",
    "مهندسی محاسباتی": "Computational Engineering",
    "مهندسی زیست‌ محیطی": "Environmental Engineering",
};

const tr = (map, value) => map[value] || value;

async function migrate() {
    const db = mongoose.connection.db;

    let count = 0;
    for await (const cost of db.collection('costs').find()) {
        const selectedServices = cost.selectedServices.map(s => ({ ...s, serviceName: tr(names, s.serviceName) }));
        await db.collection('costs').updateOne({ _id: cost._id }, { $set: { selectedServices } });
        count++;
    }
    console.log(`Costs migrated: ${count}`);

    count = 0;
    for await (const report of db.collection('reports').find()) {
        const stages = report.stages.map(stage => ({
            ...stage,
            stageTitle: tr(names, stage.stageTitle),
            tasks: stage.tasks.map(task => ({ ...task, taskTitle: tr(names, task.taskTitle) })),
        }));
        await db.collection('reports').updateOne({ _id: report._id }, { $set: { stages } });
        count++;
    }
    console.log(`Reports migrated: ${count}`);

    count = 0;
    for await (const idea of db.collection('ideas').find()) {
        const update = { branchOfStudy: tr(branches, idea.branchOfStudy) };
        if (idea.branchDetail) update.branchDetail = tr(branches, idea.branchDetail);
        await db.collection('ideas').updateOne({ _id: idea._id }, { $set: update });
        count++;
    }
    console.log(`Ideas migrated: ${count}`);
}

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.SUFFIX}.${process.env.AFTER_SUFFIX}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`)
    .then(migrate)
    .catch((err) => { console.log(err) })
    .finally(() => mongoose.disconnect())
