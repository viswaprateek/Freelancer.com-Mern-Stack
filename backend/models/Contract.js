// models/Contract.js
const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidAmount: Number,
  completionDate: Date
});

module.exports = mongoose.model('Contract', contractSchema);
