// src/App.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import EmergencyMarquee from "./components/EmergencyMarquee";
import Login from "./components/LoginPage";
import ChatbotModal from "./components/ChatbotModal";
import WelcomeModal from "./components/WelcomeModal";
import AboutUs from "./components/AboutUs";
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
  Info,
} from "lucide-react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isHindi, setIsHindi] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('welcomeModalShown');
    if (!hasSeenModal) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    sessionStorage.setItem('welcomeModalShown', 'true');
  };

  const handleLogin = (userInfo) => {
    setUserData(userInfo);
    setIsLoggedIn(true);
    setShowLoginPage(false);
    setIsHindi(userInfo.isHindi || false);
    console.log("User logged in:", userInfo);

    if (userInfo.userType === 'authority') {
      navigate('/authority');
      return;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const handleLanguageChange = (hindi) => {
    setIsHindi(hindi);
  };
  
  const handleSosClick = () => {
    navigate('/sos');
  };

  if (showLoginPage) {
    return <Login onLogin={handleLogin} />;
  }

  const content = {
    english: {
      menuItems: [
        { to: "/", icon: Home, label: "Home" },
        { to: "/alerts", icon: Phone, label: "Emergency Contacts" },
        { to: "/about", icon: Info, label: "About Us" },
      ],
      sosButton: "SOS - Emergency",
      satelliteImages: "Satellite Images - Indian Disasters",
      liveUpdates: "Live Updates",
      updates: [
        { type: "Weather Alert", msg: "Cyclone Biparjoy moving towards Gujarat coast", time: "15 mins ago" },
        { type: "Rescue Success", msg: "67 people evacuated from flood-hit areas in Bihar", time: "1 hour ago" },
        { type: "System Update", msg: "Weather monitoring stations online - 98.7%", time: "2 hours ago" },
        { type: "Relief Operations", msg: "Food packets distributed in Assam - 5,000 families", time: "3 hours ago" },
      ],
      satelliteData: [
        { 
          image: "/india-flood.jpg",
          title: "Flood Monitoring",
          description: "Real-time satellite imagery showing flood-affected regions across northern India. High-resolution data from ISRO's RISAT-2B satellite helps track water levels and identify areas requiring immediate evacuation and relief operations."
        }, 
        { 
          image: "/uttarakhand.avif",
          title: "Uttarakhand Region",
          description: "Comprehensive monitoring of mountainous terrain in Uttarakhand state. This satellite view captures critical geological formations, river patterns, and potential landslide zones for early warning systems and disaster preparedness."
        }, 
        { 
          image: "/wayanand-lanslide.jpg",
          title: "Landslide Analysis",
          description: "Detailed analysis of landslide-prone areas in Wayanad district, Kerala. Advanced remote sensing technology identifies soil erosion patterns, vegetation loss, and terrain instability to predict and prevent future landslides."
        }, 
        { 
          image: "/cyclone.png",
          title: "Cyclone Tracking",
          description: "Live cyclone tracking system using geostationary satellite INSAT-3DR. Monitors wind speed, direction, cloud formation, and storm trajectory to provide accurate forecasts and enable timely evacuation of coastal populations."
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
      satelliteImages: "उपग्रह चित्र - भारतीय आपदाएं",
      liveUpdates: "लाइव अपडेट",
      updates: [
        { type: "मौसम अलर्ट", msg: "चक्रवात बिपरजॉय गुजरात तट की ओर बढ़ रहा", time: "15 मिनट पहले" },
        { type: "बचाव सफलता", msg: "बिहार के बाढ़ प्रभावित क्षेत्रों से 67 लोग निकाले गए", time: "1 घंटे पहले" },
        { type: "सिस्टम अपडेट", msg: "मौसम निगरानी स्टेशन ऑनलाइन - 98.7%", time: "2 घंटे पहले" },
        { type: "राहत अभियान", msg: "असम में खाद्य पैकेट वितरित - 5,000 परिवार", time: "3 घंटे पहले" },
      ],
      satelliteData: [
        { 
          image: "/india-flood.jpg",
          title: "बाढ़ निगरानी",
          description: "उत्तरी भारत में बाढ़ प्रभावित क्षेत्रों को दर्शाने वाली रीयल-टाइम उपग्रह इमेजरी। ISRO के RISAT-2B उपग्रह से उच्च-रिज़ॉल्यूशन डेटा जल स्तर को ट्रैक करने और तत्काल निकासी और राहत कार्यों की आवश्यकता वाले क्षेत्रों की पहचान करने में मदद करता है।"
        }, 
        { 
          image: "/uttarakhand.avif",
          title: "उत्तराखंड क्षेत्र",
          description: "उत्तराखंड राज्य में पहाड़ी इलाकों की व्यापक निगरानी। यह उपग्रह दृश्य महत्वपूर्ण भूवैज्ञानिक संरचनाओं, नदी पैटर्न और संभावित भूस्खलन क्षेत्रों को प्रारंभिक चेतावनी प्रणाली और आपदा तैयारी के लिए कैप्चर करता है।"
        }, 
        { 
          image: "/wayanand-lanslide.jpg",
          title: "भूस्खलन विश्लेषण",
          description: "केरल के वायनाड जिले में भूस्खलन-प्रवण क्षेत्रों का विस्तृत विश्लेषण। उन्नत रिमोट सेंसिंग तकनीक मिट्टी के कटाव पैटर्न, वनस्पति हानि और भूभाग अस्थिरता की पहचान करती है ताकि भविष्य के भूस्खलन की भविष्यवाणी और रोकथाम की जा सके।"
        }, 
        { 
          image: "/cyclone.png",
          title: "चक्रवात ट्रैकिंग",
          description: "भूस्थिर उपग्रह INSAT-3DR का उपयोग करके लाइव चक्रवात ट्रैकिंग सिस्टम। हवा की गति, दिशा, बादल निर्माण और तूफान के प्रक्षेपवक्र की निगरानी करता है ताकि सटीक पूर्वानुमान प्रदान किया जा सके और तटीय आबादी की समय पर निकासी सक्षम हो सके।"
        },
      ],
    },
  };

  const current = isHindi ? content.hindi : content.english;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseWelcomeModal} />
      <Navbar
        isHindi={isHindi}
        onLanguageChange={handleLanguageChange}
        userData={userData}
        onLogout={handleLogout}
        onShowLogin={() => setShowLoginPage(true)}
      />
      <EmergencyMarquee isHindi={isHindi} />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 shadow-lg flex flex-col">
          {userData && (
            <div className="p-4 bg-blue-800 text-white border-b border-blue-700">
              <div className="text-sm opacity-90">{isHindi ? "स्वागत" : "Welcome"}</div>
              <div className="font-semibold">{userData.name || userData.email}</div>
              <div className="text-xs opacity-75 capitalize">{userData.userType}</div>
            </div>
          )}

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

        <main className="flex-1 p-6 space-y-6">
          <Carousel />
          
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Satellite className="h-7 w-7 text-blue-700" />
                </div>
                {current.satelliteImages}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{isHindi ? "लाइव डेटा" : "Live Data"}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {current.satelliteData.map((satellite, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group relative"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={satellite.image}
                      alt={satellite.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
                      {isHindi ? "आपदा निगरानी" : "Disaster Monitoring"}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">
                        {satellite.title}
                      </h3>
                      <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
                        {isHindi ? "अपडेट किया गया" : "Updated"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                      <Satellite className="h-3 w-3 text-blue-600" />
                      <span>{isHindi ? "सैटेलाइट डेटा" : "Satellite Data"} • {isHindi ? "उच्च रिज़ॉल्यूशन" : "High Resolution"}</span>
                    </div>
                    <div className="relative group/button">
                      <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded transition-all duration-300 shadow-sm hover:shadow-md">
                        {isHindi ? "विवरण देखें" : "View Details"}
                      </button>
                      <div className="absolute bottom-full left-0 right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                          <p className="leading-relaxed">{satellite.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{isHindi ? "डेटा स्रोत:" : "Data Source:"}</span>
              <span className="text-blue-700 font-semibold">{isHindi ? "भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO)" : "Indian Space Research Organisation (ISRO)"}</span>
            </div>
          </div>
        </main>

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

export default App;