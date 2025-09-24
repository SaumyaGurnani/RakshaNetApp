// src/App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import EmergencyMarquee from "./components/EmergencyMarquee";
import ChatbotModal from "./components/ChatbotModal";
import { LANG } from './i18n';
import {
  MessageCircle,
  Home,
  AlertTriangle,
  Map,
  Users,
  Phone,
  Settings,
  Headphones,
  FileText,
  Satellite,
} from "lucide-react";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const { currentUser, logout } = useAuth();
  const [isHindi, setIsHindi] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home/login page
  };

  const handleLanguageChange = (hindi) => {
    setIsHindi(hindi);
  };

  const handleSosClick = () => {
    navigate('/sos');
  };

  // Main dashboard content (existing code) - Only for non-authority users
  const content = {
    english: {
      menuItems: [
        { icon: Home, label: "Home", active: true },
        { icon: AlertTriangle, label: "Alerts", active: false },
        { icon: Settings, label: "Our Services", active: false },
      ],
      sosButton: "SOS - Emergency",
      emergencyContacts: "Emergency Contacts",
      satelliteImages: "Satellite Images - Indian Disasters",
      dashboardCards: {
        alerts: { title: "Active Alerts", desc: "High, Medium" },
        teams: { title: "Response Teams", desc: "Currently Deployed" },
        rescued: { title: "People Rescued", desc: "Last 24 hours" },
        camps: { title: "Relief Camps", desc: "Operational" },
      },
      currentStatus: "Current Disaster Status",
      statusItems: [
        {
          title: "Cyclone Warning",
          desc: "Eastern Coast - Odisha & Andhra Pradesh",
          level: "HIGH",
        },
        {
          title: "Heavy Rainfall Alert",
          desc: "Kerala, Karnataka - Next 48 hours",
          level: "MEDIUM",
        },
        {
          title: "Flood Monitoring",
          desc: "River levels - Yamuna, Ganga systems",
          level: "WATCH",
        },
      ],
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
      satelliteData: [
        { image: "/india-flood.jpg" },
        { image: "/uttarakhand.avif" },
        { image: "/wayanand-lanslide.jpg" },
        { image: "/cyclone.png" },
      ],
    },
    hindi: {
      menuItems: [
        { icon: Home, label: "होम", active: true },
        { icon: AlertTriangle, label: "अलर्ट", active: false },
        { icon: Settings, label: "हमारी सेवाएं", active: false },
      ],
      sosButton: "एसओएस - आपातकाल",
      emergencyContacts: "आपातकालीन संपर्क",
      satelliteImages: "उपग्रह चित्र - भारतीय आपदाएं",
      dashboardCards: {
        alerts: { title: "सक्रिय अलर्ट", desc: "उच्च, मध्यम" },
        teams: { title: "प्रतिक्रिया दल", desc: "वर्तमान में तैनात" },
        rescued: { title: "बचाए गए लोग", desc: "पिछले 24 घंटे" },
        camps: { title: "राहत शिविर", desc: "परिचालन में" },
      },
      currentStatus: "वर्तमान आपदा स्थिति",
      statusItems: [
        {
          title: "चक्रवात चेतावनी",
          desc: "पूर्वी तट - ओडिशा और आंध्र प्रदेश",
          level: "उच्च",
        },
        {
          title: "भारी बारिश अलर्ट",
          desc: "केरल, कर्नाटक - अगले 48 घंटे",
          level: "मध्यम",
        },
        {
          title: "बाढ़ निगरानी",
          desc: "नदी स्तर - यमुना, गंगा सिस्टम",
          level: "निगरानी",
        },
      ],
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
      satelliteData: [
        { image: "/india-flood.jpg" },
        { image: "/uttarakhand.avif" },
        { image: "/wayanand-lanslide.jpg" },
        { image: "/cyclone.png" },
      ],
    },
  };

  const current = isHindi ? content.hindi : content.english;

  const getSeverityColor = (severity) => {
    const sev = severity.toLowerCase();
    if (sev === "high" || sev === "उच्च")
      return "bg-red-100 text-red-800 border-red-200";
    if (sev === "medium" || sev === "मध्यम")
      return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        onLanguageChange={handleLanguageChange}
        userData={currentUser}
        onLogout={handleLogout}
      />
      <EmergencyMarquee isHindi={isHindi} />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-blue-900 shadow-lg flex flex-col">
          {/* User Info Section */}
          {currentUser && (
            <div className="p-4 bg-blue-800 text-white border-b border-blue-700">
              <div className="text-sm opacity-90">
                {isHindi ? "स्वागत" : "Welcome"}
              </div>
              <div className="font-semibold">
                {currentUser.name || currentUser.email}
              </div>
              <div className="text-xs opacity-75 capitalize">
                {currentUser.userType === "citizen"
                  ? isHindi
                    ? "नागरिक"
                    : "Citizen"
                  : currentUser.userType === "authority"
                  ? isHindi
                    ? "प्राधिकरण"
                    : "Authority"
                  : currentUser.userType === "volunteer"
                  ? isHindi
                    ? "स्वयंसेवक"
                    : "Volunteer"
                  : currentUser.userType === "ngo"
                  ? isHindi
                    ? "एनजीओ"
                    : "NGO"
                  : currentUser.userType}
              </div>
            </div>
          )}

          {/* Sidebar Menu */}
          <div className="p-4 space-y-2">
            {current.menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded transition-colors w-full text-left ${
                    item.active
                      ? "bg-sky-500 text-white"
                      : "text-gray-200 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* SOS Button */}
          <div className="p-4">
            <button 
              onClick={handleSosClick}
              className="w-full py-3 bg-red-700 hover:bg-red-800 rounded font-bold text-lg transition-colors text-white"
            >
              🆘 {current.sosButton}
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-auto p-4 bg-blue-900 text-white">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {current.emergencyContacts}
            </h3>
            <div className="space-y-1 text-sm">
              <div>NDRF: 011-26701728</div>
              <div>NDMA: 011-26701700</div>
              <div>Emergency: 112</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <Carousel />

          {/* Satellite Images Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Satellite className="h-6 w-6 text-blue-600" />
              {current.satelliteImages}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {current.satelliteData.map((satellite, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img
                    src={satellite.image}
                    alt={`Disaster satellite image ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Panel - Live Updates */}
        <aside className="w-80 bg-white shadow-lg border-l border-gray-200">
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

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110"
        aria-label="Open Chatbot"
      >
        <MessageCircle size={32} />
      </button>

      {/* Chatbot Modal */}
      <ChatbotModal
        isChatbotOpen={isChatbotOpen}
        closeChatbot={() => setIsChatbotOpen(false)}
        initialMessage="Welcome to the RakshaNet assistant. How can I help you today?"
        lang={isHindi ? LANG.HI : LANG.EN}
      />
    </div>
  );
}

export default App;