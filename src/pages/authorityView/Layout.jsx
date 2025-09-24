import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AlertMarquee from "../../components/AlertMarquee";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AuthorityLayout() {
  const [isHindi, setIsHindi] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the actual logout function from context
    navigate('/'); // Navigate back to home
  };

  const handleLanguageChange = (hindi) => {
    setIsHindi(hindi);
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      <Navbar 
        onLanguageChange={handleLanguageChange}
        userData={currentUser} // Pass the actual user data
        onLogout={handleLogout}
      />
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