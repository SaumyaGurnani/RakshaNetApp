import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar"; // Corrected: Changed from Topbar to Navbar
import AlertMarquee from "../../components/AlertMarquee";

export default function AuthorityLayout() {
  const [isHindi, setIsHindi] = useState(false);

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      <Navbar /> {/* Corrected: Changed from Topbar to Navbar */}
      <AlertMarquee isHindi={isHindi} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}