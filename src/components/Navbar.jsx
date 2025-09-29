// src/components/Navbar.jsx

import React from "react";
import { Globe, User, LogOut, LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ onLanguageChange, userData, onLogout, onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-yellow-500 z-30 relative">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-white">
        
        <div className="flex items-center gap-2 sm:gap-5">
          {onMenuClick && (
            <button onClick={onMenuClick} className="p-2 rounded-lg text-gray-600 hover:text-gray-800 md:hidden">
              <Menu size={24}/>
            </button>
          )}

          <img
            src="/indian-emblem.png"
            alt="Indian Emblem"
            className="h-12 sm:h-16"
          />
        </div>

        
        <div className="flex items-center gap-2 sm:gap-3 absolute left-1/2 -translate-x-1/2">
          <img
            src="/government-logo.png"
            alt="Gov Logo"
            className="h-16 sm:h-20"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mt-2 whitespace-nowrap">RakshaNet</h1>
        </div>

        {/* Right Aligned Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {userData ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                  {userData.name || userData.email}
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 rounded transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 rounded transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
          
          <button
            onClick={() => onLanguageChange(false)}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-700 rounded hover:bg-blue-50"
          >
            <Globe className="h-4 w-4" />
            English
          </button>
        </div>
      </div>
    </header>
  );
}