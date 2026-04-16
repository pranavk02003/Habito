import User from "../models/User.js";
import Habit from "../models/Habit.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve user
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "approved";

    await user.save();

    res.json({ message: "User approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject user
export const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.status = "rejected";

    await user.save();

    res.json({ message: "User rejected" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get habits of a user
export const getUserHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.params.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};