import React, { useState } from "react";
import AddHabitModal from "./AddHabitModal";
import { createHabit } from "../../services/habitService";
import { useDispatch } from "react-redux";
import { addHabit } from "../../redux/habitsSlice";



const AddHabitButton = () => {

  const [open, setOpen] = useState(false);

 const dispatch = useDispatch();

const handleAddHabit = async (habitName) => {
  try {

    const res = await createHabit({
      name: habitName,
      completed: false
    });

    dispatch(addHabit(res.data));

  } catch (error) {
    console.error("Error adding habit", error);
  }
};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
       className="fixed bottom-24 right-6 bg-orange-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 transition flex items-center justify-center text-2xl"
      >
        + 
      </button>

      <AddHabitModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </>
  );
};

export default AddHabitButton;