import React, { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AISuggestions = ({ refreshHabits }) => {
  const [goal, setGoal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuggestions = (goal) => {
    const g = goal.toLowerCase();

    if (g.includes("weight")) {
      return ["Walk daily", "Drink water", "Workout"];
    }

    if (g.includes("study")) {
      return ["Study 2 hours", "Avoid phone", "Revise"];
    }

    return ["Stay consistent", "Focus daily"];
  };

  const generateSuggestions = () => {
    if (!goal.trim()) {
      toast.error("Enter a goal");
      return;
    }

    setSuggestions(getSuggestions(goal));
    setMotivation("");
  };

  const generateMotivation = () => {
    const msgs = ["🔥 Keep going!", "💪 You got this!", "🚀 Stay strong"];
    setMotivation(msgs[Math.floor(Math.random() * msgs.length)]);
    setSuggestions([]);
  };

  //  Add single habit
  const addHabitToDB = async (name) => {
    try {
      await API.post("/habits", { name });

      toast.success("Habit added ✅");

      if (refreshHabits) refreshHabits();

    } catch (err) {
      toast.error("Failed ❌");
    }
  };

  // Add all habits
  const addAllHabits = async () => {
    try {
      setLoading(true);

      for (let s of suggestions) {
        await API.post("/habits", { name: s });
      }

      toast.success("All habits added 🔥");

      setSuggestions([]);

      if (refreshHabits) refreshHabits();

    } catch (err) {
      toast.error("Error adding habits");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">

      <h2 className="text-lg font-bold text-orange-500 mb-3">
        🤖 AI Habit Assistant
      </h2>

      <input
        type="text"
        placeholder="Enter goal"
        className="w-full border p-2 rounded mb-3"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={generateSuggestions}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Get Suggestions
        </button>

        <button
          onClick={generateMotivation}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Motivate Me
        </button>
      </div>

      {suggestions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Suggested Habits:</h3>

          {suggestions.map((s, i) => (
            <div
              key={i}
              className="bg-gray-100 p-2 rounded mb-2 flex justify-between"
            >
              <span>{s}</span>

              <button
                onClick={() => addHabitToDB(s)}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Add
              </button>
            </div>
          ))}

          <button
            onClick={addAllHabits}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            {loading ? "Adding..." : "Add All "}
          </button>
        </div>
      )}

      {motivation && (
        <div className="bg-orange-100 text-orange-700 p-3 rounded text-center mt-3">
          {motivation}
        </div>
      )}
    </div>
  );
};

export default AISuggestions;