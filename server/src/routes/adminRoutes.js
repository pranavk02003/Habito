import express from "express";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ======================
// GET ALL USERS
// ======================
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ======================
// GET ALL HABITS
// ======================
router.get("/habits", protect, adminOnly, async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    console.error("Get Habits Error:", error);
    res.status(500).json({ message: "Failed to fetch habits" });
  }
});

// ======================
// GET USER HABITS
// ======================
router.get("/user/:id/habits", protect, adminOnly, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.params.id });
    res.json(habits);
  } catch (error) {
    console.error("User Habits Error:", error);
    res.status(500).json({ message: "Failed to fetch user habits" });
  }
});

// ======================
// APPROVE USER
// ======================
router.put("/user/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    await user.save();

    res.json({ message: "User approved successfully" });

  } catch (error) {
    console.error("Approve Error:", error);
    res.status(500).json({ message: "Failed to approve user" });
  }
});

// ======================
// REJECT USER
// ======================
router.put("/user/:id/reject", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "rejected";
    await user.save();

    res.json({ message: "User rejected successfully" });

  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ message: "Failed to reject user" });
  }
});

// ======================
// DELETE USER
// ======================
router.delete("/user/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;