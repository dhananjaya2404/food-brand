import React from "react";
import SalesChart from "../../../Charts/SalesChat";
import { FaDollarSign, FaShoppingCart, FaChartLine, FaClock } from "react-icons/fa";
const Home = () => {
  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold ">
          Overview of your restaurant performance
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
                { title: "Total Sales", value: "$12,450", icon: <FaDollarSign size={30} className="text-blue-500" /> },
                { title: "Total Orders", value: "320", icon: <FaShoppingCart size={30} className="text-green-500" /> },
                { title: "Avg Order Value", value: "$38.90", icon: <FaChartLine size={30} className="text-purple-500" /> },
                { title: "Pending Orders", value: "12", icon: <FaClock size={30} className="text-red-500" /> },
            ].map((card, index) => (
                <div
                key={index}
                className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
                >
                <div>
                    <p className="text-gray-700 text-sm">{card.title}</p>
                    <h2 className="text-gray-700 text-2xl font-bold">{card.value}</h2>
                </div>
                <div className="flex items-center justify-center w-12 h-12">
                    {card.icon}
                </div>
                </div>
            ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="text-gray-700 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Operations</h2>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span>❌ Missed Orders</span>
              <span className="font-bold text-red-500">4</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>⏱ Late Deliveries</span>
              <span className="font-bold text-yellow-500">7</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>🔄 Cancelled Orders</span>
              <span className="font-bold text-gray-500">2</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-gray-700 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Items</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>🍔 Burger</span>
              <span>56 Orders</span>
            </li>
            <li className="flex justify-between">
              <span>🍕 Pizza</span>
              <span>49 Orders</span>
            </li>
            <li className="flex justify-between">
              <span>🍟 Fries</span>
              <span>43 Orders</span>
            </li>
          </ul>
        </div>
        <div className="text-gray-700 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Menu Feedback</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Burger</span>
              <span>⭐⭐⭐⭐☆</span>
            </li>
            <li className="flex justify-between">
              <span>Pizza</span>
              <span>⭐⭐⭐⭐⭐</span>
            </li>
            <li className="flex justify-between">
              <span>Pasta</span>
              <span>⭐⭐⭐☆☆</span>
            </li>
          </ul>
        </div>

        {/* Customers */}
        <div className="text-gray-700 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Customers</h2>
          <p className="text-sm text-gray-500 mb-2">
            New vs Returning
          </p>
          <div className="h-32 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
            👥 Customer Chart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
