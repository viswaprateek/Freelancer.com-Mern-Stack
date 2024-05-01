// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    skillsRequired: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'open' }, // Additional fields like status can be added here
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }] // Array of bids if needed
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
