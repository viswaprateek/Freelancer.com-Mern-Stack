const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) return res.status(401).send('Access denied. No token provided.');

    // Check if the token starts with 'Bearer'
    if (!header.startsWith('Bearer ')) return res.status(401).send('Invalid token format. Token must be a Bearer token.');

    // Extract the token from 'Bearer '
    const token = header.substring(7);
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('User not found based on token.');
        }
        req.user = user;
        next();
    } catch (error) {
        // You can further differentiate between different types of JWT errors if needed
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token has expired.');
        } else {
            return res.status(400).send('Invalid token.');
        }
    }
};

module.exports = authMiddleware;
