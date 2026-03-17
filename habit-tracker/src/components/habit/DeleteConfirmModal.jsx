import React from "react";
import { useDispatch } from "react-redux";
import { deleteHabit } from "../../redux/habitsSlice";
import { deleteHabit as deleteHabitAPI } from "../../services/habitService";

const DeleteConfirmModal = ({ habit, closeModal }) => {

  const dispatch = useDispatch();

  const handleDelete = async () => {

    try {

      await deleteHabitAPI(habit._id);   // delete from MongoDB

      dispatch(deleteHabit(habit._id));  // update Redux

      closeModal();

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">

        <h2 className="text-lg font-semibold mb-2">
          Delete Habit
        </h2>

        <p className="text-gray-500 mb-4">
          Are you sure you want to delete
          <span className="font-semibold"> {habit.name}</span> ?
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={closeModal}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );
};

export default DeleteConfirmModal;