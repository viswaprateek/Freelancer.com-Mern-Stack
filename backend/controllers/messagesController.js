// controllers/messagesController.js
const Message = require('../models/Message');

exports.getMessagesByContractId = async (req, res) => {
    try {
        const messages = await Message.find({ contractId: req.params.contractId });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// controllers/messagesController.js

// controllers/messagesController.js
const mongoose = require('mongoose');

exports.postMessage = async (req, res) => {
    const { contractId, senderId, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(contractId)) {
        return res.status(400).json({ message: 'Invalid ID(s) provided' });
    }

    try {
        const newMessage = new Message({ contractId, senderId, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error posting message', error });
    }
};
