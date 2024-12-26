const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
    trackingId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    fatherName: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    career: { type: String, required: true, trim: true },
    maritalStatus: { type: String, },
    gender: { type: String, },
    mobileNumber: { type: String, required: true, match: /^\d{10,15}$/ },
    age: { type: Number, required: true, min: 0 },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    identificationNumber: { type: String, required: true, trim: true, },
    branchOfStudy: { type: String, required: true, trim: true },
    branchDetail: { type: String, required: true, trim: true, },
    ideaTitle: { type: String, required: true, trim: true, },
    ideaDescription: { type: String, required: true, trim: true, },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Idea", IdeaSchema);
