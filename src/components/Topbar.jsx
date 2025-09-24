import React from "react";
import { FiBell, FiMenu } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className="flex items-center gap-4 bg-white px-6 py-4 border-b border-slate-200">
      <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
        <FiMenu />
      </button>

      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search requests, victims, areas..."
            className="w-full rounded-full border border-slate-300 px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-600 hover:text-slate-900">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="text-sm text-slate-700 font-medium">NDRF Unit 7B</div>
      </div>
    </header>
  );
}
