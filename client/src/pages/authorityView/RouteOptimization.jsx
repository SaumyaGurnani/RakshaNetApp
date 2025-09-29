import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiClock, FiMapPin, FiChevronsRight, FiUsers, FiSearch, FiLoader, FiCheckCircle } from 'react-icons/fi';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RouteOptimization = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [notification, setNotification] = useState("");


  const fetchAddress = async (latlng, type) => {
    try {
      const response = await fetch(`/nominatim/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
      const data = await response.json();
      const address = data.display_name || 'Address not found';
      if (type === 'start') {
        setStartAddress(address);
        setStartInput(address);
      } else {
        setEndAddress(address);
        setEndInput(address);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      if (type === 'start') setStartAddress("Could not fetch address");
      else setEndAddress("Could not fetch address");
    }
  };

  const fetchRoute = async (start, end) => {
    setIsLoading(true);
    try {
        const response = await fetch(`/osrm/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const routeData = data.routes[0];
            const leafletRoute = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRoute(leafletRoute);

            const durationInSeconds = routeData.duration;
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            setEta(`${minutes} mins ${seconds} sec`);

            setDistance((routeData.distance / 1000).toFixed(1));

            if (map) {
                const bounds = L.latLngBounds(leafletRoute);
                map.fitBounds(bounds, { padding: [50, 50] });
            }

        } else {
            setRoute([[start.lat, start.lng], [end.lat, end.lng]]); // Fallback to straight line
            setEta("N/A");
            setDistance("N/A");
            alert("Could not find a route. Showing a straight line instead.");
        }
    } catch (error) {
        console.error("Error fetching route:", error);
        setRoute([[start.lat, start.lng], [end.lat, end.lng]]);
        setEta("N/A");
        setDistance("N/A");
    }
    setIsLoading(false);
  };
  
  const handleMapClick = (e) => {
    if (isLoading) return;
    if (!startPoint) {
      setStartPoint(e.latlng);
      fetchAddress(e.latlng, 'start');
    } else if (!endPoint) {
      const newEndPoint = e.latlng;
      setEndPoint(newEndPoint);
      fetchAddress(newEndPoint, 'end');
      fetchRoute(startPoint, newEndPoint);
    }
  };
  
  const MapClickHandler = () => {
    useMapEvents({
        click: handleMapClick,
    });
    return null;
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!startInput || !endInput) return;
    
    try {
        setIsLoading(true);
        const [startRes, endRes] = await Promise.all([
            fetch(`/nominatim/search?q=${encodeURIComponent(startInput)}&format=json&limit=1`),
            fetch(`/nominatim/search?q=${encodeURIComponent(endInput)}&format=json&limit=1`)
        ]);
        const startData = await startRes.json();
        const endData = await endRes.json();

        if (startData.length > 0 && endData.length > 0) {
            const sp = { lat: parseFloat(startData[0].lat), lng: parseFloat(startData[0].lon) };
            const ep = { lat: parseFloat(endData[0].lat), lng: parseFloat(endData[0].lon) };
            setStartPoint(sp);
            setEndPoint(ep);
            setStartAddress(startData[0].display_name);
            setEndAddress(endData[0].display_name);
            fetchRoute(sp, ep);
        } else {
            alert("One or both addresses could not be found.");
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Error geocoding addresses:", error);
        alert("An error occurred while finding the route.");
        setIsLoading(false);
    }
  }

  const handleConfirmRoute = () => {
    // In a real app, this would trigger a backend API call.
    console.log("Route confirmed and unit notified.");
    setNotification("Route Confirmed & Unit Notified!");
    setTimeout(() => {
      setNotification("");
    }, 3000); // Hide after 3 seconds
  };

  const clearRoute = () => {
      setStartPoint(null);
      setEndPoint(null);
      setRoute(null);
      setEta(null);
      setDistance(null);
      setStartAddress("");
      setEndAddress("");
      setStartInput("");
      setEndInput("");
  }

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-100 relative">
       {notification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md z-[1001] flex items-center gap-2">
            <FiCheckCircle/>
            <span>{notification}</span>
        </div>
      )}
      {/* Map Section */}
      <div className="flex-1 h-64 lg:h-full relative">
        <MapContainer center={[28.6139, 77.2090]} zoom={12} className="h-full w-full" whenCreated={setMap}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {startPoint && <Marker position={startPoint} />}
          {endPoint && <Marker position={endPoint} />}
          {route && <Polyline positions={route} color="green" weight={5} />}
        </MapContainer>
        {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-[1000]">
                <FiLoader className="animate-spin h-10 w-10 text-blue-600"/>
            </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-96 bg-white p-6 overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Route Optimization
          <p className='text-xl font-medium'>Click on map to select the start and destination points</p>
        </h2>
        
        
        {!route ? (
             <div>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Point</label>
                        <input type="text" id="start" value={startInput} onChange={e => setStartInput(e.target.value)} placeholder="Enter starting address" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Point</label>
                        <input type="text" id="end" value={endInput} onChange={e => setEndInput(e.target.value)} placeholder="Enter destination address" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-300">
                        {isLoading ? 'Searching...' : <><FiSearch/> Find Route</>}
                    </button>
                </form>
                <div className="text-center p-6 bg-gray-50 rounded-lg mt-6">
                    <FiMapPin className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Or Select on Map</h3>
                    <p className="mt-1 text-sm text-gray-500">Click on the map to set a starting point, then click again to set an ending point.</p>
                </div>
            </div>
        ) : (
            <>
                {/* Route Info */}
                 <div className="bg-white rounded-lg p-6 mb-6 border">
                    <h3 className="text-lg font-semibold mb-4">Route Details</h3>
                    <div className="space-y-3">
                        <p className="text-sm"><strong className="font-medium text-gray-800">Start:</strong> {startAddress}</p>
                        <p className="text-sm"><strong className="font-medium text-gray-800">End:</strong> {endAddress}</p>
                    </div>
                </div>

                {/* ETA Card */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                        <FiClock className="mr-2" />
                        <span>Expected Time to Reach (ETA)</span>
                    </div>
                    <p className="text-5xl font-bold text-gray-800">{eta}</p>
                    <p className="text-sm text-gray-500 mt-2">Total Distance: {distance} km (Current Traffic: Moderate)</p>
                </div>

                {/* Recommended Units Card */}
                <div className="bg-white rounded-lg p-6 mb-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center"><FiUsers className="mr-2"/>Recommended Units</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Ambulance Unit 101</p>
                                <p className="text-sm text-gray-500">Status: Dispatched | Crew: 3</p>
                            </div>
                            <span className="text-sm font-semibold text-green-600">Primary</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Police Patrol Car 55A</p>
                                <p className="text-sm text-gray-500">Status: On Standby | Crew: 2</p>
                            </div>
                            <span className="text-sm text-yellow-600">Backup (12 min)</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button onClick={handleConfirmRoute} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        Confirm Route & Notify Unit <FiChevronsRight/>
                    </button>
                     <button 
                        onClick={clearRoute}
                        className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                        Clear Route
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default RouteOptimization;
