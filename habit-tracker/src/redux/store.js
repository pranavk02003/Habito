import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habitsSlice";
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    auth: authReducer,
  },
});