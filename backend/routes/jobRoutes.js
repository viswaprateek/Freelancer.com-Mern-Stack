const express = require('express');
const router = express.Router();
const { createJob,getJobsByUserId ,getJobById,getJobs} = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/new', authMiddleware, createJob);
router.get('/user/:userId', getJobsByUserId);
router.get('/view/:jobId', getJobById);

router.get('/all', getJobs);




module.exports = router;
