
const User = require('../user/user.model');

module.exports = async (req, res, next) => {
  try {
    // Ensure req.userId exists
    if (!req.userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No user ID provided.' });
    }

    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Access denied. Admin only.' });
    }

    return next();
  } catch (error) {
    console.error(error); // Optional: log error
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
