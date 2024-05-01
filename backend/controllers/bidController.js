const Bid = require('../models/bidModel'); // Your Bid model
const Job = require('../models/Job');


exports.acceptBid = async (req, res) => {
    const bidId = req.params.bidId;
    try {
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Update the job to set it as closed and add this bid to the bids array
        const job = await Job.findByIdAndUpdate(
            bid.jobId,
            { $set: { status: 'closed' }, $push: { bids: bid._id } },
            { new: true }
        );
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Bid accepted', job });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting bid', error: error.message });
    }
};
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