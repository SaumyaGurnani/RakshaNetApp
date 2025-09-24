// src/api/geminiApi.js

// This function calls the actual Gemini API.
export const callGeminiApi = async (prompt, data) => {
    console.log("Calling live Gemini API with prompt:", prompt);
    // 1. Read the API key securely from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // 2. Check if the key is missing
    if (!apiKey) {
        console.error("VITE_GEMINI_API_KEY is not set in your .env file.");
        return { text: "Error: API key is not configured. Please contact the administrator." };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const userQuery = `${prompt}\n\nGive a short and crisp response in context of india. Here is the current situational data:\n${JSON.stringify(data, null, 2)}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("API call failed with status:", response.status, await response.text());
            return { text: "Error: Could not get a response from the AI. Please try again." };
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
             return { text: candidate.content.parts[0].text };
        } else {
            console.error("Unexpected API response structure:", result);
            return { text: "Error: Received an unexpected response from the AI." };
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return { text: "Error: Could not connect to the AI service. Check your connection and try again." };
    }
};

// Static mock data for the prototype's map and alerts.
export const initialSosAlerts = [
    { id: 1, lat: 28.6139, lng: 77.2090, time: "2m ago", status: "New" },
    { id: 2, lat: 28.6145, lng: 77.2085, time: "5m ago", status: "New" },
    { id: 3, lat: 28.6130, lng: 77.2100, time: "8m ago", status: "Acknowledged" },
    { id: 4, lat: 28.6150, lng: 77.2110, time: "10m ago", status: "New" },
    { id: 5, lat: 28.6125, lng: 77.2095, time: "12m ago", status: "Resolved" },
];

export const initialResources = [
    { id: 1, type: "Food Truck", lat: 28.6160, lng: 77.2120, status: "Available", team: "NGO Dish" },
    { id: 2, type: "Tent Shelter", lat: 28.6100, lng: 77.2050, status: "Deployed", team: "Red Cross" },
    { id: 3, type: "Medical Camp", lat: 28.6170, lng: 77.2080, status: "Available", team: "Army Medical" },
    { id: 4, type: "NDRF Team", lat: 28.6110, lng: 77.2150, status: "En Route", team: "NDRF B-7" },
    { id: 5, type: "Ambulance", lat: 28.6175, lng: 77.2085, status: "Available", team: "City Hospital" },
];