const express = require('express');
const router = express.Router();
const User = require('../user/user.model');
const verifyToken = require('../middlewares/verifyToken');

// GET: fetch all user's favorites
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to fetch favorites' });
  }
});

// POST: add to favorites
router.post('/:productId', verifyToken, async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.userId);
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to add favorite' });
  }
});

// DELETE: remove from favorites
router.delete('/:productId', verifyToken, async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to remove favorite' });
  }
});

module.exports = router;
