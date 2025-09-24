// src/App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_main from "./components/Navbar_main";
import Carousel from "./components/Carousel";
import EmergencyMarquee from "./components/EmergencyMarquee";
import { MessageCircle, Home, AlertTriangle, Map, Phone } from "lucide-react";
import ChatbotModal from "./components/ChatbotModal";
import { LANG } from './i18n';

export default function App() {
  const [isHindi, setIsHindi] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();

  const handleLanguageChange = (hindi) => setIsHindi(hindi);
  
  const handleSosClick = () => {
    navigate('/sos');
  };
  
  const content = {
    english: {
      menuItems: [
        { icon: Home, label: "Dashboard", active: true },
        { icon: AlertTriangle, label: "Alerts", active: false },
        { icon: Map, label: "Maps", active: false },
      ],
      sosButton: "SOS - Emergency",
      emergencyContacts: "Emergency Contacts",
      liveUpdates: "Live Updates",
      updates: [
        { type: "Weather Alert", msg: "Cyclone Biparjoy moving towards Gujarat coast", time: "15 mins ago" },
        { type: "Rescue Success", msg: "67 people evacuated from flood-hit areas in Bihar", time: "1 hour ago" },
        { type: "System Update", msg: "Weather monitoring stations online - 98.7%", time: "2 hours ago" },
        { type: "Relief Operations", msg: "Food packets distributed in Assam - 5,000 families", time: "3 hours ago" }
      ],
    },
    hindi: {
      menuItems: [
        { icon: Home, label: "डैशबोर्ड", active: true },
        { icon: AlertTriangle, label: "अलर्ट", active: false },
        { icon: Map, label: "नक्शे", active: false },
      ],
      sosButton: "एसओएस - आपातकाल",
      emergencyContacts: "आपातकालीन संपर्क",
      liveUpdates: "लाइव अपडेट",
      updates: [
        { type: "मौसम अलर्ट", msg: "चक्रवात बिपरजॉय गुजरात तट की ओर बढ़ रहा", time: "15 मिनट पहले" },
        { type: "बचाव सफलता", msg: "बिहार के बाढ़ प्रभावित क्षेत्रों से 67 लोग निकाले गए", time: "1 घंटे पहले" },
        { type: "सिस्टम अपडेट", msg: "मौसम निगरानी स्टेशन ऑनलाइन - 98.7%", time: "2 घंटे पहले" },
        { type: "राहत अभियान", msg: "असम में खाद्य पैकेट वितरित - 5,000 परिवार", time: "3 घंटे पहले" }
      ],
    }
  };

  const current = isHindi ? content.hindi : content.english;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <Navbar_main onLanguageChange={handleLanguageChange} />
      <EmergencyMarquee isHindi={isHindi} />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 shadow-lg flex flex-col">
          <div className="p-4">
            <button 
              onClick={handleSosClick}
              className="w-full py-3 bg-red-700 hover:bg-red-800 rounded font-bold text-lg transition-colors"
            >
              🆘 {current.sosButton}
            </button>
          </div>
          <div className="p-4 space-y-2">
            {current.menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded transition-colors w-full text-left ${
                    item.active
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
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

        <main className="flex-1 p-6">
          <Carousel />
        </main>

        <aside className="w-80 bg-white shadow-lg border-l border-gray-200">
           <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">{current.liveUpdates}</h2>
            <div className="space-y-4">
              {current.updates.map((update, index) => (
                <div key={index} className="border-l-4 pl-3 py-2 border-blue-400 bg-blue-50">
                  <p className="text-sm font-semibold text-blue-800">{update.type}</p>
                  <p className="text-xs text-blue-600">{update.msg}</p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110"
        aria-label="Open Chatbot"
      >
        <MessageCircle size={32} />
      </button>

      <ChatbotModal
        isChatbotOpen={isChatbotOpen}
        closeChatbot={() => setIsChatbotOpen(false)}
        initialMessage="Welcome to the RakshaNet assistant. How can I help you today?"
        lang={isHindi ? LANG.HI : LANG.EN}
      />
    </div>
  );
}