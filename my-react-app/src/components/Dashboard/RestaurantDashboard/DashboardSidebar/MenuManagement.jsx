import React, { useState, useEffect } from "react";
const MenuManagement = () => {
  const [dishes, setDishes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [editingDishId, setEditingDishId] = useState(null);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    food_type: "veg",
    is_available: "true",
    description: "",
    image_url: null,
  });
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/restaurant/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error("Failed to fetch restaurants");
          return;
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/menu/all");
        if (!response.ok) {
          console.error("Failed to fetch menu items");
          return;
        }
        const data = await response.json();
        setDishes(data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };
    fetchMenuItems();
  }, []);
  const handleSaveDish = async () => {
    try {
      if (!selectedRestaurantId) {
        alert("Please select a restaurant");
        return;
      }
      const token = localStorage.getItem("access_token");
      const dishData = {
        restaurant_id: parseInt(selectedRestaurantId),
        name: newDish.name,
        price: parseFloat(newDish.price),
        is_available: newDish.is_available === "true",
        food_type: newDish.food_type,
        image_url: newDish.image_url,
        description: newDish.description,
      };
      let response;
      if (editingDishId) {
        response = await fetch(
          `http://127.0.0.1:8000/menu/${editingDishId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dishData),
          }
        );
      } else {
        response = await fetch("http://127.0.0.1:8000/menu/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dishData),
        });
      }
      if (!response.ok) {
        const err = await response.text();
        console.error("Failed to save dish:", err);
        return;
      }
      const savedDish = await response.json();
      if (editingDishId) {
        setDishes(
          dishes.map((d) => (d.item_id === editingDishId ? savedDish : d))
        );
      } else {
        setDishes([...dishes, savedDish]);
      }
      setShowForm(false);
      setEditingDishId(null);
      setNewDish({
        name: "",
        price: "",
        food_type: "veg",
        is_available: "true",
        description: "",
        image_url: null,
      });
      setSelectedRestaurantId("");
    } catch (error) {
      console.error("Error saving dish:", error);
    }
  };
  const handleRemoveDish = async (item_id) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://127.0.0.1:8000/menu/${item_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const err = await response.text();
        console.error("Failed to delete dish:", err);
        alert("Failed to delete dish");
        return;
      }
      setDishes(dishes.filter((dish) => dish.item_id !== item_id));
    } catch (err) {
      console.error("Error deleting dish:", err);
      alert("Error deleting dish");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/menu/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      setNewDish({ ...newDish, image_url: data.url });
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };
  return (
    <div className="p-6 relative min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
      <button
        onClick={() => {
          setShowForm(true);
          setEditingDishId(null);
          setNewDish({
            name: "",
            price: "",
            food_type: "veg",
            is_available: "true",
            description: "",
            image_url: null,
          });
          setSelectedRestaurantId("");
        }}
        className="absolute top-6 right-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Add Dish
      </button>
      {showForm && (
        <div className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-11/12 max-w-md mt-10 p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-700 text-xl font-bold mb-4">
              {editingDishId ? "Edit Dish" : "Add New Dish"}
            </h2>
            <label className="text-sm text-black">Restaurant:</label>
            <select
              value={selectedRestaurantId}
              onChange={(e) => setSelectedRestaurantId(e.target.value)}
              className="text-gray-700 w-full mb-3 p-2 border border-gray-300 rounded"
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((rest) => (
                <option key={rest.restaurant_id} value={rest.restaurant_id}>
                  {rest.name}
                </option>
              ))}
            </select>
            <label className="text-sm text-black">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <label className="text-sm text-black">Dish Name:</label>
            <input
              type="text"
              value={newDish.name}
              onChange={(e) =>
                setNewDish({ ...newDish, name: e.target.value })
              }
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />

            <label className="text-sm text-black">Price:</label>
            <input
              type="number"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: e.target.value })
              }
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <label className="text-sm text-black">Available:</label>
            <select
              value={newDish.is_available}
              onChange={(e) =>
                setNewDish({ ...newDish, is_available: e.target.value })
              }
              className="text-gray-700 w-full mb-3 p-2 border border-gray-300 rounded"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label className="text-sm text-black">Veg/Non-Veg:</label>
            <select
              value={newDish.food_type}
              onChange={(e) =>
                setNewDish({ ...newDish, food_type: e.target.value })
              }
              className="text-gray-700 w-full mb-3 p-2 border border-gray-300 rounded"
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
            <label className="text-sm text-black">Description:</label>
            <textarea
              value={newDish.description}
              onChange={(e) =>
                setNewDish({ ...newDish, description: e.target.value })
              }
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSaveDish}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                {editingDishId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-10">
        {dishes.map((dish) => (
          <div
            key={dish.item_id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={dish.image_url}
                alt={dish.name}
                className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover transition-transform duration-300 hover:scale-105 p-3 rounded-3xl"
              />
              <span
                className={`absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs sm:text-sm font-semibold ${
                  dish.food_type === "veg" ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {dish.food_type === "veg" ? "Veg" : "Non-Veg"}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate">
                {dish.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {dish.description}
              </p>
              <p className="text-gray-800 font-bold text-base sm:text-lg mb-4">
                ₹{dish.price}
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleRemoveDish(dish.item_id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium shadow-sm transition md:mt-auto sm:mt-0"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    setEditingDishId(dish.item_id);
                    setSelectedRestaurantId(
                      dish.restaurant_id !== undefined ? dish.restaurant_id.toString() : ""
                    );
                    setNewDish({
                      name: dish.name || "",
                      price: dish.price || "",
                      food_type: dish.food_type || "veg",
                      is_available:
                        dish.is_available !== undefined
                          ? dish.is_available.toString()
                          : "true",
                      description: dish.description || "",
                      image_url: dish.image_url || null,
                    });
                    setShowForm(true);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl font-medium shadow-sm transition"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;