const exp = require('express');
const router = exp.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// MongoDB connection URL
const mongoURL = process.env.DB_URL;

// Middleware to establish MongoDB connection
const connectDB = async (req, res, next) => {
    try {
        const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
        await client.connect();
        req.dbClient = client;
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Middleware to close MongoDB connection
const closeDB = (req, res, next) => {
    if (req.dbClient) {
        req.dbClient.close();
    }
    next();
};

// Get all jobs
router.get('/all', connectDB, async (req, res) => {
    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const jobs = await jobsCollection.find({}).toArray();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});
// Function to save a new job
// Assuming you have already set up your Express router and MongoDB connection

// Get jobs by user ID
router.get('/user/:userId', connectDB, async (req, res) => {
    const userId = req.params.userId;
    try {
      const db = req.dbClient.db('freelancers');
      const jobsCollection = db.collection('jobs');
      const jobs = await jobsCollection.find({ userId: userId }).toArray(); // Assuming userId is a field in the jobs document
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching jobs by user ID:', error);
      res.status(500).json({ message: 'Failed to fetch jobs by user ID' });
    }
  });
  

// Save a new job
router.post('/save', connectDB, async (req, res) => {
    const jobData = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const result = await jobsCollection.insertOne(jobData);
        res.status(201).json({ jobId: result.insertedId });
    } catch (error) {
        console.error('Error saving job:', error);
        res.status(500).json({ message: 'Failed to save job' });
    }
});

// Delete a job
router.delete('/delete/:jobId', connectDB, async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const result = await jobsCollection.deleteOne({ _id: ObjectId(jobId) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Job deleted successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Failed to delete job' });
    }
});

// Update a job
router.put('/save/:jobId', connectDB, async (req, res) => {
    const jobId = req.params.jobId;
    const updatedData = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const result = await jobsCollection.updateOne({ _id: ObjectId(jobId) }, { $set: updatedData });
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Job updated successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job' });
    }
});

// Update a job
router.put('/save/:jobId', connectDB, async (req, res) => {
    const jobId = req.params.jobId;
    const updatedData = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const result = await jobsCollection.updateOne(
            { _id: ObjectId(jobId) }, // Filter for the job to update
            { $set: updatedData } // New data to set for the job
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Job updated successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job' });
    }
});


router.post('/job/:jobId/bid', connectDB, async (req, res) => {
    const { jobId } = req.params;
    const bidData = req.body;

    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        const updateResult = await jobsCollection.updateOne(
            { _id: ObjectId(jobId) },
            { $push: { bids: bidData } }
        );

        if (updateResult.modifiedCount === 1) {
            res.status(200).json({ message: 'Bid added successfully to the job.' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error posting bid to job:', error);
        res.status(500).json({ message: 'Failed to post bid to job' });
    } finally {
        req.dbClient.close();
    }
});


// Get a job by ID along with its bids
router.get('/view/:jobId', connectDB, async (req, res) => {
    const { jobId } = req.params;

    try {
        const db = req.dbClient.db('freelancers');
        const jobsCollection = db.collection('jobs');
        console.log(ObjectId(jobId))
        const job = await jobsCollection.findOne({ _id: ObjectId(jobId) });

        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Failed to fetch job' });
    } finally {
        req.dbClient.close();
    }
});



module.exports = router;
