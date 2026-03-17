import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {

    // NEW: store habits from backend
    setHabits: (state, action) => {
      state.habits = action.payload;
    },

    addHabit: (state, action) => {
      state.habits.push({
        ...action.payload,
        streak: action.payload.streak || 0
      });
    },

    toggleHabit: (state, action) => {

      const habit = state.habits.find(h => h._id === action.payload);

      if (habit) {

        habit.completed = !habit.completed;

        if (habit.completed) {
          habit.streak += 1;
        }

      }

    },

    deleteHabit: (state, action) => {
      state.habits = state.habits.filter(
        (h) => h._id !== action.payload
      );
    },

  },
});

export const { setHabits, addHabit, toggleHabit, deleteHabit } = habitsSlice.actions;

export default habitsSlice.reducer;