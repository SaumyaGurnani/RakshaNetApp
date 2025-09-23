// src/components/EmergencyMarquee.jsx
import React from 'react';

export default function EmergencyMarquee({ isHindi = false }) {
  const content = {
    english: {
      alerts: [
        "🚨 BREAKING: Cyclone Warning issued for Odisha & Andhra Pradesh - Red Alert in effect",
        "⚠️ Heavy Rainfall Alert: Kerala, Karnataka expected to receive 200mm+ rain in next 48 hours",
        "🌊 Flood Advisory: River Yamuna crosses danger mark - Evacuation underway in Delhi NCR",
        "🔴 Emergency Update: 67 people rescued from Bihar flood-affected areas - Operations ongoing",
        "📢 Relief Operations: 5,000 food packets distributed in Assam - More aid being dispatched",
        "⛈️ Weather Alert: Thunderstorm warning for Maharashtra, Gujarat - Stay indoors advised"
      ]
    },
    hindi: {
      alerts: [
        "🚨 तत्काल: ओडिशा और आंध्र प्रदेश के लिए चक्रवात चेतावनी - रेड अलर्ट प्रभावी",
        "⚠️ भारी बारिश अलर्ट: केरल, कर्नाटक में अगले 48 घंटों में 200मिमी+ बारिश की संभावना",
        "🌊 बाढ़ सलाह: यमुना नदी खतरे के निशान को पार - दिल्ली NCR में निकासी जारी",
        "🔴 आपातकालीन अपडेट: बिहार बाढ़ प्रभावित क्षेत्रों से 67 लोगों को बचाया गया - ऑपरेशन जारी",
        "📢 राहत अभियान: असम में 5,000 खाद्य पैकेट वितरित - अधिक सहायता भेजी जा रही है",
        "⛈️ मौसम अलर्ट: महाराष्ट्र, गुजरात के लिए तूफान चेतावनी - घर के अंदर रहने की सलाह"
      ]
    }
  };

  const current = isHindi ? content.hindi : content.english;
  const alertText = current.alerts.join(" • ");

  return (
    <div className="bg-amber-300 text-black overflow-hidden whitespace-nowrap border-b-2 border-amber-300 shadow-sm">
      <div className="py-2 animate-marquee inline-block">
        <span className="text-sm font-medium px-4">
          {alertText} • {alertText}
        </span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
}