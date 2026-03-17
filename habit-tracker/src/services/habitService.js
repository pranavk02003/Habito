import API from "./api";

export const getHabits = () => API.get("/habits");

export const createHabit = (habitData) => API.post("/habits", habitData);

export const toggleHabit = (id) => API.patch(`/habits/${id}/toggle`);

export const deleteHabit = (id) => API.delete(`/habits/${id}`);