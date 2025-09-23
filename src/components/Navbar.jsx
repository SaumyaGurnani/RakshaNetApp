// src/components/Navbar.jsx
import React from "react";
import { Globe, User } from "lucide-react";

export default function Navbar({ onLanguageChange }) {
  return (
    <header className="bg-white shadow-sm border-b border-yellow-500">
      <div className="flex items-center justify-between pr-6 pt-2 bg-white relative">
        
        <div className="flex flex-col items-center gap-5 mr-10">
          <img
            src="/indian-emblem.png"
            alt="Indian Emblem"
            className="h-18"
          />
          <div class="flex justify-end">
            <div class="w-15 h-1.5 bg-orange-500"></div>
            <div class="w-12 h-1.5 bg-white"></div>
            <div class="w-10 h-1.5 bg-green-600"></div>
          </div>
        </div>

        
        <div className="flex items-center gap-3">
          <img
            src="/government-logo.png"
            alt="Gov Logo"
            className="h-22"
          />
          <h1 className="text-3xl font-bold text-slate-700 mt-2">RakshaNet</h1>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded w-40 border-none h-10">
            Login/लॉगइन
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
