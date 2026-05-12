const jwt = require('jsonwebtoken');

// Token Verification Middleware (JWT)
exports.verifyToken = (req, res, next) => {
    // Get token from 'Authorization' header
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ message: 'Access denied! Missing Token.' });

    try {
        // Decode token using Secret Key in .env file
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified; // Save user info to request for subsequent steps
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token!' });
    }
};

// Admin Role Check Middleware (RBAC)
exports.checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied! You do not have Administrator privileges.' });
    }
    next();
};