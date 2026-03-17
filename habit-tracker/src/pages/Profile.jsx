import React from "react";
import ProfileDetails from "../components/profile/ProfileDetails";

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-32 animate-fadeIn">

      <h1 className="text-2xl font-bold text-center mb-6">
        Profile
      </h1>

      <ProfileDetails />

    </div>
  );
};

export default Profile;