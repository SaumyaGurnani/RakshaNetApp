// src/components/Sidebar.jsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { FiHome, FiMap, FiBarChart2, FiHelpCircle, FiLogOut, FiActivity, FiShield, FiUser } from "react-icons/fi";

const menuItems = [
  { to: '/authority', label: "Dashboard", icon: <FiHome /> },
  { to: '/authority/authority-panel', label: "Authority Panel", icon: <FiUser /> },
  { to: '/authority/ongoing-ops', label: "Ongoing Operations", icon: <FiActivity /> },
  { to: '/authority/map-view', label: "Map View", icon: <FiMap /> },
  { to: '/authority/authority-overview', label: "Authority Overview", icon: <FiShield /> },
  { to: '/authority/analytics', label: "Reports & Analytics", icon: <FiBarChart2 /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // 2. Initialize the navigate function

  // 3. Create a function to handle the logout action
  const handleLogout = () => {
    // In a real app, you would clear user session/token here
    console.log("Logging out...");
    navigate('/'); // Navigate to the landing page
  };

  return (
    <aside className="h-full w-64 bg-blue-900 text-blue-100 flex flex-col flex-shrink-0">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
              location.pathname === item.to
                ? "bg-blue-800 text-white"
                : "hover:bg-blue-800/70 text-blue-100"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-blue-800 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-800/70 text-blue-100">
          <FiHelpCircle className="text-lg" />
          <span className="text-sm font-medium">Help / Support</span>
        </button>
        {/* 4. Add the onClick handler to the logout button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-800/70 text-blue-100"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}