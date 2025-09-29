// src/components/Navbar.jsx
import React from "react";
import { Globe, User, LogOut, LogIn, Menu } from "lucide-react"; // <-- IMPORT LogIn and Menu ICON

// Accept the new onShowLogin function as a prop
export default function Navbar({ isHindi, onLanguageChange, userData, onLogout, onShowLogin, onMenuClick, isAuthorityView }) {
  return (
    <header className="bg-white shadow-sm border-b border-yellow-500">
      <div className="flex items-center justify-between px-4 sm:pr-6 pt-2 bg-white relative">
        <div className="flex items-center gap-2 sm:gap-5">
          {isAuthorityView && (
            <button onClick={onMenuClick} className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          )}
          <img src="/indian-emblem.png" alt="Indian Emblem" className="h-12 sm:h-18" />
          <div className="hidden sm:flex justify-end">
            <div className="w-15 h-1.5 bg-orange-500"></div>
            <div className="w-12 h-1.5 bg-white"></div>
            <div className="w-10 h-1.5 bg-green-600"></div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/government-logo.png" alt="Gov Logo" className="h-12 sm:h-22" />
          <h1 className="text-xl sm:text-3xl font-bold text-slate-700 mt-2">RakshaNet</h1>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Conditional rendering based on userData */}
          {userData ? (
            <>
              {/* User Info */}
              <div className="hidden lg:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {userData.name || userData.email}
                </span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 rounded transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            // If no user data, show Login button
            <button
              onClick={onShowLogin}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{isHindi ? "लॉगइन" : "Login"}</span>
            </button>
          )}
          
          <button
            onClick={() => onLanguageChange(!isHindi)}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-700 rounded hover:bg-blue-50"
          >
            <Globe className="h-4 w-4" />
            {isHindi ? "English" : "हिंदी"}
          </button>
        </div>
      </div>
    </header>
  );
}