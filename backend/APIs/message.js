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


router.get('/job_room/:jobId', async (req, res) => {
    const jobId = req.params.jobId;
    try {
      const messages = await Message.find({ jobId: jobId }).sort({ createdAt: 1 }); // Assuming messages are sorted by creation time
      res.json(messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.post('/job_room/send', async (req, res) => {
    const { jobId, fromUserId, message } = req.body; // Ensure these are passed from the frontend
  
    try {
      const newMessage = new Message({
        jobId,
        fromUserId,
        message,
        createdAt: new Date() // Optionally set the time the message was created
      });
  
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;
