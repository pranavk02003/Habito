import React, { useState } from "react";

const AddHabitModal = ({ isOpen, onClose, onAddHabit }) => {

  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {

    if (!name.trim()) return;

    onAddHabit(name);   // send habit name to AddHabitButton

    setName("");

    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
      onClick={onClose}
    >

      <div
        className="bg-white p-6 rounded-xl shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-lg font-semibold mb-3">Add Habit</h2>

        <input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddHabitModal;