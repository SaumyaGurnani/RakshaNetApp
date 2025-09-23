import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Define Firebase globals for the Canvas environment
const __firebase_config = typeof __firebase_config !== 'undefined' ? __firebase_config : null;
const __initial_auth_token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const __app_id = typeof __app_id !== 'undefined' ? __app_id : null;

// Mock data to simulate the user interface
const mockUpdates = [
  {
    id: 1,
    timestamp: "10:35 AM",
    source: "NDRF Team A - Odisha",
    text: "Heavy rainfall continuing to Puri district. Road locked at NH-16 due waterlogging.",
    isCritical: false,
    images: ["https://placehold.co/100x70/E3E7F8/222222?text=Image+1"],
    authority: "NDRF Team A",
    location: "Odisha"
  },
  {
    id: 2,
    timestamp: "10:30 AM",
    source: "Medical Team Task Force",
    text: "Urgent request 0-negative blood needed at Hospital. 25 needed 25 units needed.",
    isCritical: true,
    images: [],
    authority: "Medical Team Task Force",
    location: "Hospital"
  },
  {
    id: 3,
    timestamp: "10:30 AM",
    source: "District Collector - Kolkata",
    text: "Successful evacuation of 50 villagers to temporary shelter in Guwahati.",
    isCritical: false,
    images: [],
    authority: "District Collector",
    location: "Kolkata"
  },
  {
    id: 4,
    timestamp: "09:45 AM",
    source: "Fire Brigade Unit - Chennai",
    text: "Team dispatched to address a minor fire incident in the city's outskirts. Situation under control.",
    isCritical: false,
    images: ["https://placehold.co/100x70/E3E7F8/222222?text=Image+2", "https://placehold.co/100x70/E3E7F8/222222?text=Image+3"],
    authority: "Fire Brigade Unit",
    location: "Chennai"
  },
];

const liveUpdates = () => {
  const [updates, setUpdates] = useState(mockUpdates); // Start with mock data
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Firestore & Auth Initialization
  useEffect(() => {
    let unsubscribe = () => {};

    try {
      if (!__firebase_config) {
        console.warn("Firebase config is not defined. The app will use mock data.");
        setIsLoading(false);
        setIsAuthReady(true);
      } else {
        const firebaseConfig = JSON.parse(__firebase_config);
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Function to handle authentication
        const authenticate = async () => {
          try {
            if (__initial_auth_token) {
              await signInWithCustomToken(auth, __initial_auth_token);
            } else {
              await signInAnonymously(auth);
            }
          } catch (error) {
            console.error("Firebase authentication error:", error);
          }
        };

        // Set up auth state listener
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);
            setIsAuthReady(true);
            
            // Setup Firestore listener for real-time updates
            const appId = __app_id || 'default-app-id';
            const updatesRef = collection(db, `artifacts/${appId}/public/data/updates`);
            const q = query(updatesRef);

            unsubscribe = onSnapshot(q, (snapshot) => {
              const liveUpdates = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setUpdates(liveUpdates);
            }, (error) => {
              console.error("Error fetching real-time updates:", error);
            });
          } else {
            setUserId(null);
            setIsAuthReady(true);
            // If the user logs out, stop listening for updates
            if (unsubscribe) unsubscribe();
          }
          setIsLoading(false);
        });

        authenticate();
      }
    } catch (e) {
      console.error("Failed to initialize Firebase:", e);
      setIsLoading(false);
      setIsAuthReady(true);
    }
    
    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <div className="bg-white p-4 shadow-md flex justify-between items-center px-8">
        <div className="flex items-center space-x-4">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="Indian Flag" className="h-10 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900">National Disaster Management Authority (NDMA)</h1>
        </div>
        <div className="flex items-center space-x-6 text-gray-600">
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Homepage</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs mt-1">On-going Operations</span>
          </a>
          <a href="#" className="flex flex-col items-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">Live Updates</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 110-6 3 3 0 000 6z" />
            </svg>
            <span className="text-xs mt-1">Map View</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1">My Operations</span>
          </a>
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </a>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Live Updates</h2>
        {userId && (
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Logged in User ID:</span> {userId}
          </div>
        )}
        <div className="flex space-x-6">
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-[80vh]">
              <div className="flex justify-end mb-4">
                <button className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors">
                  Submit New Update
                </button>
              </div>
              <div className="space-y-6">
                {updates.length > 0 ? (
                  updates.map(update => (
                    <div key={update.id} className={`p-4 rounded-xl shadow-sm ${update.isCritical ? 'bg-red-50 ring-2 ring-red-500' : 'bg-blue-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <span className="text-xs text-gray-500">{update.timestamp}</span>
                            <span className="font-semibold block">{update.source}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {update.isCritical && (
                            <div className="flex items-center px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                              <span className="w-2 h-2 bg-red-200 rounded-full animate-ping mr-1"></span>
                              CRITICAL
                            </div>
                          )}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{update.text}</p>
                      {update.images && update.images.length > 0 && (
                        <div className="flex space-x-2 mt-2">
                          {update.images.map((img, index) => (
                            <img key={index} src={img} alt={`Update media ${index + 1}`} className="w-24 h-16 rounded-lg object-cover" />
                          ))}
                        </div>
                      )}
                      <div className="flex justify-end space-x-4 text-gray-500 mt-4">
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                          </svg>
                          <span>Comment</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No live updates available. Please check back later.</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-80 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="victim" className="rounded-sm text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="victim">Victim Report</label>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <input type="checkbox" id="infrastructure" className="rounded-sm text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="infrastructure">Infrastructure Damage</label>
                </div>
              </div>
              <div>
                <label htmlFor="keywords" className="text-sm font-medium text-gray-700 block mb-1">Keywords</label>
                <input type="text" id="keywords" placeholder="Search by keywords" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="source" className="text-sm font-medium text-gray-700 block mb-1">Source</label>
                <input type="text" id="source" placeholder="E.g., NDRF Team A" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <button className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default liveUpdates;