import React, { useState } from "react";

const AISuggestions = () => {
  const [goal, setGoal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [motivation, setMotivation] = useState("");

  //  AI Logic (rule-based)
  const generateSuggestions = () => {
    let result = [];

    const text = goal.toLowerCase();

    if (text.includes("weight") || text.includes("fitness")) {
      result = ["🏃 Workout 30 mins", "💧 Drink 3L water", "🚶 Walk 10k steps"];
    } else if (text.includes("study") || text.includes("exam")) {
      result = ["📚 Study 2 hours", "📝 Revise notes", "💻 Practice coding"];
    } else if (text.includes("productivity")) {
      result = ["⏰ Wake up early", "📅 Plan your day", "📵 Reduce distractions"];
    } else {
      result = ["✅ Stay consistent", "📊 Track habits daily", "🔥 Never skip twice"];
    }

    setSuggestions(result);
  };

  //  Motivation Generator
  const generateMotivation = () => {
    const messages = [
      "🔥 Small habits build big success",
      "💪 Consistency beats motivation",
      "🚀 You are improving every day",
      "🎯 Focus on progress, not perfection",
    ];

    const random = messages[Math.floor(Math.random() * messages.length)];
    setMotivation(random);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">

      <h2 className="text-lg font-bold text-orange-500 mb-3">
        🤖 AI Habit Assistant
      </h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter your goal (e.g., lose weight, study)"
        className="w-full border p-2 rounded mb-3"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={generateSuggestions}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Get Suggestions
        </button>

        <button
          onClick={generateMotivation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Motivate Me
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Suggested Habits:</h3>
          {suggestions.map((s, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded mb-1">
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Motivation */}
      {motivation && (
        <div className="bg-orange-100 text-orange-700 p-3 rounded text-center font-medium">
          {motivation}
        </div>
      )}

    </div>
  );
};

export default AISuggestions;