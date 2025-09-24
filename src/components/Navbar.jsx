import React from "react";
import { Globe, User } from "lucide-react";

export default function Navbar({ onLanguageChange }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center">
          <div className="flex justify-between gap-5 mx-7 my-1 mb-5">
            <img
            src="/indian-emblem.png"
            alt="Indian Emblem"
            className="h-13"
            />
            <img src="/government-logo.png" alt="Gov Logo" className="h-14"/>
          </div>
            
          <div className="flex justify-end absolute mt-19">
            <div className="w-19 h-1.5 bg-orange-500"></div>
            <div className="w-15 h-1.5 bg-white"></div>
            <div className="w-12 h-1.5 bg-green-600"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-800">RakshaNet</h1>
        </div>
        <div className="flex items-center gap-5">
          <img src="/ndrf_logo_png.png" alt="NDRF Logo" className="h-14"/>
          <button
            onClick={() => onLanguageChange && onLanguageChange(false)}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">English</span>
          </button>
          <button className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}