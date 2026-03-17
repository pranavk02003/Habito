import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Stats = () => {

  const habits = useSelector((state) => state.habits?.habits || []);

  /* Month + Week selection */

  const [selectedMonth,setSelectedMonth] = useState(new Date().getMonth());
  const [selectedWeek,setSelectedWeek] = useState(1);

  /* Filter habits by month */

  const monthlyHabits = habits.filter(h => {
    const date = new Date(h.createdAt || Date.now());
    return date.getMonth() === selectedMonth;
  });

  /* Generate weekly data */

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const weeklyData = days.map(day => ({
    day,
    completed: 0
  }));

  monthlyHabits.forEach(habit => {

    if(!habit?.completed) return;

    const date = new Date(habit.createdAt || Date.now());

    let dayIndex = date.getDay();

    if(dayIndex === 0) dayIndex = 6;
    else dayIndex -= 1;

    weeklyData[dayIndex].completed += 1;

  });

  /* Heatmap data */

  const heatmapData = [
    { date: "2026-03-10", count: 1 },
    { date: "2026-03-11", count: 2 },
    { date: "2026-03-12", count: 3 },
    { date: "2026-03-13", count: 1 },
    { date: "2026-03-14", count: 2 },
    { date: "2026-03-15", count: 3 },
    { date: "2026-03-16", count: 4 },
    { date: "2026-03-17", count: 2 }
  ];

  return (

    <div className="max-w-3xl mx-auto px-4 pb-32 animate-fadeIn">

      <h1 className="text-2xl font-bold text-center mb-6">
        Habit Statistics
      </h1>

      {/* Month + Week Selectors */}

      <div className="flex gap-4 justify-center mb-6">

        <select
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(Number(e.target.value))}
          className="border px-3 py-1 rounded"
        >

          {[
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
          ].map((month,index)=>(
            <option key={index} value={index}>
              {month}
            </option>
          ))}

        </select>

        <select
          value={selectedWeek}
          onChange={(e)=>setSelectedWeek(Number(e.target.value))}
          className="border px-3 py-1 rounded"
        >
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
        </select>

      </div>

      {/* Weekly Graph */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-lg font-semibold mb-4">
          Weekly Habit Completion
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={weeklyData}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="completed"
              fill="#f97316"
              radius={[6,6,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Heatmap (UNCHANGED GitHub style) */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Habit Activity Calendar
        </h2>

        <CalendarHeatmap
          startDate={new Date("2026-01-01")}
          endDate={new Date("2026-12-31")}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count >= 4) return "color-scale-4";
            if (value.count >= 3) return "color-scale-3";
            if (value.count >= 2) return "color-scale-2";
            if (value.count >= 1) return "color-scale-1";
            return "color-empty";
          }}
        />

      </div>

    </div>
  );
};

export default Stats;