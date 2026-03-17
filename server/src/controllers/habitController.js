import Habit from "../models/Habit.js";


// CREATE HABIT
export const createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    const habit = await Habit.create({
      user: req.user._id,
      name,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET USER HABITS
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });

    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// TOGGLE HABIT
export const toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completed = !habit.completed;

    if (habit.completed) {
      habit.streak += 1;
    }

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE HABIT
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await habit.deleteOne();

    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};