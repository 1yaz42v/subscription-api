import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Make sure you have a .env file with JWT_SECRET defined
// e.g., JWT_SECRET=your_super_secret_key
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables!');
}

const authorize = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user from decoded token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized: User not found' });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware or route
        next();
        
    } catch (error) {
        // Handle token errors (invalid, expired, etc.)
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

export default authorize;
