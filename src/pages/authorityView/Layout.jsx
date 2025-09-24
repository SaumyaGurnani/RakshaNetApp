import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AlertMarquee from "../../components/AlertMarquee";

export default function AuthorityLayout() {
  const [isHindi, setIsHindi] = useState(false);
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from context or props
  const userData = {
    name: "NDRF Unit 7B",
    userType: "authority",
    department: "National Disaster Response Force",
    jurisdiction: "Delhi NCR"
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    
    // Navigate back to login
    navigate('/');
  };

  const handleLanguageChange = (hindi) => {
    setIsHindi(hindi);
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      <Navbar 
        onLanguageChange={handleLanguageChange}
        userData={userData}
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