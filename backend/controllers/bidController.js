const Bid = require('../models/bidModel'); // Your Bid model

exports.placeBid = async (req, res) => {
    const { amount, proposedCompletionDate, jobId, userId } = req.body;
    try {
        const newBid = new Bid({
            amount,
            proposedCompletionDate,
            jobId,
            userId
        });
        await newBid.save();
        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
        res.status(500).json({ message: 'Error placing bid', error: error.message });
    }
};


exports.getBidsByJobId = async (req, res) => {
    try {
        const bids = await Bid.find({ jobId: req.params.jobId }).populate('userId', 'name'); // Adjust populate as needed
        if (!bids.length) {
            return res.status(404).json({ message: 'No bids found for this job' });
        }
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bids', error: error.message });
    }
};