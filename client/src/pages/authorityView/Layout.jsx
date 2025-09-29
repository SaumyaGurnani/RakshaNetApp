import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AlertMarquee from "../../components/AlertMarquee";

export default function AuthorityLayout() {
  const [isHindi, setIsHindi] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMapView = location.pathname === '/authority/map-view';

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
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isAuthorityView={true}
      />
      <AlertMarquee isHindi={isHindi} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className={`flex-1 overflow-y-auto ${isMapView ? '' : 'p-4 sm:p-6 space-y-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}