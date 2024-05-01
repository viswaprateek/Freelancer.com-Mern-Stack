const express = require('express');
const router = express.Router();
const { placeBid , getBidsByJobId ,acceptBid} = require('../controllers/bidController');


router.post('/save', placeBid);
router.get('/job/:jobId',  getBidsByJobId);
router.get('/accept/:bidId',  acceptBid);

module.exports = router;
