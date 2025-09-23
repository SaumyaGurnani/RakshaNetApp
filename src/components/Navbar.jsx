// src/components/Navbar.jsx
import React from "react";
import { Globe, User } from "lucide-react";

export default function Navbar({ onLanguageChange }) {
  return (
    <header className="bg-white shadow-sm border-b border-yellow-500">
      <div className="flex items-center justify-between px-6 py-2 bg-white relative">
        
        {/* Left - Indian Emblem */}
        <div className="flex items-center">
          <img
            src="/indian-emblem.png"
            alt="Indian Emblem"
            className="h-12 w-auto"
          />
        </div>

        {/* Center - RakshaNet Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <img
            src="/government-logo.png"
            alt="Gov Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-blue-900">RakshaNet</h1>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded font-semibold">
            Login
          </button>
          <button
            onClick={() => onLanguageChange(false)}
            className="flex items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-700 rounded hover:bg-blue-50"
          >
            <Globe className="h-4 w-4" />
            English
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
