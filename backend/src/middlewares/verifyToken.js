// src/middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token from cookies:', token); // Debugging

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Debugging
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
