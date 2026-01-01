// SalesChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 2100 },
  { day: "Wed", sales: 800 },
  { day: "Thu", sales: 1600 },
  { day: "Fri", sales: 2400 },
  { day: "Sat", sales: 3200 },
  { day: "Sun", sales: 2800 },
];

const SalesChart = () => {
  return (
    <div className="text-gray-500 bg-white rounded-xl shadow p-6 h-72">
      <h2 className="text-gray-500 text-lg font-semibold mb-4">Sales Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
