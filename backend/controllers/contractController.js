const Contract = require('../models/Contract');

exports.getContractsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const contracts = await Contract.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    }).populate('jobId').populate('bidId').populate('clientId').populate('freelancerId');

    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contracts', error });
  }
};
