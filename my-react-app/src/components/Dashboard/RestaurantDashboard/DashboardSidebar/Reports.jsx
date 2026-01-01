import React, { useState, useEffect } from "react";
const dummyReports = {
  totalSales: 125,
  totalRevenue: 3450.75,
  topSellingItems: [
    { name: "Burger", sold: 40 },
    { name: "Pizza", sold: 30 },
    { name: "Coke", sold: 50 },
  ],
  dailyRevenue: [
    { day: "Mon", revenue: 450 },
    { day: "Tue", revenue: 500 },
    { day: "Wed", revenue: 400 },
    { day: "Thu", revenue: 600 },
    { day: "Fri", revenue: 700 },
  ],
};

const Reports = () => {
  const [reports, setReports] = useState({});

  useEffect(() => {
    setReports(dummyReports);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Reports & Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition">
          <h3 className="text-gray-500 font-medium mb-2">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800">{reports.totalSales || 0}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition">
          <h3 className="text-gray-500 font-medium mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${reports.totalRevenue ? reports.totalRevenue.toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition">
          <h3 className="text-gray-500 font-medium mb-2">Top Selling Item</h3>
          <p className="text-xl font-semibold text-gray-800">
            {reports.topSellingItems?.[0]?.name || "-"} ({reports.topSellingItems?.[0]?.sold || 0} sold)
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top Selling Items</h3>
        <ul className="space-y-2">
          {reports.topSellingItems?.map((item, idx) => (
            <li key={idx} className="flex justify-between text-gray-700">
              <span>{item.name}</span>
              <span className="font-semibold">{item.sold}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Revenue</h3>
        <div className="space-y-2">
          {reports.dailyRevenue?.map((day, idx) => (
            <div key={idx} className="flex items-center">
              <span className="w-12 text-gray-600">{day.day}</span>
              <div className="h-6 bg-green-400 rounded" style={{ width: `${day.revenue / 10}px` }}></div>
              <span className="ml-2 text-gray-700 font-medium">${day.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
