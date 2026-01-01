import React, { useState, useEffect } from "react";

// Dummy data (replace with API fetch)
const dummyCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    visits: 5,
    lastVisit: "2025-12-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 987 654 321",
    visits: 2,
    lastVisit: "2025-12-22",
  },
  {
    id: 3,
    name: "Michael Lee",
    email: "michael@example.com",
    phone: "+1 555 666 777",
    visits: 8,
    lastVisit: "2025-12-25",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Simulate API call
    setCustomers(dummyCustomers);
  }, []);

  const handleInteraction = (customerId) => {
    alert(`Interacted with customer ID: ${customerId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Customers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {customer.name}
            </h3>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Email:</span> {customer.email}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Phone:</span> {customer.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Visits:</span> {customer.visits}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              <span className="font-medium">Last Visit:</span> {customer.lastVisit}
            </p>

            <button
              onClick={() => handleInteraction(customer.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Interact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
