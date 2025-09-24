// src/components/StatsCards.jsx

import React from "react";
import { FiFileText, FiClock, FiCheckSquare, FiActivity } from "react-icons/fi";

// Updated stats data with new titles, values, and icons
const stats = [
  { 
    title: "Total Requests", 
    value: 1873, 
    icon: <FiFileText size={20} />, 
    color: "bg-blue-100 text-blue-600" 
  },
  { 
    title: "Pending Requests", 
    value: 215, 
    icon: <FiClock size={20} />, 
    color: "bg-yellow-100 text-yellow-600" 
  },
  { 
    title: "Fulfilled Requests", 
    value: 1643, 
    icon: <FiCheckSquare size={20} />, 
    color: "bg-green-100 text-green-600" 
  },
  { 
    title: "Active Requests", 
    value: 15, 
    icon: <FiActivity size={20} />, 
    color: "bg-red-100 text-red-600" 
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-blue-900 p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-blue-200">{stat.title}</p>
            <div className={`h-10 w-10 rounded-full grid place-items-center flex-shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-4xl font-bold text-white mt-2">
            {typeof stat.value === 'number' ? stat.value.toLocaleString('en-IN') : stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}