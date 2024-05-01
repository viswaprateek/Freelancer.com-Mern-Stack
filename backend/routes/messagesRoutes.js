// messagesRoutes.js

const express = require('express');
const router = express.Router();
const {getMessagesByContractId,postMessage} = require('../controllers/messagesController');

router.get('/:contractId', getMessagesByContractId);
router.post('/', postMessage);

module.exports = router;
