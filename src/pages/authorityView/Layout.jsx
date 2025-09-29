// src/pages/authorityView/Layout.jsx

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AlertMarquee from "../../components/AlertMarquee";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AuthorityLayout() {
  const [isHindi, setIsHindi] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (hindi) => {
    setIsHindi(hindi);
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      <Navbar 
        onLanguageChange={handleLanguageChange}
        userData={currentUser}
        onLogout={handleLogout}
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <AlertMarquee isHindi={isHindi} />
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Container: Increased z-index to 50 */}
        <div className={`fixed md:relative inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <Sidebar />
        </div>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay: Increased z-index to 40 */}
      {isSidebarOpen && (
        <div
            className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}