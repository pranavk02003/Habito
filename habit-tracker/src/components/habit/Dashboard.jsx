import React from "react";
import { useSelector } from "react-redux";
import ProgressRing from "./ProgressRing";

const Dashboard = () => {

  const habits = useSelector((state)=>state.habits.habits || []);

  const total = habits.length;
  const completed = habits.filter(h=>h.completed).length;

  const today = new Date();

  const day = today.toLocaleDateString("en-US",{weekday:"long"});
  const date = today.toLocaleDateString("en-US",{month:"short",day:"numeric"});

  return (
    <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-2xl shadow-lg p-6 flex items-center gap-6 mb-8">

  <div className="w-1 h-16 bg-orange-500 rounded-full"></div>

  <ProgressRing/>

  <div>
    <h2 className="text-xl font-semibold text-slate-800">
      {day} • {date}
    </h2>

    <p className="text-orange-500 font-medium">
      Stay consistent today
    </p>

    <p className="text-sm text-gray-600">
      {completed} of {total} habits completed
    </p>
  </div>

</div>
  );
};

export default Dashboard;