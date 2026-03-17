import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import HabitCard from "../components/habit/HabitCard";
import AddHabitButton from "../components/habit/AddHabitButton";
import Dashboard from "../components/habit/Dashboard";
import { setHabits } from "../redux/habitsSlice";
import { getHabits } from "../services/habitService";

const Home = () => {

  const habits = useSelector((state) => state.habits?.habits || []);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

useEffect(() => {
  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      dispatch(setHabits(res.data));
    } catch (error) {
      console.error("Failed to fetch habits", error);
    }
  };

  fetchHabits();
}, [dispatch]);



  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon 🌤";
    if (hour >= 17 && hour < 21) return "Good Evening 🌆";
    return "Good Night 🌙";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-32 animate-fadeIn">

     {/* Greeting Card */}

<div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white p-6 rounded-2xl shadow-lg mb-6">

  <h1 className="text-2xl font-bold">
    {getGreeting()} {user?.name} 👋
  </h1>

  <p className="text-sm opacity-90 mt-1">
    Stay consistent and build better habits today 
  </p>

</div>

      {/* Dashboard */}
      <Dashboard />

      {/* Habit List */}
      <div className="grid gap-4 mt-6">

        {habits.length > 0 ? (
          habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Start building better habits with Habito  
            <br />
            Click <span className="text-orange-500 font-semibold">Add Habit</span> to begin
          </p>
        )}

        <p className="text-center text-gray-600 mb-6">
          Total Habits: {habits.length}
        </p>

      </div>

      <AddHabitButton />

    </div>
  );
};

export default Home;