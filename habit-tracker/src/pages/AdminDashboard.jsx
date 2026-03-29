import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  // 🔐 Protect admin route
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // 🔥 Fetch users + habits
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await API.get("/admin/users");
        const habitsRes = await API.get("/admin/habits");

        setUsers(usersRes.data);
        setHabits(habitsRes.data);

      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ❌ Delete user
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/user/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-orange-500">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* USERS */}
          <h2 className="font-semibold mb-3 text-lg">
            All Users ({users.length})
          </h2>

          {users.map((u) => (
            <div
              key={u._id}
              className="border p-3 mb-3 rounded-lg shadow-sm bg-white"
            >
              <p className="font-medium">{u.name}</p>
              <p className="text-gray-500 text-sm">{u.email}</p>
              <p className="text-xs text-orange-500">
                Role: {u.role || "user"}
              </p>

              <button
                onClick={() => handleDelete(u._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}

          {/* HABITS SECTION 🔥 */}
          <h2 className="font-semibold mt-8 mb-3 text-lg">
            All Habits ({habits.length})
          </h2>

          {habits.length > 0 ? (
            habits.map((h) => (
              <div
                key={h._id}
                className="border p-3 mb-3 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="font-medium">{h.name}</p>
                <p className="text-sm">
                  Status: {h.completed ? "✅ Done" : "❌ Not Done"}
                </p>
                <p className="text-xs text-gray-500">
                  Streak: {h.streak}
                </p>
                <p className="text-xs text-gray-400">
                  User ID: {h.user}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No habits found</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;