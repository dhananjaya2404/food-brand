import React, { useState, useEffect } from "react";

// Dummy data (replace with API fetch)
const dummyOrders = [
  {
    id: 1,
    customer: "John Doe",
    table: 5,
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Coke", quantity: 1 },
    ],
    total: 25.5,
    status: "New",
    time: "12:30 PM",
  },
  {
    id: 2,
    customer: "Jane Smith",
    table: 3,
    items: [
      { name: "Pizza", quantity: 1 },
      { name: "Water", quantity: 2 },
    ],
    total: 18.0,
    status: "Preparing",
    time: "12:40 PM",
  },
];

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Preparing: "bg-yellow-100 text-yellow-800",
  Ready: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-500 line-through",
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API call
    setOrders(dummyOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Incoming Orders</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                Order #{order.id}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Customer:</span> {order.customer}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-medium">Table:</span> {order.table}
            </p>

            <div className="mb-3">
              <span className="font-medium text-gray-700">Items:</span>
              <ul className="list-disc list-inside text-gray-600">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 font-medium mb-3">
              Total: ${order.total.toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm mb-4">Time: {order.time}</p>

            <div className="flex flex-wrap gap-2">
              {order.status === "New" && (
                <button
                  onClick={() => updateStatus(order.id, "Preparing")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                >
                  Start Preparing
                </button>
              )}
              {order.status === "Preparing" && (
                <button
                  onClick={() => updateStatus(order.id, "Ready")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                >
                  Mark Ready
                </button>
              )}
              {order.status !== "Completed" && (
                <button
                  onClick={() => updateStatus(order.id, "Completed")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
