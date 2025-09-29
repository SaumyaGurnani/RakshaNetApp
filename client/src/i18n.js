// src/i18n.js
export const LANG = {
    EN: 'en',
    HI: 'hi',
};

const translations = {
    [LANG.EN]: {
        appTitle: 'RakshaNet',
        tagline: 'Unified Disaster Response Network',
        sosInstruction: 'If you are in immediate danger, press the button below. Your location will be sent to emergency services.',
        sos: 'SOS',
        // --- CHANGED HERE ---
        chatbotTitle: 'Raksha Saathi', 
        chatbotPrompt: 'How can I help you?',
        requestAssist: 'Request Assistance',
        recordHindiTitle: 'Or, record a voice note (in Hindi):',
        startRecording: 'Start Recording',
        stop: 'Stop',
        micDenied: 'Microphone access was denied.',
        voiceNoteInfo: 'Your voice note will be sent to the authorities.',
        cancel: 'Cancel',
        submitRequest: 'Submit Request',
    },
    [LANG.HI]: {
        appTitle: 'रक्षानेट',
        tagline: 'एकीकृत आपदा प्रतिक्रिया नेटवर्क',
        sosInstruction: 'यदि आप तत्काल खतरे में हैं, तो नीचे दिया गया बटन दबाएँ। आपका स्थान आपातकालीन सेवाओं को भेज दिया जाएगा।',
        sos: 'एसओएस',
        // --- CHANGED HERE ---
        chatbotTitle: 'रक्षा साथी',
        chatbotPrompt: 'मैं आपकी कैसे मदद कर सकता हूँ?',
        requestAssist: 'सहायता का अनुरोध करें',
        recordHindiTitle: 'या, एक वॉयस नोट रिकॉर्ड करें (हिंदी में):',
        startRecording: 'रिकॉर्डिंग शुरू करें',
        stop: 'रोकें',
        micDenied: 'माइक्रोफोन का एक्सेस अस्वीकार कर दिया गया।',
        voiceNoteInfo: 'आपका वॉयस नोट अधिकारियों को भेजा जाएगा।',
        cancel: 'रद्द करें',
        submitRequest: 'अनुरोध सबमिट करें',
    },
};

export const t = (lang, key) => translations[lang][key] || key;