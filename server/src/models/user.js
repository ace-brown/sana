const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now },
    reports: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Report' }],
    ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }], // A user can own multiple ideas
    profile: {
        fullName: { type: String, required: true },
        bio: { type: String, maxlength: 500 },
        avatar: { type: String },
    },
    settings: {
        language: { type: String, default: 'en', enum: ['en', 'fa'] },
        notifications: { type: Boolean, default: true },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
