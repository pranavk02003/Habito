import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleHabit } from "../../redux/habitsSlice";
import { toggleHabit as toggleHabitAPI } from "../../services/habitService";
import { CheckCircle, Trash2 } from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";


const HabitCard = ({ habit }) => {

  const dispatch = useDispatch();

const handleToggle = async () => {

  try {

    await toggleHabitAPI(habit._id);

    dispatch(toggleHabit(habit._id));

  } catch (error) {

    console.error("Toggle failed", error);

  }

};

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition duration-300 flex items-center justify-between">

        {/* Habit Info */}
        <div>

          <h3
            className={`font-semibold text-slate-800 ${
              habit.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {habit.name}
          </h3>

          {habit.streak > 0 && (
            <p className="text-sm text-orange-500 font-medium">
              🔥 {habit.streak} day streak
            </p>
          )}

          <p className="text-sm text-gray-500">
            {habit.completed ? "Completed today ✅" : "Pending ⏳"}
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={handleToggle}
            className="text-green-500 hover:text-green-600 transition"
          >
            <CheckCircle size={22} />
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="text-red-500 hover:text-red-600 transition"
          >
            <Trash2 size={22} />
          </button>

        </div>

      </div>

      {showModal && (
        <DeleteConfirmModal
          habit={habit}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default HabitCard;