import React from "react";
import { useSelector } from "react-redux";

const ProgressRing = () => {
  const habits = useSelector((state) => state.habits.habits || []);

  const total = habits.length;
  const completed = habits.filter((h) => h.completed).length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">

      <h2 className="text-lg font-semibold mb-4">
        Today’s Progress
      </h2>

      <div className="relative w-28 h-28 mx-auto">

        <svg
          className="w-full h-full rotate-[-90deg]"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />

          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#f97316"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {percentage}%
        </span>

      </div>

      <p className="text-sm text-gray-600 mt-3">
        {completed} of {total} habits completed
      </p>

    </div>
  );
};

export default ProgressRing;