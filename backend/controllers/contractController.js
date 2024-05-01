// In your controller file, e.g., contractsController.js
const Contract = require('../models/Contract'); // Assuming you have a Contract model

// In your contractsController.js
exports.getContractsByUser = async (req, res) => {
    console.log('Fetching contracts for user:', req.params.userId);  // Log user ID
    try {
        const contracts = await Contract.find({ $or: [{ clientId: req.params.userId }, { freelancerId: req.params.userId }] });
        console.log('Contracts found:', contracts);  // Log found contracts
        if (contracts.length === 0) {
            return res.status(404).json({ message: 'No contracts found for this user' });
        }
        res.json(contracts);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Error fetching contracts', error: error.message });
    }
};
