import React, { useState, useEffect } from "react";
const dummyManager = {
  name: "Alex Johnson",
  email: "alex.johnson@restaurant.com",
  phone: "+1 234 567 890",
  role: "Manager",
  joinedDate: "2022-03-15",
  profileImage: "https://i.pravatar.cc/150?img=12",
};

const Profile = () => {
  const [manager, setManager] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setManager(dummyManager);
    setFormData(dummyManager);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setManager(formData);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6min-h-screen">
      <h2 className="text-3xl font-bold mb-6 ">Manager Profile</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={manager.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h3 className="text-2xl font-semibold ">{manager.name}</h3>
            <p className="text-gray-500">{manager.role}</p>
            <p className="text-gray-400 text-sm">Joined: {manager.joinedDate}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded-md px-3 py-2 ${
                editMode ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded-md px-3 py-2 ${
                editMode ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded-md px-3 py-2 ${
                editMode ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>
          <div className="flex space-x-3 mt-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
