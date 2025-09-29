import React from 'react';

export default function AlertMarquee({ isHindi = false }) {
  const content = {
    english: {
      alerts: [
        "CRITICAL ALERT: Cyclone 'Vayu' expected to make landfall in Gujarat. Evacuation orders issued.",
        "RED ALERT: Severe flooding in Assam, Brahmaputra river above danger level. NDRF teams deployed.",
        "URGENT: Landslide warning for hilly regions of Uttarakhand due to heavy rainfall. Avoid travel."
      ]
    },
    hindi: {
      alerts: [
        "महत्वपूर्ण चेतावनी: चक्रवात 'वायु' के गुजरात में दस्तक देने की उम्मीद है। निकासी के आदेश जारी।",
        "रेड अलर्ट: असम में भीषण बाढ़, ब्रह्मपुत्र नदी खतरे के निशान से ऊपर। एनडीआरएफ की टीमें तैनात।",
        "अत्यावश्यक: भारी वर्षा के कारण उत्तराखंड के पहाड़ी क्षेत्रों के लिए भूस्खलन की चेतावनी। यात्रा से बचें।"
      ]
    }
  };

  const current = isHindi ? content.hindi : content.english;
  const alertText = current.alerts.join(" 🔴 ");

  return (
    <div className="bg-amber-400 text-slate-800 overflow-hidden whitespace-nowrap shadow-md">
      <div className="py-2.5 animate-marquee inline-block">
        <span className="text-sm font-bold uppercase tracking-wider px-4">
          {alertText}
        </span>
        <span className="text-sm font-bold uppercase tracking-wider px-4">
          {" 🔴 "} {alertText}
        </span>
      </div>
      
    </div>
  );
}