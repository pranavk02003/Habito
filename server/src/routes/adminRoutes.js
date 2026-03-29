import express from "express";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

//  Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

//  Get all habits
router.get("/habits", protect, adminOnly, async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// Delete user
router.delete("/user/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});


export default router;