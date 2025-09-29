// src/components/InteractiveMapView.jsx

import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polygon, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiLayers, FiX } from 'react-icons/fi'; // Import icons for the toggle button

// --- Data (remains unchanged) ---
const victimDensityData = [ { lat: 28.6139, lng: 77.2090, density: 9, label: "Connaught Place: High Victim Density" }, { lat: 28.6562, lng: 77.2410, density: 7, label: "Red Fort Area: Moderate Victim Density" }, { lat: 28.5275, lng: 77.2196, density: 4, label: "Hauz Khas Village: Low Victim Density" }, { lat: 28.6984, lng: 77.1498, density: 8, label: "Rohini Sector 18: High Victim Density" }, ];
const sosRequestsData = [ { lat: 28.6145, lng: 77.2195, details: "SOS: Building collapse, 2 trapped" }, { lat: 28.6990, lng: 77.1550, details: "SOS: Urgent medical attention needed" }, ];
const safeZonesData = [ { path: [[28.59, 77.22], [28.60, 77.24], [28.58, 77.25]], label: "Safe Zone A: Nehru Park" } ];
const blockedZonesData = [ { path: [[28.63, 77.21], [28.64, 77.22], [28.63, 77.23]], label: "Blocked Zone: Barakhamba Road" } ];
const landmarksData = [ { lat: 28.6315, lng: 77.2167, type: "hospital", name: "RML Hospital" }, { lat: 28.6692, lng: 77.2299, type: "hospital", name: "AIIMS" }, { lat: 28.5484, lng: 77.2081, type: "food", name: "Food Required: Qutub Institutional Area" }, ];
const layers = [ { id: 'victimDensity', label: 'Victim Density', color: 'bg-orange-500' }, { id: 'sosRequests', label: 'SOS Requests', color: 'bg-red-500' }, { id: 'safeZones', label: 'Safe Zones', color: 'bg-green-500' }, { id: 'blockedZones', label: 'Blocked Zones', color: 'bg-gray-500' }, { id: 'landmarks', label: 'Landmarks', color: 'bg-blue-500' }, ];
const getDensityColor = (density) => { if (density > 8) return "#b30000"; if (density > 6) return "#e34a33"; if (density > 4) return "#fc8d59"; return "#fdbb84"; };
const createLandmarkIcon = (type) => { const iconHtml = `<div style="background-color:${type === "hospital" ? "#1e90ff" : "#32cd32"}; width:24px; height:24px; border-radius:50%; border:2px solid white; box-shadow:0 0 5px rgba(0,0,0,0.5); text-align:center; line-height:24px; color:white; font-weight:bold;">${type === "hospital" ? "H" : "F"}</div>`; return L.divIcon({ html: iconHtml, className: "", iconSize: [24, 24], iconAnchor: [12, 12] }); };

export default function InteractiveMapView() {
  const [visibility, setVisibility] = useState({
    victimDensity: true,
    sosRequests: true,
    safeZones: true,
    blockedZones: true,
    landmarks: true,
  });
  const [isPanelVisible, setIsPanelVisible] = useState(true); // State to control panel visibility

  const handleVisibilityChange = (event) => {
    const { name, checked } = event.target;
    setVisibility(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="relative h-full w-full">
      {/* Map Display */}
      <div className="h-full w-full rounded-xl border border-slate-200 bg-white p-2">
        <MapContainer center={[28.6139, 77.2090]} zoom={12} className="h-full w-full rounded-lg z-0">
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {visibility.safeZones && safeZonesData.map((z, i) => <Polygon key={i} positions={z.path} pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.3 }}><Tooltip>{z.label}</Tooltip></Polygon>)}
          {visibility.blockedZones && blockedZonesData.map((z, i) => <Polygon key={i} positions={z.path} pathOptions={{ color: 'grey', fillColor: 'grey', fillOpacity: 0.5 }}><Tooltip>{z.label}</Tooltip></Polygon>)}
          {visibility.victimDensity && victimDensityData.map((p, i) => <CircleMarker key={i} center={[p.lat, p.lng]} radius={p.density*3} pathOptions={{ color: getDensityColor(p.density), fillColor: getDensityColor(p.density), fillOpacity: 0.6 }}><Tooltip>{p.label}</Tooltip></CircleMarker>)}
          {visibility.sosRequests && sosRequestsData.map((p, i) => <CircleMarker key={i} center={[p.lat, p.lng]} radius={10} pathOptions={{ color: 'white', fillColor: 'red', fillOpacity: 1 }} className="animate-glow"><Tooltip>{p.details}</Tooltip></CircleMarker>)}
          {visibility.landmarks && landmarksData.map((lm, i) => <Marker key={i} position={[lm.lat, lm.lng]} icon={createLandmarkIcon(lm.type)}><Tooltip>{lm.name}</Tooltip></Marker>)}
        </MapContainer>
      </div>

      {/* Floating Button to toggle panel */}
      <button
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all border border-gray-200"
        aria-label="Toggle Layers Panel"
      >
        {isPanelVisible ? <FiX className="h-5 w-5 text-gray-700"/> : <FiLayers className="h-5 w-5 text-gray-700"/>}
      </button>

      {/* Controls Panel - Now a floating overlay */}
      <div 
        className={`absolute top-4 left-4 z-10 w-60 bg-white p-4 rounded-xl border border-slate-200 shadow-lg transition-all duration-300 ease-in-out
                    ${isPanelVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}
      >
        <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Map Layers</h3>
        <div className="space-y-3">
          {layers.map(layer => (
            <label key={layer.id} className="flex items-center gap-3 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" name={layer.id} checked={visibility[layer.id]} onChange={handleVisibilityChange} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/>
              <span className={`h-2.5 w-2.5 rounded-full ${layer.color}`}></span>
              <span>{layer.label}</span>
            </label>
          ))}
        </div>
      </div>
        
      <style>{`
        .animate-glow {
          animation: glow-effect 2s infinite ease-in-out;
        }
        @keyframes glow-effect {
          0%, 100% {
            box-shadow: 0 0 5px 2px rgba(255, 0, 0, 0.7);
          }
          50% {
            box-shadow: 0 0 12px 5px rgba(255, 0, 0, 0.7);
          }
        }
      `}</style>
    </div>
  );
}