import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  
  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-orange-500">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <>
          <h2 className="font-semibold mb-3 text-lg">
            All Users ({users.length})
          </h2>

          {users.length > 0 ? (
            users.map((u) => (
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
  onClick={async () => {
    try {
      await API.delete(`/admin/user/${u._id}`);

      
      setUsers(users.filter(user => user._id !== u._id));

    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user");
    }
      }}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
         >
         Delete
          </button>
           </div>
            ))
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </>
      )}

    </div>
  );
};

export default AdminDashboard;