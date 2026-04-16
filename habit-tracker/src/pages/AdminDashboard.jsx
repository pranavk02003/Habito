import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  //  Protect admin route
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  //  Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  Approve user
  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/user/${id}/approve`);
      alert("User approved");
      fetchUsers(); // refresh
    } catch (error) {
      console.error(error);
      alert("Failed to approve user");
    }
  };

  //  Reject user
  const handleReject = async (id) => {
    try {
      await API.put(`/admin/user/${id}/reject`);
      alert("User rejected");
      fetchUsers(); // refresh
    } catch (error) {
      console.error(error);
      alert("Failed to reject user");
    }
  };

  //  Delete user
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/user/${id}`);
      setUsers(users.filter(u => u._id !== id));

      if (selectedUser && selectedUser._id === id) {
        setSelectedHabits([]);
        setSelectedUser(null);
      }

    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user");
    }
  };

  //  Fetch habits
  const fetchUserHabits = async (userId, userName) => {
    try {
      const res = await API.get(`/admin/user/${userId}/habits`);
      setSelectedHabits(res.data);
      setSelectedUser(userName);
    } catch (error) {
      console.error("Error fetching habits", error);
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

              {/*  STATUS */}
              <p className="text-sm mt-1">
                Status:{" "}
                <span className={
                  u.status === "approved"
                    ? "text-green-600"
                    : u.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }>
                  {u.status || "pending"}
                </span>
              </p>

              <p className="text-xs text-orange-500">
                Role: {u.role || "user"}
              </p>

              {/*  VIEW HABITS */}
              <button
                onClick={() => fetchUserHabits(u._id, u.name)}
                className="mt-2 mr-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                View Habits
              </button>

              {/*  APPROVE */}
              {u.status !== "approved" && (
                <button
                  onClick={() => handleApprove(u._id)}
                  className="mt-2 mr-2 bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Approve
                </button>
              )}

              {/*  REJECT */}
              {u.status !== "rejected" && (
                <button
                  onClick={() => handleReject(u._id)}
                  className="mt-2 mr-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Reject
                </button>
              )}

              {/* DELETE */}
              <button
                onClick={() => handleDelete(u._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}

          {/*  HABITS */}
          <h2 className="font-semibold mt-8 mb-3 text-lg">
            {selectedUser ? `${selectedUser}'s Habits` : "User Habits"}
          </h2>

          {selectedHabits.length > 0 ? (
            selectedHabits.map((h) => (
              <div key={h._id} className="border p-3 mb-2 rounded bg-gray-50">
                <p className="font-medium">{h.name}</p>
                <p>Status: {h.completed ? "✅ Done" : "❌ Not Done"}</p>
                <p className="text-sm text-gray-500">
                  Streak: {h.streak}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              Click "View Habits" to see user activity
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;