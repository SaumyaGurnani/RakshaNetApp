// src/pages/SOSPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequirementModal from '../components/RequirementModal';
import ChatbotModal from '../components/ChatbotModal';
import { LANG, t } from '../i18n';
import { ChevronLeft } from 'lucide-react'; // Import the back icon

// UI component for the SOS page view
const SOSView = ({ onSosClick, onBack, lang }) => (
    <div className="relative h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        {/* --- NEW BACK BUTTON --- */}
        <button 
            onClick={onBack} 
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-300 hover:text-white transition-colors z-10"
        >
            <ChevronLeft size={24} />
            <span className="font-semibold">Back to Home</span>
        </button>

        <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-red-500 tracking-tight">{t(lang, 'appTitle')}</h1>
            <p className="text-lg md:text-2xl mt-2 text-gray-300">{t(lang, 'tagline')}</p>
            <p className="text-md md:text-lg mt-8 max-w-2xl mx-auto">{t(lang, 'sosInstruction')}</p>
        </div>
        <button onClick={onSosClick} className="relative mt-12 w-48 h-48 md:w-64 md:h-64 bg-red-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-95 animate-pulse">
            {t(lang, 'sos')}
        </button>
    </div>
);

// UI component for the language switcher
const LanguageSwitcher = ({ lang, setLang }) => (
    <div className="fixed top-4 right-4 z-30">
        <div className="bg-white/90 backdrop-blur border rounded-full shadow flex items-center">
            <button onClick={() => setLang(LANG.HI)} className={`px-3 py-1 text-sm rounded-full ${lang === LANG.HI ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>हिन्दी</button>
            <button onClick={() => setLang(LANG.EN)} className={`px-3 py-1 text-sm rounded-full ${lang === LANG.EN ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>English</button>
        </div>
    </div>
);

// Toast component for "SOS Sent" acknowledgment
const Toast = ({ message, onEnd }) => {
    React.useEffect(() => {
        const timer = setTimeout(onEnd, 2000); // Hide after 3 seconds
        return () => clearTimeout(timer);
    }, [onEnd]);
    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[10001]">
            {message}
        </div>
    );
};


export default function SOSPage() {
    const [lang, setLang] = useState(LANG.HI);
    const [isReqModalOpen, setIsReqModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleSosClick = () => {
        setIsReqModalOpen(true);
    };

    const handleRequirementSubmit = (textMessage, audioBlob) => {
        console.log('SOS Submitted!', { textMessage, audioBlob });
        setIsReqModalOpen(false);
        setShowToast(true);
    };
    
    // Function to handle navigating back
    const handleBack = () => {
        navigate(-1); // This will take the user to the previous page in history
    };

    return (
        <div className="h-screen w-screen bg-gray-900">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            
            <SOSView 
                onSosClick={handleSosClick}
                onBack={handleBack} // Pass the back handler to the view
                lang={lang}
            />
            
            <RequirementModal 
                isOpen={isReqModalOpen} 
                onClose={() => setIsReqModalOpen(false)} 
                onSubmit={handleRequirementSubmit} 
                lang={lang} 
            />

            {showToast && <Toast message="SOS Sent!" onEnd={() => setShowToast(false)} />}
        </div>
    );
}