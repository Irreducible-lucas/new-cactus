const express = require("express");
const Order = require("../order/order.model");
const User = require("../user/user.model");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Create Order - user must be authenticated
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No order items provided" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const order = await Order.create({ items, user: user._id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get all orders
router.get("/", async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Clear all orders
router.delete("/", async (_req, res) => {
  try {
    await Order.deleteMany({});
    res.status(200).json({ message: "All orders cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear orders" });
  }
});

// ✅ FIXED: Delete single order by ID at /api/orders/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
