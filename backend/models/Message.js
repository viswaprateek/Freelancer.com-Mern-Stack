// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
