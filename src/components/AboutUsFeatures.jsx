import React from 'react';

const featureContent = {
  english: {
    title: "An Integrated System for National Safety",
    description: "RakshaNet ensures timely and effective disaster response through these core features.",
    features: [
      { 
        image: "/UnifiedDashboard.png", 
        title: "Unified Dashboard",
        text: "A common dashboard for citizens, volunteers, and agencies to coordinate relief efforts seamlessly." 
      },
      { 
        image: "/AI-PoweredDispatch.png", 
        title: "AI-Powered Dispatch",
        text: "Automatically allocates SOS requests and optimizes rescue routes for the fastest response." 
      },
      { 
        image: "/AILife-SavingChatbot.png", 
        title: "AI Life-Saving Chatbot",
        text: "Our chatbot, Raksha Saathi, provides instant, life-saving guidance to those in distress." 
      },
      { 
        image: "/Offline&Low-Bandwidth.png", 
        title: "Offline & Low-Bandwidth",
        text: "Operates effectively in compromised environments using SMS fallback systems." 
      },
    ],
  },
  hindi: {
    title: "राष्ट्रीय सुरक्षा के लिए एक एकीकृत प्रणाली",
    description: "रक्षानेट इन मुख्य विशेषताओं के माध्यम से समय पर और प्रभावी आपदा प्रतिक्रिया सुनिश्चित करता है।",
    features: [
      { 
        image: "/UnifiedDashboard.png", 
        title: "एकीकृत डैशबोर्ड",
        text: "नागरिकों, स्वयंसेवकों और एजेंसियों के लिए राहत प्रयासों में समन्वय के लिए एक साझा डैशबोर्ड।" 
      },
      { 
        image: "/AI-PoweredDispatch.png", 
        title: "एआई-संचालित डिस्पैच",
        text: "सबसे तेज प्रतिक्रिया के लिए एसओएस अनुरोधों को स्वचालित रूप से आवंटित करता है और बचाव मार्गों को अनुकूलित करता है।" 
      },
      { 
        image: "/AILife-SavingChatbot.png", 
        title: "एआई जीवन-रक्षक चैटबॉट",
        text: "हमारा चैटबॉट, 'रक्षा साथी', संकट में फंसे लोगों को तत्काल, जीवन रक्षक मार्गदर्शन प्रदान करता है।" 
      },
      { 
        image: "/Offline&Low-Bandwidth.png", 
        title: "ऑफलाइन और लो-बैंडविड्थ",
        text: "एसएमएस और रेडियो फॉलबैक सिस्टम का उपयोग करके खराब नेटवर्क वाले वातावरण में भी प्रभावी ढंग से काम करता है।" 
      },
    ],
  },
};

export default function AboutUsFeatures({ isHindi }) {
  const current = isHindi ? featureContent.hindi : featureContent.english;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 h-2"></div>
      
      <div className="p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">
            {current.title}
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            {current.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {current.features.map((item) => {
            return (
              <div
                key={item.title}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400"
              >
                <div className="flex flex-col items-center text-center">
                  {/* CHANGED: Increased container size from w-24 h-24 to w-32 h-32 */}
                  <div className="w-32 h-32 flex items-center justify-center mb-4"> 
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2 text-base">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}