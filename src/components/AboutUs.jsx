// src/pages/AboutUs.jsx

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Import Components
import Navbar from "../components/Navbar";
import EmergencyMarquee from "../components/EmergencyMarquee";
import AboutUsFeatures from "../components/AboutUsFeatures";

// Import Icons
import { Home, Info, Phone } from "lucide-react";

// Content for English & Hindi
const pageContent = {
  english: {
    menuItems: [
      { to: "/", icon: Home, label: "Home" },
      { to: "/alerts", icon: Phone, label: "Emergency Contacts" },
      { to: "/about", icon: Info, label: "About Us" },
    ],
    sosButton: "SOS - Emergency",
    liveUpdates: "Live Updates",
    updates: [
      {
        type: "Weather Alert",
        msg: "Cyclone Biparjoy moving towards Gujarat coast",
        time: "15 mins ago",
      },
      {
        type: "Rescue Success",
        msg: "67 people evacuated from flood-hit areas in Bihar",
        time: "1 hour ago",
      },
      {
        type: "System Update",
        msg: "Weather monitoring stations online - 98.7%",
        time: "2 hours ago",
      },
      {
        type: "Relief Operations",
        msg: "Food packets distributed in Assam - 5,000 families",
        time: "3 hours ago",
      },
    ],
  },
  hindi: {
    menuItems: [
      { to: "/", icon: Home, label: "होम" },
      { to: "/alerts", icon: Phone, label: "आपातकालीन संपर्क" },
      { to: "/about", icon: Info, label: "हमारे बारे में" },
    ],
    sosButton: "एसओएस - आपातकाल",
    liveUpdates: "लाइव अपडेट",
    updates: [
      {
        type: "मौसम अलर्ट",
        msg: "चक्रवात बिपरजॉय गुजरात तट की ओर बढ़ रहा",
        time: "15 मिनट पहले",
      },
      {
        type: "बचाव सफलता",
        msg: "बिहार के बाढ़ प्रभावित क्षेत्रों से 67 लोग निकाले गए",
        time: "1 घंटे पहले",
      },
      {
        type: "सिस्टम अपडेट",
        msg: "मौसम निगरानी स्टेशन ऑनलाइन - 98.7%",
        time: "2 घंटे पहले",
      },
      {
        type: "राहत अभियान",
        msg: "असम में खाद्य पैकेट वितरित - 5,000 परिवार",
        time: "3 घंटे पहले",
      },
    ],
  },
};

export default function AboutUsPage() {
  const [isHindi, setIsHindi] = useState(false);
  const [userData, setUserData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData(null);
    navigate("/");
  };

  // ✅ Fixed: redirect directly to LoginPage.jsx
  const handleShowLogin = () => {
    navigate("/login");
  };

  const handleSosClick = () => {
    navigate("/sos");
  };

  const current = isHindi ? pageContent.hindi : pageContent.english;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isHindi={isHindi}
        onLanguageChange={setIsHindi}
        userData={userData}
        onLogout={handleLogout}
        onShowLogin={handleShowLogin}
      />
      <EmergencyMarquee isHindi={isHindi} />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-blue-900 shadow-lg flex flex-col flex-shrink-0">
          <div className="p-4 space-y-2">
            {current.menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center gap-3 p-3 rounded transition-colors w-full text-left ${
                    isActive
                      ? "bg-sky-500 text-white"
                      : "text-gray-200 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleSosClick}
              className="w-full py-3 bg-red-700 hover:bg-red-800 rounded font-bold text-lg transition-colors text-white mt-2"
            >
              🆘 {current.sosButton}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <AboutUsFeatures isHindi={isHindi} />
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white shadow-lg border-l border-gray-200 flex-shrink-0">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
              {current.liveUpdates}
            </h2>
            <div className="space-y-4">
              {current.updates.map((update, index) => (
                <div
                  key={index}
                  className="border-l-4 pl-3 py-2 border-blue-400 bg-blue-50"
                >
                  <p className="text-sm font-semibold text-blue-800">
                    {update.type}
                  </p>
                  <p className="text-xs text-blue-600">{update.msg}</p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
