// src/components/Navbar.jsx
import React from "react";
import { Globe, User, LogOut, LogIn } from "lucide-react"; // <-- IMPORT LogIn ICON

// Accept the new onShowLogin function as a prop
export default function Navbar({ isHindi, onLanguageChange, userData, onLogout, onShowLogin }) {
  return (
    <header className="bg-white shadow-sm border-b border-yellow-500">
      <div className="flex items-center justify-between pr-6 pt-2 bg-white relative">
        <div className="flex flex-col items-center gap-5 mr-10">
          <img src="/indian-emblem.png" alt="Indian Emblem" className="h-18" />
          <div className="flex justify-end">
            <div className="w-15 h-1.5 bg-orange-500"></div>
            <div className="w-12 h-1.5 bg-white"></div>
            <div className="w-10 h-1.5 bg-green-600"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src="/government-logo.png" alt="Gov Logo" className="h-22" />
          <h1 className="text-3xl font-bold text-slate-700 mt-2">RakshaNet</h1>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          {/* Conditional rendering based on userData */}
          {userData ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {userData.name || userData.email}
                </span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            // If no user data, show Login button
            <button
              onClick={onShowLogin}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              <LogIn className="h-4 w-4" />
              {isHindi ? "लॉगइन" : "Login"}
            </button>
          )}
          
          <button
            onClick={() => onLanguageChange(!isHindi)}
            className="flex items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-700 rounded hover:bg-blue-50"
          >
            <Globe className="h-4 w-4" />
            {isHindi ? "English" : "हिंदी"}
          </button>
        </div>
      </div>
    </header>
  );
}