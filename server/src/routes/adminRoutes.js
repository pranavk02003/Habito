import express from "express";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();


//  Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get ALL habits 
router.get("/habits", protect, adminOnly, async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//  Get habits of specific user 
router.get("/user/:id/habits", protect, adminOnly, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.params.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//  Delete user
router.delete("/user/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;