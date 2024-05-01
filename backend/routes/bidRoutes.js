const express = require('express');
const router = express.Router();
const { placeBid , getBidsByJobId } = require('../controllers/bidController');


router.post('/save', placeBid);
router.get('/job/:jobId',  getBidsByJobId);
module.exports = router;
