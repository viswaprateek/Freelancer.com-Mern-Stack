const express = require('express');
const router = express.Router();
const { getContractsByUser } = require('../controllers/contractController');

router.get('/user/:userId', getContractsByUser);

module.exports = router;
