import React, { useState, useEffect } from 'react';
import { MapPin, X, ShieldCheck } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose }) {
  const [isHindi, setIsHindi] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt', 'granted', 'denied'

  // --- Only run geolocation check if modal is open ---
  useEffect(() => {
    if (!isOpen) return;

    // Check if permission was already granted or denied
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        setPermissionStatus('granted');
        setTimeout(onClose, 1500); // Auto-close if already granted
      } else if (result.state === 'denied') {
        setPermissionStatus('denied');
      }
    });
  }, [isOpen, onClose]); // Depend on isOpen and onClose

  const handlePermissionRequest = () => {
    if (!("geolocation" in navigator)) {
      setPermissionStatus('denied');
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    // Request permission if not already handled by the useEffect
    if (permissionStatus === 'prompt') {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionStatus('granted');
          setTimeout(onClose, 1500); // Auto-close on grant
        },
        (error) => {
          console.error("Geolocation error:", error);
          setPermissionStatus('denied');
        }
      );
    }
  };

  const content = {
    english: {
      title: "Welcome to RakshaNet",
      subtitle: "National Disaster Alert Portal",
      description: "To provide timely and accurate disaster alerts, this portal requests access to your location.",
      permissionNote: "Your location is used solely for sending geo-targeted alerts and will not be shared.",
      grantButton: "Allow Location Access",
      proceedButton: "Proceed to Site",
      grantedMessage: "Location Access Granted!",
      deniedMessage: "Location Access Denied."
    },
    hindi: {
      title: "रक्षानेट में आपका स्वागत है",
      subtitle: "राष्ट्रीय आपदा चेतावनी पोर्टल",
      description: "समय पर और सटीक आपदा अलर्ट प्रदान करने के लिए, यह पोर्टल आपके स्थान तक पहुंच का अनुरोध करता है।",
      permissionNote: "आपके स्थान का उपयोग केवल भू-लक्षित अलर्ट भेजने के लिए किया जाता है और इसे साझा नहीं किया जाएगा।",
      grantButton: "स्थान की अनुमति दें",
      proceedButton: "साइट पर आगे बढ़ें",
      grantedMessage: "स्थान की अनुमति दी गई!",
      deniedMessage: "स्थान की अनुमति अस्वीकृत।"
    }
  };

  const current = isHindi ? content.hindi : content.english;

  if (!isOpen) {
    return null;
  }

  return (
    // Key change: Adjusted bg-opacity to a very low value or removed it,
    // and rely more on backdrop-blur-xl for a stronger blur effect.
    <div className="fixed inset-0 bg-gray-900/5 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-fadeIn border-t-4 border-orange-500">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
           <div className="flex items-center gap-3">
             <img src="/indian-emblem.png" alt="Indian Emblem" className="h-10" />
             <div>
                <h2 className="text-lg font-bold text-gray-800">{current.title}</h2>
                <p className="text-xs text-gray-500">{current.subtitle}</p>
             </div>
           </div>
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 transition-colors"
          >
            {isHindi ? "English" : "हिंदी"}
          </button>
        </div>
        
        <div className="p-6 text-center">
          <MapPin className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-700 mb-2">{current.description}</p>
          <p className="text-xs text-gray-500 mb-6">{current.permissionNote}</p>
          <div className="min-h-[50px] flex items-center justify-center">
            {permissionStatus === 'prompt' && (
              <button 
                onClick={handlePermissionRequest}
                className="w-full bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck size={18} /> {current.grantButton}
              </button>
            )}
            {permissionStatus === 'granted' && (
               <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                 <ShieldCheck size={20} />
                 <span>{current.grantedMessage}</span>
               </div>
            )}
            {permissionStatus === 'denied' && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                <X size={20} />
                <span>{current.deniedMessage}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-black hover:underline">
            {current.proceedButton}
          </button>
        </div>
      </div>
    </div>
  );
}

