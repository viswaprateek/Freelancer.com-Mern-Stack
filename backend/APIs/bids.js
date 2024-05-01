// APIs/bids.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
 // Assuming you have a middleware to handle DB connections


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

// POST /bids/save - Assumes job ID is part of the bidData
router.post('/save', connectDB, async (req, res) => {
    try {
      const bidData = req.body;
      const db = req.dbClient.db('freelancers');
      const bidsCollection = db.collection('bidscollections');
      const result = await bidsCollection.insertOne(bidData); // Use insertOne to insert a single document
      res.status(201).json(result.ops[0]); // Return the newly created bid
    } catch (error) {
      console.error('Error placing bid:', error);
      res.status(500).json({ message: 'Failed to place bid' });
    } finally {
      req.dbClient.close();
    }
  });
  
// GET /bids/myjobs - Fetch all jobs/contracts related to the user
router.get('/myjobs', connectDB, async (req, res) => {
    try {
      const userId = req.userId; // Assume the user's ID is set in some way, e.g., through authentication middleware
      const db = req.dbClient.db('freelancers');
      const jobsCollection = db.collection('jobscollections');
      const contracts = await jobsCollection.find({ ownerId: userId }).toArray();
      res.status(200).json(contracts);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      res.status(500).json({ message: 'Failed to fetch contracts' });
    } finally {
      req.dbClient.close();
    }
  });
// POST /bids/accept/:bidId - Set a bid's status to 'accepted'
router.post('/accept/:bidId', connectDB, async (req, res) => {
    try {
      const { bidId } = req.params;
      const db = req.dbClient.db('freelancers');
      const bidsCollection = db.collection('bidscollections');
      const result = await bidsCollection.updateOne({ _id: ObjectId(bidId) }, { $set: { status: 'accepted' } });
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Bid not found' });
      }
      res.status(200).json({ message: 'Bid accepted' });
    } catch (error) {
      console.error('Error accepting bid:', error);
      res.status(500).json({ message: 'Failed to accept bid' });
    } finally {
      req.dbClient.close();
    }
  });
// POST /bids/close/:bidId - Close a bid
router.post('/close/:bidId', connectDB, async (req, res) => {
    try {
      const { bidId } = req.params;
      const db = req.dbClient.db('freelancers');
      const bidsCollection = db.collection('bidscollections');
      const result = await bidsCollection.updateOne({ _id: ObjectId(bidId) }, { $set: { status: 'closed' } });
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Bid not found' });
      }
      res.status(200).json({ message: 'Bid closed' });
    } catch (error) {
      console.error('Error closing bid:', error);
      res.status(500).json({ message: 'Failed to close bid' });
    } finally {
      req.dbClient.close();
    }
  });
// GET /job/view/:jobId - Fetch a single job by ID
router.get('/view/:jobId', connectDB, async (req, res) => {
    try {
      const { jobId } = req.params;
      const db = req.dbClient.db('freelancers');
      const jobsCollection = db.collection('jobscollections');
      const job = await jobsCollection.findOne({_id: ObjectId(jobId)});
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ message: 'Failed to fetch job' });
    } finally {
      req.dbClient.close();
    }
  });
// GET /job/bids/:jobId - Fetch all bids for a specific job
router.get('/bids/:jobId', connectDB, async (req, res) => {
    try {
      const { jobId } = req.params;
      const db = req.dbClient.db('freelancers');
      const bidsCollection = db.collection('bidscollections');
      const bids = await bidsCollection.find({job: ObjectId(jobId)}).toArray();
      if (!bids) {
        return res.status(404).json({ message: 'No bids found for this job' });
      }
      res.status(200).json(bids);
    } catch (error) {
      console.error('Error fetching bids:', error);
      res.status(500).json({ message: 'Failed to fetch bids' });
    } finally {
      req.dbClient.close();
    }
  });
// POST /job/save - Save a new bid (should probably be /job/:jobId/bid to be RESTful)

  
              








// Fetch all bids for a specific job
router.get('/job/:jobId', connectDB, async (req, res) => {
    const { jobId } = req.params;
    try {
        const db = req.dbClient.db('freelancers');
        const bidsCollection = db.collection('bidscollections');
        const bids = await bidsCollection.find({ job: ObjectId(jobId) }).toArray();
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ message: 'Failed to fetch bids' });
    } finally {
        req.dbClient.close();
    }
});

// Post a new bid to a job
router.post('/job/:jobId', connectDB, async (req, res) => {
    const { jobId } = req.params;
    const bidData = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const bidsCollection = db.collection('bidscollections');
        const result = await bidsCollection.insertOne({
            ...bidData,
            job: ObjectId(jobId),
            status: 'pending' // default status
        });
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error posting bid:', error);
        res.status(500).json({ message: 'Failed to post bid' });
    } finally {
        req.dbClient.close();
    }
});

// Update a bid (e.g., accepting a bid)
router.put('/:bidId', connectDB, async (req, res) => {
    const { bidId } = req.params;
    const updates = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const bidsCollection = db.collection('bidscollections');
        const result = await bidsCollection.findOneAndUpdate(
            { _id: ObjectId(bidId) },
            { $set: updates },
            { returnOriginal: false }
        );
        if (!result.value) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json(result.value);
    } catch (error) {
        console.error('Error updating bid:', error);
        res.status(500).json({ message: 'Failed to update bid' });
    } finally {
        req.dbClient.close();
    }
});

// Delete a bid
router.delete('/:bidId', connectDB, async (req, res) => {
    const { bidId } = req.params;
    try {
        const db = req.dbClient.db('freelancers');
        const bidsCollection = db.collection('bidscollections');
        const result = await bidsCollection.deleteOne({ _id: ObjectId(bidId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
        console.error('Error deleting bid:', error);
        res.status(500).json({ message: 'Failed to delete bid' });
    } finally {
        req.dbClient.close();
    }
});

module.exports = router;
