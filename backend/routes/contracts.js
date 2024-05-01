const express = require('express');
const router = express.Router();
const { getContractsByUser ,getContractById} = require('../controllers/contractController');

router.get('/user/:userId', getContractsByUser);
// In your contractsRouter.js or a similar file

router.get('/:contractId', getContractById);

module.exports = router;
