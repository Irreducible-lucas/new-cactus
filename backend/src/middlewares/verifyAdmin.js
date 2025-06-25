// src/middlewares/verifyAdmin.js
const User = require('../user/user.model');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
