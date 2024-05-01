const Message = require('../models/Message');

// Fetch all messages for a contract
exports.getMessagesByContractId = async (req, res) => {
    try {
        const messages = await Message.findOne({ contractId: req.params.contractId });
        res.json(messages || { message: 'No messages found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Post a new message to the contract
exports.postMessage = async (req, res) => {
    const { contractId, senderId, text } = req.body;
    try {
        const message = await Message.findOneAndUpdate(
            { contractId },
            { $push: { messages: { senderId, text } } },
            { new: true, upsert: true } // upsert option will create the document if it doesn't exist
        );
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error posting message', error });
    }
};
