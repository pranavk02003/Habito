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
