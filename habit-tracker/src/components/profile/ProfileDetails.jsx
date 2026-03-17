import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { User, Plus, Trash2 } from "lucide-react";

const ProfileDetails = () => {

  const habits = useSelector((state) => state.habits?.habits || []);
  const user = useSelector((state) => state.auth.user);

  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const completed = habits.filter(h => h.completed).length;

  const completionRate =
    habits.length === 0 ? 0 : Math.round((completed / habits.length) * 100);

  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map(h => h.streak || 0));

  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const handleDelete = () => {
    setProfileImage(null);
  };

  return (
    <div className="max-w-md mx-auto">

      {/* Profile Card */}
      <div className="bg-orange-200 p-6 rounded-2xl shadow-lg flex flex-col items-center mb-8 border border-orange-100">

        {/* Avatar */}
        <div className="relative">

          <div
            onClick={() => fileInputRef.current.click()}
            className="w-24 h-24 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center cursor-pointer"
          >

            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-orange-500" />
            )}

          </div>

          {/* Upload Icon */}
          <div
  onClick={() => fileInputRef.current.click()}
  className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer"
>
  <Plus size={16} />
</div>

          {/* Delete Button */}
          {profileImage && (
            <button
              onClick={handleDelete}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          )}

          {/* Hidden input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
          />

        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold mt-4 text-orange-600">
          {user?.name}
        </h2>

        <p className="text-gray-500">{user?.email}</p>

        <p className="text-sm text-gray-400 mt-1">
          Building consistency every day
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-orange-200 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Habits</p>
          <p className="text-2xl font-bold text-orange-500">{habits.length}</p>
        </div>

        <div className="bg-orange-200 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Completed Today</p>
          <p className="text-2xl font-bold text-orange-500">{completed}</p>
        </div>

        <div className="bg-orange-200 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Completion Rate</p>
          <p className="text-2xl font-bold text-orange-500">{completionRate}%</p>
        </div>

        <div className="bg-orange-200 p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Best Streak</p>
          <p className="text-2xl font-bold text-orange-500">{bestStreak} 🔥</p>
        </div>

      </div>

    </div>
  );
};

export default ProfileDetails;