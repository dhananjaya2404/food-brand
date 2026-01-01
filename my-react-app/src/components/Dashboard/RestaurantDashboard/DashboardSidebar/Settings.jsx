import React, { useState } from "react";
const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleAdd = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("No access token found. Please login again.");
      return;
    }
    const response = await fetch("http://127.0.0.1:8000/restaurant/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      throw new Error(data.detail || "Unauthorized");
    }
    alert("Restaurant created successfully!");
    setFormData({ name: "", address: "" });
  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Add Restaurant Details</h2>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Restaurant Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Restaurant
        </button>
      </div>
    </div>
  );
};

export default Settings;
