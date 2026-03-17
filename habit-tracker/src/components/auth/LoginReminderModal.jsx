import React from "react";
import { useNavigate } from "react-router-dom";

const LoginReminderModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-6">
          Please login to access your profile
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex-1 py-2 rounded-lg bg-black text-white"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginReminderModal;