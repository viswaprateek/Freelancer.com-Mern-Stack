const exp = require('express');
const router = exp.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Create a new user
// Backend route
router.post('/auth/signup', connectDB, async (req, res) => {
    const { email, password, name, role, profile, projects, bids } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        const db = req.dbClient.db('freelancers');
        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne({ 
            email,
            password: hashedPassword,
            name,
            role,
            profile,
            projects,
            bids
        });
        res.status(201).json({ userId: result.insertedId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});





router.post('/auth/login', connectDB, async (req, res) => {
    const { name, password } = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ name });
        if (user) {
            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Passwords match, generate JWT token
                const token = jwt.sign({name: user.name}, process.env.JWT_SECRET, { expiresIn: '1d' });
                // Send token, user role, and user ID in response
                res.status(200).json({ token, role: user.role, id: user._id });
            } else {
                // Passwords don't match
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            // User not found
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Failed to retrieve user' });
    }
});



// Update user profile
router.put('/:userId', connectDB, async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    try {
        const db = req.dbClient.db('freelancers');
        const usersCollection = db.collection('users');
        const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updates });
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Failed to update user profile' });
    }
});

// Deactivate or delete user account
router.delete('/:userId', connectDB, async (req, res) => {
    const userId = req.params.userId;
    try {
        const db = req.dbClient.db('freelancers');
        const usersCollection = db.collection('users');
        const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'User account deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Failed to delete user account' });
    }
});


router.get('/profile', connectDB, async (req, res) => {
    try {
        const db = req.dbClient.db('your_database_name'); // Replace 'your_database_name' with your actual database name
        const profileCollection = db.collection('profiles'); // Assuming your profile collection is named 'profiles'
        const profile = await profileCollection.findOne({ /* Add query to find user profile */ });
        res.json(profile);
    } catch (error) {
        console.error('Error viewing profile:', error);
        res.status(500).json({ message: 'Failed to view profile' });
    }
});

// Save user profile
router.post('/profile/save', connectDB, async (req, res) => {
    const profileData = req.body;
    try {
        const db = req.dbClient.db('your_database_name'); // Replace 'your_database_name' with your actual database name
        const profileCollection = db.collection('profiles'); // Assuming your profile collection is named 'profiles'
        const result = await profileCollection.insertOne(profileData);
        res.status(201).json({ profileId: result.insertedId });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Failed to save profile' });
    }
});

module.exports = router;
